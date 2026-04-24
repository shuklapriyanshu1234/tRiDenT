<?php
declare(strict_types=1);

require_once __DIR__ . '/mail_format.php';

/**
 * Minimal SMTP client (AUTH LOGIN). No Composer.
 *
 * @throws RuntimeException on failure
 */

/**
 * Open TLS connection and complete AUTH LOGIN. Caller must fclose() the stream.
 *
 * @return resource
 */
function _contact_smtp_connect_and_auth(array $smtp)
{
    $host = trim((string) ($smtp['host'] ?? ''));
    $user = trim((string) ($smtp['username'] ?? ''));
    $pass = (string) ($smtp['password'] ?? '');
    $port = (int) ($smtp['port'] ?? 465);
    $enc = strtolower(trim((string) ($smtp['encryption'] ?? 'ssl')));

    if ($host === '' || $user === '' || $pass === '') {
        throw new RuntimeException('Incomplete SMTP configuration (host, username, password)');
    }

    $implicitSsl = ($port === 465 || $enc === 'ssl' || $enc === 'smtps');
    $remote = $implicitSsl ? "ssl://{$host}:{$port}" : "tcp://{$host}:{$port}";

    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'allow_self_signed' => false,
        ],
    ]);

    $fp = @stream_socket_client($remote, $errno, $errstr, 25, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) {
        throw new RuntimeException("SMTP connect failed: {$errstr} ({$errno})");
    }

    stream_set_timeout($fp, 25);

    try {
        contact_smtp_expect($fp, [220]);
        contact_smtp_cmd($fp, 'EHLO trident-pharma-contact', [250]);

        if (!$implicitSsl && $enc === 'tls') {
            contact_smtp_cmd($fp, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('STARTTLS failed');
            }
            contact_smtp_cmd($fp, 'EHLO trident-pharma-contact', [250]);
        }

        contact_smtp_cmd($fp, 'AUTH LOGIN', [334]);
        contact_smtp_cmd($fp, base64_encode($user), [334]);
        contact_smtp_cmd($fp, base64_encode($pass), [235]);

        return $fp;
    } catch (Throwable $e) {
        fclose($fp);
        throw $e;
    }
}

function contact_smtp_send(
    array $smtp,
    string $fromRaw,
    string $to,
    ?string $bcc,
    string $replyTo,
    string $subject,
    string $bodyPlain,
    ?string $bodyHtml = null
): void {
    $fromEmail = contact_parse_email_addr($fromRaw);
    if ($fromEmail === '') {
        throw new RuntimeException('Invalid from_email');
    }

    $fp = _contact_smtp_connect_and_auth($smtp);
    try {
        contact_smtp_cmd($fp, 'MAIL FROM:<' . $fromEmail . '>', [250]);

        foreach (array_filter([$to, $bcc]) as $rcpt) {
            $rcpt = trim($rcpt);
            if ($rcpt !== '' && filter_var($rcpt, FILTER_VALIDATE_EMAIL)) {
                contact_smtp_cmd($fp, 'RCPT TO:<' . $rcpt . '>', [250, 251]);
            }
        }

        contact_smtp_cmd($fp, 'DATA', [354]);

        $foldedSubject = contact_smtp_fold_subject($subject);

        if ($bodyHtml !== null && $bodyHtml !== '') {
            $boundary = contact_generate_mime_boundary();
            $mimeBody = contact_mail_multipart_body($boundary, $bodyPlain, $bodyHtml);
            $mimeBody = contact_smtp_escape_body(str_replace("\r\n", "\n", $mimeBody));

            $headers = [
                'MIME-Version: 1.0',
                'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
                'From: ' . $fromRaw,
                'To: ' . $to,
                'Reply-To: ' . $replyTo,
                'Subject: ' . $foldedSubject,
            ];
            $data = implode("\r\n", $headers) . "\r\n\r\n" . $mimeBody;
        } else {
            $headers = [
                'MIME-Version: 1.0',
                'Content-Type: text/plain; charset=UTF-8',
                'From: ' . $fromRaw,
                'To: ' . $to,
                'Reply-To: ' . $replyTo,
                'Subject: ' . $foldedSubject,
            ];
            $bodyEscaped = contact_smtp_escape_body($bodyPlain);
            $data = implode("\r\n", $headers) . "\r\n\r\n" . $bodyEscaped;
        }

        fwrite($fp, $data . "\r\n.\r\n");
        contact_smtp_expect($fp, [250]);
        contact_smtp_cmd($fp, 'QUIT', [221]);
    } finally {
        fclose($fp);
    }
}

function contact_parse_email_addr(string $from): string
{
    if (preg_match('/<([^>]+)>/', $from, $m)) {
        $e = trim($m[1]);
        return filter_var($e, FILTER_VALIDATE_EMAIL) ? $e : '';
    }
    $from = trim($from);
    return filter_var($from, FILTER_VALIDATE_EMAIL) ? $from : '';
}

function contact_smtp_fold_subject(string $subject): string
{
    $subject = str_replace(["\r", "\n"], '', $subject);
    return $subject === '' ? '(no subject)' : $subject;
}

function contact_smtp_escape_body(string $plain): string
{
    $norm = str_replace(["\r\n", "\r"], "\n", $plain);
    $lines = explode("\n", $norm);
    foreach ($lines as $i => $line) {
        if ($line !== '' && $line[0] === '.') {
            $lines[$i] = '.' . $line;
        }
    }
    return implode("\r\n", $lines);
}

/** @param resource $fp */
function contact_smtp_expect($fp, array $okCodes): string
{
    $line = @fgets($fp, 8192);
    if ($line === false || $line === '') {
        throw new RuntimeException('SMTP: empty response');
    }
    $code = (int) substr($line, 0, 3);
    if (!in_array($code, $okCodes, true)) {
        $parts = [trim($line)];
        while (strlen($line) >= 4 && $line[3] === '-') {
            $line = @fgets($fp, 8192);
            if ($line === false || $line === '') {
                break;
            }
            $parts[] = trim($line);
        }
        throw new RuntimeException('SMTP error: ' . implode(' ', $parts));
    }
    while (strlen($line) >= 4 && $line[3] === '-') {
        $line = @fgets($fp, 8192);
        if ($line === false) {
            break;
        }
    }
    return $line;
}

/** @param resource $fp */
function contact_smtp_cmd($fp, string $cmd, array $expectCodes): void
{
    fwrite($fp, $cmd . "\r\n");
    contact_smtp_expect($fp, $expectCodes);
}
