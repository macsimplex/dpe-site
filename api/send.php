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

// Augmenter la limite pour recevoir le PDF base64
ini_set('post_max_size', '20M');

require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Données invalides']);
    exit;
}

$email  = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$pdfB64 = $input['pdf'] ?? '';
$sgp    = intval($input['sgp'] ?? 0);

if (!$email || !$pdfB64) {
    http_response_code(400);
    echo json_encode(['error' => 'Email ou PDF manquant']);
    exit;
}

/* ── Envoi email via Brevo ── */
$dateStr = date('d/m/Y');

$htmlBody = '
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4efe6;font-family:Georgia,serif">
<div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="text-align:center;margin-bottom:32px">
        <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a052;margin:0">DYNAMIQUES DE PRÉSENCES ÉNERGÉTIQUES</p>
    </div>
    <div style="background:#0d0b08;border-radius:8px;padding:40px 32px;color:#ede8e0">
        <h1 style="font-size:22px;font-weight:normal;margin:0 0 20px;color:#ede8e0">Vous avez fait le premier pas.</h1>
        <p style="font-size:14px;line-height:1.7;color:#b0a898;margin:0 0 16px">
            Vous avez pris 10 minutes pour poser un regard honnête sur votre équipe. C\'est déjà un acte de leadership.
        </p>
        <p style="font-size:14px;line-height:1.7;color:#b0a898;margin:0 0 24px">
            Votre rapport complet est en pièce jointe. Vous y trouverez :
        </p>
        <ul style="font-size:13px;line-height:1.8;color:#b0a898;margin:0 0 24px;padding-left:20px">
            <li>L\'état de vos 5 dimensions : <strong style="color:#c9a052">' . $sgp . '/25</strong></li>
            <li>Ce qui freine votre équipe — et ce qui la porte</li>
            <li>Par où commencer pour avancer</li>
            <li>Le potentiel concret que vous pouvez libérer</li>
        </ul>
        <div style="border-top:1px solid #2a2218;padding-top:20px;margin-top:20px">
            <p style="font-size:13px;color:#7a6a55;margin:0 0 8px">Et ensuite ?</p>
            <p style="font-size:14px;line-height:1.7;color:#b0a898;margin:0">
                Un <strong style="color:#ede8e0">atelier DPE d\'une journée avec votre équipe</strong> transforme ces constats en actions concrètes. Contactez un facilitateur pour organiser le vôtre.
            </p>
        </div>
    </div>
    <div style="text-align:center;margin-top:24px">
        <p style="font-size:11px;color:#7a6a55;margin:0">DPE · Dynamiques de Présences Énergétiques</p>
        <p style="font-size:10px;color:#7a6a55;margin:4px 0 0">energetics.systems · ' . $dateStr . '</p>
    </div>
</div>
</body>
</html>';

$brevoPayload = [
    'sender' => [
        'name'  => SENDER_NAME,
        'email' => SENDER_EMAIL
    ],
    'to' => [
        ['email' => $email]
    ],
    'subject' => 'Votre rapport DPE · ' . $sgp . '/25',
    'htmlContent' => $htmlBody,
    'attachment' => [
        [
            'content' => $pdfB64,
            'name'    => 'DPE-Rapport-' . date('Y-m-d') . '.pdf'
        ]
    ]
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
