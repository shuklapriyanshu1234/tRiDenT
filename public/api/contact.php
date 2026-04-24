<?php
declare(strict_types=1);

/**
 * Contact form endpoint for the static Next.js build.
 * Expects POST JSON: { "name", "email", "subject", "message" }
 * Responds with JSON: { "ok": true } or { "ok": false, "error": "..." }
 *
 * Configure via contact.config.php (see contact.config.example.php).
 */

header('Content-Type: application/json; charset=UTF-8');

$configPath = __DIR__ . '/contact.config.php';
if (!is_readable($configPath)) {
    http_response_code(503);
    echo json_encode([
        'ok' => false,
        'error' => 'Server not configured. Create api/contact.config.php from contact.config.example.php.',
    ]);
    exit;
}

/** @var array{allowed_origins?: array<int, string>|string, to_email: string, from_email: string, bcc_email?: string} $config */
$config = require $configPath;

$allowedRaw = $config['allowed_origins'] ?? ($config['allowed_origin'] ?? []);
$allowedList = is_array($allowedRaw) ? $allowedRaw : [$allowedRaw];
$allowedList = array_filter(array_map('trim', $allowedList));

$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';

$originAllowed = false;
if ($requestOrigin !== '' && $allowedList !== []) {
    $originAllowed = in_array($requestOrigin, $allowedList, true);
}

if ($originAllowed) {
    header('Access-Control-Allow-Origin: ' . $requestOrigin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code($originAllowed ? 204 : 403);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

if (!$originAllowed) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Origin not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

$name = isset($data['name']) ? trim((string) $data['name']) : '';
$email = isset($data['email']) ? trim((string) $data['email']) : '';
$subject = isset($data['subject']) ? trim((string) $data['subject']) : '';
$message = isset($data['message']) ? trim((string) $data['message']) : '';

$max = ['name' => 200, 'subject' => 300, 'message' => 10000];
if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'All fields are required']);
    exit;
}
if (strlen($name) > $max['name'] || strlen($subject) > $max['subject'] || strlen($message) > $max['message']) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Field too long']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email']);
    exit;
}

/** Strip characters that could break email headers */
$sanitizeHeader = static function (string $s): string {
    return str_replace(["\r", "\n", '%0a', '%0d', '%0A', '%0D'], '', $s);
};

$name = $sanitizeHeader($name);
$email = $sanitizeHeader($email);
$subject = $sanitizeHeader($subject);

$to = trim((string) ($config['to_email'] ?? ''));
$from = trim((string) ($config['from_email'] ?? ''));
if ($to === '' || $from === '') {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'Missing to_email or from_email in config']);
    exit;
}

require_once __DIR__ . '/mail_format.php';

$mailSubject = '[Contact] ' . $subject;
$bodies = contact_format_contact_email($name, $email, $subject, $message);

$bcc = $sanitizeHeader(trim((string) ($config['bcc_email'] ?? '')));
$bccValid = $bcc !== '' && filter_var($bcc, FILTER_VALIDATE_EMAIL);

$smtp = $config['smtp'] ?? null;
$smtpPass = is_array($smtp) ? trim((string) ($smtp['password'] ?? '')) : '';
$useSmtp = is_array($smtp)
    && trim((string) ($smtp['host'] ?? '')) !== ''
    && trim((string) ($smtp['username'] ?? '')) !== ''
    && $smtpPass !== '';

if ($useSmtp) {
    require_once __DIR__ . '/smtp_send.php';
    $replyToHeader = $name !== '' ? "{$name} <{$email}>" : $email;
    try {
        contact_smtp_send(
            $smtp,
            $from,
            $to,
            $bccValid ? $bcc : null,
            $replyToHeader,
            $mailSubject,
            $bodies['plain'],
            $bodies['html']
        );
    } catch (Throwable $e) {
        error_log('contact.php SMTP: ' . $e->getMessage());
        http_response_code(502);
        echo json_encode([
            'ok' => false,
            'error' => 'Could not send email. Verify SMTP settings in contact.config.php (Hostinger hPanel → Emails).',
        ]);
        exit;
    }
    echo json_encode(['ok' => true]);
    exit;
}

$replyToHeader = $name !== '' ? "{$name} <{$email}>" : $email;
$boundary = contact_generate_mime_boundary();
$mimeBody = contact_mail_multipart_body($boundary, $bodies['plain'], $bodies['html']);
$mimeBody = str_replace("\r\n", "\n", $mimeBody);
$mimeLines = explode("\n", $mimeBody);
foreach ($mimeLines as $i => $line) {
    if ($line !== '' && $line[0] === '.') {
        $mimeLines[$i] = '.' . $line;
    }
}
$mimeBody = implode("\r\n", $mimeLines);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'From: ' . $from,
    'Reply-To: ' . $replyToHeader,
    'X-Mailer: PHP/' . PHP_VERSION,
];

if ($bccValid) {
    $headers[] = 'Bcc: ' . $bcc;
}

$sent = @mail($to, $mailSubject, $mimeBody, implode("\r\n", $headers));
if (!$sent) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Could not send email. Check server mail settings.']);
    exit;
}

echo json_encode(['ok' => true]);
