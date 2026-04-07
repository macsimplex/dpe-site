<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Données invalides']);
    exit;
}

$nom      = htmlspecialchars($input['nom'] ?? '', ENT_QUOTES, 'UTF-8');
$email    = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$activite = htmlspecialchars($input['activite'] ?? '', ENT_QUOTES, 'UTF-8');
$message  = htmlspecialchars($input['message'] ?? '', ENT_QUOTES, 'UTF-8');

if (!$email || !$nom) {
    http_response_code(400);
    echo json_encode(['error' => 'Nom et email requis']);
    exit;
}

$dateStr = date('d/m/Y à H:i');

$htmlBody = '
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4efe6;font-family:Georgia,serif">
<div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="text-align:center;margin-bottom:24px">
        <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a052;margin:0">DYNAMIQUES DE PRÉSENCES ÉNERGÉTIQUES</p>
    </div>
    <div style="background:#0d0b08;border-radius:8px;padding:32px 28px;color:#ede8e0">
        <h2 style="font-size:18px;font-weight:normal;margin:0 0 20px;color:#c9a052">Demande facilitateur DPE</h2>
        <table style="width:100%;font-family:Arial,sans-serif;font-size:13px;color:#b0a898">
            <tr><td style="padding:6px 0;color:#7a6a55;width:100px">Nom</td><td style="padding:6px 0">' . $nom . '</td></tr>
            <tr><td style="padding:6px 0;color:#7a6a55">Email</td><td style="padding:6px 0"><a href="mailto:' . $email . '" style="color:#c9a052">' . $email . '</a></td></tr>
            <tr><td style="padding:6px 0;color:#7a6a55">Activité</td><td style="padding:6px 0">' . ($activite ?: '—') . '</td></tr>
        </table>
        <div style="border-top:1px solid #2a2218;margin-top:16px;padding-top:16px">
            <p style="font-size:12px;color:#7a6a55;margin:0 0 6px">Message :</p>
            <p style="font-size:13px;color:#b0a898;line-height:1.7;margin:0">' . nl2br($message ?: '—') . '</p>
        </div>
    </div>
    <p style="text-align:center;font-size:10px;color:#7a6a55;margin-top:16px">Reçu le ' . $dateStr . '</p>
</div>
</body>
</html>';

$brevoPayload = [
    'sender' => [
        'name'  => SENDER_NAME,
        'email' => SENDER_EMAIL
    ],
    'to' => [
        ['email' => 'maxime@simplex.coach', 'name' => 'Maxime Bui']
    ],
    'replyTo' => [
        'email' => $email,
        'name'  => $nom
    ],
    'subject' => 'Demande facilitateur DPE — ' . $nom,
    'htmlContent' => $htmlBody
];

$ch = curl_init('https://api.brevo.com/v3/smtp/email');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
        'accept: application/json',
        'api-key: ' . BREVO_API_KEY,
        'content-type: application/json'
    ],
    CURLOPT_POSTFIELDS     => json_encode($brevoPayload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(502);
    echo json_encode(['error' => 'Erreur envoi email', 'details' => $response]);
}
