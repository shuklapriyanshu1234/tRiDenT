<?php
declare(strict_types=1);

/**
 * Contact email: plain + HTML bodies and multipart helpers.
 */

function contact_email_escape_html(string $text): string
{
    return htmlspecialchars($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

function contact_generate_mime_boundary(): string
{
    return 'trident_' . bin2hex(random_bytes(16));
}

function contact_mail_multipart_body(string $boundary, string $plain, string $html): string
{
    $crlf = "\r\n";
    $plainB64 = chunk_split(base64_encode($plain));
    $htmlB64 = chunk_split(base64_encode($html));

    return
        '--' . $boundary . $crlf
        . 'Content-Type: text/plain; charset=UTF-8' . $crlf
        . 'Content-Transfer-Encoding: base64' . $crlf
        . $crlf
        . $plainB64
        . '--' . $boundary . $crlf
        . 'Content-Type: text/html; charset=UTF-8' . $crlf
        . 'Content-Transfer-Encoding: base64' . $crlf
        . $crlf
        . $htmlB64
        . '--' . $boundary . '--' . $crlf;
}

/**
 * @return array{plain: string, html: string}
 */
function contact_format_contact_email(string $name, string $email, string $subject, string $message): array
{
    $n = $name;
    $e = $email;
    $s = $subject;
    $m = $message;

    $plain = <<<TEXT
New message from the Trident Pharma website contact form
────────────────────────────────────────

Subject: {$s}

From
  Name:  {$n}
  Email: {$e}

Message
────────────────────────────────────────
{$m}
────────────────────────────────────────

Reply directly to this person using the email address above.
TEXT;

    $hn = contact_email_escape_html($n);
    $he = contact_email_escape_html($e);
    $hs = contact_email_escape_html($s);
    $hm = nl2br(contact_email_escape_html($m), false);
    $mailtoHref = contact_email_escape_html('mailto:' . $e);

    $html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact — {$hs}</title>
</head>
<body style="margin:0;padding:0;background-color:#eef1f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef1f5;padding:28px 14px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;border:1px solid #dce3eb;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.06);">
        <tr>
          <td style="padding:22px 20px;background-color:#fafbfc;border-bottom:1px solid #e8edf3;">
            <div style="font-size:20px;font-weight:700;line-height:1.2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
              <span style="color:#b8860b;">TRIDENT</span><span style="color:#0f172a;"> PHARMA</span>
            </div>
            <p style="margin:10px 0 0;font-size:11px;letter-spacing:0.14em;color:#64748b;text-transform:uppercase;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">Website contact</p>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
            <p style="margin:0 0 18px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Subject</p>
            <p style="margin:0 0 22px;font-size:17px;font-weight:600;color:#0f172a;line-height:1.4;">{$hs}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;background-color:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
              <tr>
                <td style="padding:14px 16px;">
                  <p style="margin:0 0 10px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">From</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#0f172a;">{$hn}</p>
                  <p style="margin:6px 0 0;font-size:14px;"><a href="{$mailtoHref}" style="color:#b8860b;text-decoration:none;font-weight:500;">{$he}</a></p>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 10px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
            <div style="font-size:15px;line-height:1.6;color:#334155;border-left:3px solid #d4af37;padding:14px 16px;background-color:#fffbeb;border-radius:0 8px 8px 0;">{$hm}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px;background-color:#f8fafc;border-top:1px solid #e8edf3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
            <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Reply using the address above. This email was sent from the contact form on your website.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
HTML;

    return ['plain' => $plain, 'html' => $html];
}
