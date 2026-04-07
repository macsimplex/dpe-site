<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Méthode non autorisée']); exit; }

set_time_limit(60);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/DpeCalculator.php';
require_once __DIR__ . '/ClaudeClient.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { http_response_code(400); echo json_encode(['error' => 'Données invalides']); exit; }

$email    = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$role     = htmlspecialchars($input['role'] ?? '', ENT_QUOTES, 'UTF-8');
$secteur  = htmlspecialchars($input['secteur'] ?? '', ENT_QUOTES, 'UTF-8');
$effectif = intval($input['effectif'] ?? 0);
$scores   = $input['scores'] ?? [];

if (!$email) { http_response_code(400); echo json_encode(['error' => 'Email invalide']); exit; }
if (count($scores) !== 5) { http_response_code(400); echo json_encode(['error' => 'Scores incomplets']); exit; }

/* ── Honeypot ── */
if (!empty($input['website'])) { http_response_code(403); echo json_encode(['error' => 'Accès refusé']); exit; }

/* ── Rate limiting ── */
try {
    $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    // Max 3 rapports par email par 24h
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM evaluations WHERE email = ? AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)');
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() >= 3) {
        http_response_code(429);
        echo json_encode(['error' => 'Vous avez déjà généré 3 rapports aujourd\'hui. Réessayez demain.']);
        exit;
    }

    // Max 10 rapports par IP par heure
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    if ($ip) {
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM evaluations WHERE created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)');
        $stmt->execute();
        $recentTotal = $stmt->fetchColumn();
        // Fallback simple : limiter le total global par heure (pas de colonne IP en base)
        if ($recentTotal >= 30) {
            http_response_code(429);
            echo json_encode(['error' => 'Trop de demandes. Veuillez patienter quelques minutes.']);
            exit;
        }
    }
} catch (PDOException $e) {
    // Ne pas bloquer si la vérification échoue
}

$csc = array_map('intval', $scores);
$sgp = DpeCalculator::sgpCalc($csc);

/* ── 1. Calculs + textes IA ── */
$data = DpeCalculator::computeAll($csc, $role, $secteur, $effectif);
$aiTexts = ['synthese' => $data['SYNTHESE'], 'pointSaillant' => $data['POINT_SAILLANT'], 'insights' => []];
for ($i = 0; $i < 5; $i++) { $aiTexts['insights'][] = $data['CADRE_' . $i . '_INSIGHT']; }

try {
    $claude = new ClaudeClient();
    $aiResult = $claude->generate($data);
    if (!empty($aiResult['SYNTHESE'])) $aiTexts['synthese'] = $aiResult['SYNTHESE'];
    if (!empty($aiResult['POINT_SAILLANT'])) $aiTexts['pointSaillant'] = $aiResult['POINT_SAILLANT'];
    for ($i = 0; $i < 5; $i++) {
        if (!empty($aiResult['CADRE_' . $i . '_INSIGHT'])) $aiTexts['insights'][$i] = $aiResult['CADRE_' . $i . '_INSIGHT'];
    }
} catch (\Exception $e) { /* fallbacks already set */ }

/* ── 2. Générer token + stocker en base ── */
$token = bin2hex(random_bytes(32));

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare('INSERT INTO evaluations
        (token, email, role, secteur, effectif, score_relationnel, score_sens, score_gouvernance, score_operationnel, score_apprenance, sgp_norm, sgp_pct, sigma, ai_synthese, ai_point_saillant, ai_insights)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

    $stmt->execute([
        $token, $email, $role, $secteur, $effectif,
        $csc[0], $csc[1], $csc[2], $csc[3], $csc[4],
        $sgp['sgpNorm'], $sgp['pct'], $sgp['sigma'],
        $aiTexts['synthese'], $aiTexts['pointSaillant'],
        json_encode($aiTexts['insights'], JSON_UNESCAPED_UNICODE)
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur base de données']);
    exit;
}

/* ── 3. Envoyer email avec lien ── */
$reportUrl = 'https://energetics.systems/rapport.html?t=' . $token;
$dateStr = date('d/m/Y');

$htmlBody = '
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4efe6;font-family:Georgia,serif">
<div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="text-align:center;margin-bottom:32px">
        <img src="https://energetics.systems/assets/logo-512.png" alt="DPE" width="48" height="48" style="display:block;margin:0 auto 14px;opacity:0.7;">
        <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a052;margin:0">DYNAMIQUES DE PRÉSENCES ÉNERGÉTIQUES</p>
    </div>
    <div style="background:#0d0b08;border-radius:8px;padding:40px 32px;color:#ede8e0">
        <h1 style="font-size:22px;font-weight:normal;margin:0 0 20px;color:#ede8e0">Vous avez fait le premier pas.</h1>
        <p style="font-size:14px;line-height:1.7;color:#b0a898;margin:0 0 24px">
            Votre rapport est prêt. Il contient l\'état de vos 5 dimensions, ce qui freine votre équipe, ce qui la porte — et par où commencer.
        </p>
        <div style="text-align:center;margin:28px 0">
            <a href="' . $reportUrl . '" style="display:inline-block;padding:14px 36px;background:#c9a052;color:#0d0b08;font-family:Arial,sans-serif;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;">Consulter mon rapport →</a>
        </div>
        <p style="font-size:12px;line-height:1.6;color:#7a6a55;margin:0;text-align:center">
            Ce lien est personnel et reste accessible à tout moment.
        </p>
        <div style="border-top:1px solid #2a2218;padding-top:20px;margin-top:24px">
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
    'sender' => ['name' => SENDER_NAME, 'email' => SENDER_EMAIL],
    'to' => [['email' => $email]],
    'subject' => 'Votre rapport DPE est prêt',
    'htmlContent' => $htmlBody
];

$ch = curl_init('https://api.brevo.com/v3/smtp/email');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => ['accept: application/json', 'api-key: ' . BREVO_API_KEY, 'content-type: application/json'],
    CURLOPT_POSTFIELDS     => json_encode($brevoPayload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true, 'message' => 'Email envoyé']);
} else {
    http_response_code(502);
    echo json_encode(['error' => 'Erreur envoi email', 'details' => $response]);
}
