<?php
$envMap = [];
foreach (['.env.local', '.env'] as $envFile) {
  $path = dirname(__DIR__) . DIRECTORY_SEPARATOR . $envFile;
  if (!is_readable($path)) continue;
  $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  foreach ($lines as $line) {
    $trimmed = trim($line);
    if ($trimmed === '' || $trimmed[0] === '#') continue;
    if (strpos($line, '=') === false) continue;
    [$key, $value] = array_map('trim', explode('=', $line, 2));
    $value = trim($value, "\"'");
    $envMap[$key] = $value;
  }
}
$env = static fn(string $key, $default = null) => $envMap[$key] ?? getenv($key) ?? $default;

$allowedOrigins = [
  'https://richcavagnarobooks.com',
  'https://www.richcavagnarobooks.com',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
  header("Access-Control-Allow-Origin: {$origin}");
  header("Vary: Origin");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["status"=>"error","message"=>"Method Not Allowed. Please use POST."]);
  exit();
}

require './vendor/autoload.php';
require __DIR__ . '/templates/form_email_template.php';
$newsletterTemplate = __DIR__ . '/templates/newsletter_email_template.php';
if (is_readable($newsletterTemplate)) {
  require $newsletterTemplate;
}

if (!function_exists('render_newsletter_email')) {
  function render_newsletter_email(array $data): string {
    $meta = $data['meta'] ?? [];
    $subscriber = $data['subscriber'] ?? [];

    $rows = [];
    if (!empty($subscriber['name'])) {
      $rows[] = ['label' => 'Name', 'value' => h($subscriber['name'])];
    }
    if (!empty($subscriber['email'])) {
      $rows[] = ['label' => 'Email', 'value' => h($subscriber['email'])];
    }
    if (!empty($meta['source'])) {
      $rows[] = ['label' => 'Source', 'value' => h($meta['source'])];
    }

    return render_form_email([
      'meta' => [
        'title' => $meta['title'] ?? 'New Newsletter Subscriber',
        'dateStr' => $meta['dateStr'] ?? '',
        'logoUrl' => $meta['logoUrl'] ?? '',
      ],
      'rows' => $rows,
    ]);
  }
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function getUserIP(){
  if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip_addresses = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
    return trim($ip_addresses[0]);
  }
  return $_SERVER['REMOTE_ADDR'] ?? 'N/A';
}
function getIPInfo($ip){
  $json = @file_get_contents("https://ipinfo.io/{$ip}/json");
  if ($json === false) return [];
  return json_decode($json, true) ?: [];
}
function h($v){ return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }
function clean_text($v, int $max = 1000): string {
  $value = trim((string)$v);
  $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
  if (function_exists('mb_substr')) return mb_substr($value, 0, $max);
  return substr($value, 0, $max);
}
function pretty_label($key){
  $k = str_replace(['_', '-'], ' ', $key);
  $k = preg_replace('/(?<!^)([A-Z])/', ' $1', $k);
  $k = preg_replace('/\s+/', ' ', trim($k));
  return ucwords($k);
}
function build_ordered_fields(array $post): array {
  $skip = [
    'g-recaptcha-response',
    'formName',
    'fullName',
    'firstName',
    'lastName',
    'consent',
    'website',
    'source',
  ];
  foreach ($skip as $s) unset($post[$s]);

  $normalized = [];
  foreach ($post as $k => $v) {
    if (is_array($v)) $v = implode(', ', $v);
    $v = clean_text($v, stripos($k, 'message') !== false ? 1000 : 180);
    if ($v === '') continue;
    $normalized[$k] = stripos($k, 'message') !== false ? nl2br(h($v)) : h($v);
  }

  $preferred = ['name', 'email', 'subject', 'phone', 'message'];
  $pos = array_flip(array_map('strtolower', $preferred));

  uksort($normalized, function ($a, $b) use ($pos) {
    $la = strtolower($a);
    $lb = strtolower($b);
    $pa = $pos[$la] ?? PHP_INT_MAX;
    $pb = $pos[$lb] ?? PHP_INT_MAX;
    return $pa === $pb ? strcmp($la, $lb) : ($pa <=> $pb);
  });

  $rows = [];
  foreach ($normalized as $k => $v) {
    $rows[] = ['label' => pretty_label($k), 'value' => $v];
  }
  return $rows;
}

$user_ip  = getUserIP();
$info     = getIPInfo($user_ip);
$city     = $info['city'] ?? 'N/A';
$region   = $info['region'] ?? 'N/A';
$country  = $info['country'] ?? 'N/A';
$org      = $info['org'] ?? 'N/A';
$loc      = $info['loc'] ?? 'N/A';
$referer  = $_SERVER['HTTP_REFERER'] ?? 'N/A';

$name    = clean_text(filter_input(INPUT_POST, "name",  FILTER_UNSAFE_RAW), 100);
$email   = clean_text(filter_input(INPUT_POST, "email", FILTER_UNSAFE_RAW), 254);
$subjectInput = clean_text(filter_input(INPUT_POST, "subject", FILTER_UNSAFE_RAW), 150);
$messageInput = clean_text(filter_input(INPUT_POST, "message", FILTER_UNSAFE_RAW), 1000);
$service = clean_text(filter_input(INPUT_POST, "service", FILTER_UNSAFE_RAW), 150);
$formName = clean_text(filter_input(INPUT_POST, "formName", FILTER_UNSAFE_RAW), 80);
$honeypot = clean_text(filter_input(INPUT_POST, "website", FILTER_UNSAFE_RAW), 120);

$isNewsletter = in_array($formName, ['newsletter', 'book-newsletter'], true);

if ($honeypot !== '') {
  http_response_code(200);
  echo json_encode(["status"=>"success","message"=>"Message received."]);
  exit();
}

if ($isNewsletter) {
  if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status"=>"error","message"=>"A valid email address is required."]);
    exit();
  }
} else {
  if (
    $name === '' ||
    strlen($name) < 2 ||
    $email === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $subjectInput === '' ||
    $messageInput === ''
  ) {
    http_response_code(400);
    echo json_encode(["status"=>"error","message"=>"Please complete your name, email, subject, and message before submitting."]);
    exit();
  }
}

$serviceChips = '';
if ($service !== '') {
  foreach (array_filter(array_map('trim', explode(',', $service))) as $c) {
    $serviceChips .= '<span class="chip">'.h($c).'</span>';
  }
}

$rows = build_ordered_fields($_POST);
$dateStr = date('D, M j, Y g:i A');

$smtpHost = $env('SMTP_HOST', 'mail.richcavagnarobooks.com');
$smtpPort = (int)$env('SMTP_PORT', 465);
$smtpUser = $env('SMTP_USERNAME', '');
$smtpPass = $env('SMTP_PASSWORD', '');
$smtpSecure = $env('SMTP_SECURE', 'ssl');
$mailRecipient = $env('MAIL_TO', $smtpUser ?: 'contact@richcavagnarobooks.com');
$mailFromName = $env('MAIL_FROM_NAME', 'Rich Cavagnaro Books');
$logoUrl = $env('LOGO_URL', 'https://richcavagnarobooks.com/imgs/book-mockup.png');
$debugMode = $env('DEBUG_MODE', '0') === '1';

if ($smtpHost === '' || $smtpUser === '' || $smtpPass === '') {
  http_response_code(500);
  echo json_encode(["status"=>"error","message"=>"The mail service is not configured yet. Please try again later."]);
  exit();
}

try {
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host       = $smtpHost;
  $mail->SMTPAuth   = true;
  $mail->Username   = $smtpUser;
  $mail->Password   = $smtpPass;
  $mail->Port       = $smtpPort;

  $secure = strtolower($smtpSecure);
  if ($secure === 'ssl' || $secure === 'smtps') {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  } elseif ($secure === 'tls') {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  } else {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  }

  if ($isNewsletter) {
    $subject = $formName === 'book-newsletter'
      ? 'New Book Newsletter Subscriber'
      : 'New Newsletter Subscriber';
    $emailTitle = $subject;
  } elseif ($name !== '') {
    $subject = $subjectInput !== ''
      ? "New Website Inquiry: {$subjectInput}"
      : "New Website Inquiry from {$name}";
    $emailTitle = 'New Rich Cavagnaro Books Inquiry';
  } else {
    $subject = $service !== '' ? "New Inquiry from Sign-Up" : "New Website Inquiry";
    $emailTitle = 'New Rich Cavagnaro Books Inquiry';
  }

  $senderName = $name !== '' ? $name : ($isNewsletter ? 'Subscriber' : 'Website Visitor');
  $mail->setFrom($smtpUser, $mailFromName);
  $mail->addAddress($mailRecipient);
  if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $mail->addReplyTo($email, $senderName);
  }

  $mail->Subject = $subject;
  $mail->isHTML(true);

  $senderInfo = [
    'ip'      => $user_ip,
    'city'    => $city,
    'region'  => $region,
    'country' => $country,
    'loc'     => $loc,
    'org'     => $org,
    'referer' => $referer,
  ];

  if ($isNewsletter) {
    $html = render_newsletter_email([
      'meta' => [
        'title'    => $emailTitle,
        'dateStr'  => $dateStr,
        'logoUrl'  => $logoUrl,
        'source'   => $formName,
      ],
      'subscriber' => [
        'name'  => $name,
        'email' => $email,
      ],
      'sender' => $senderInfo,
    ]);

    $alt = "{$emailTitle}\n{$dateStr}\n\n";
    $alt .= "Email: {$email}\n";
    if ($name !== '') $alt .= "Name: {$name}\n";
    $alt .= "Source: {$formName}\n";
  } else {
    $html = render_form_email([
      'meta' => [
        'title'        => $emailTitle,
        'dateStr'      => $dateStr,
        'serviceChips' => $serviceChips,
      ],
      'rows' => $rows,
      'sender' => $senderInfo,
    ]);

    $alt = "{$emailTitle}\n{$dateStr}\n\n";
    foreach ($rows as $r) $alt .= $r['label'].': '.strip_tags($r['value'])."\n";
  }

  $mail->Body = $html;
  $mail->AltBody = $alt;

  if (!$mail->send()) throw new Exception("Mailer Error: " . $mail->ErrorInfo);

  http_response_code(200);
  echo json_encode(["status"=>"success","message"=>"Message sent successfully!"]);
  exit();

} catch (Exception $e) {
  http_response_code(500);
  $message = $debugMode
    ? "Message could not be sent. Error: ".$e->getMessage()
    : "We could not send your message right now. Please try again later.";
  echo json_encode(["status"=>"error","message"=>$message]);
  exit();
}
