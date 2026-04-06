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
require_once __DIR__ . '/DpeCalculator.php';
require_once __DIR__ . '/ClaudeClient.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Données invalides']);
    exit;
}

$email    = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$role     = htmlspecialchars($input['role'] ?? '', ENT_QUOTES, 'UTF-8');
$secteur  = htmlspecialchars($input['secteur'] ?? '', ENT_QUOTES, 'UTF-8');
$effectif = intval($input['effectif'] ?? 0);
$scores   = $input['scores'] ?? [];

if (!$email || count($scores) !== 5) {
    http_response_code(400);
    echo json_encode(['error' => 'Données incomplètes']);
    exit;
}

$csc  = array_map('intval', $scores);
$data = DpeCalculator::computeAll($csc, $role, $secteur, $effectif);

/* ── Appel IA optionnel ── */
try {
    $claude  = new ClaudeClient();
    $aiTexts = $claude->generate($data);
    $data    = array_merge($data, $aiTexts);
} catch (\Exception $e) {
    // fallbacks déjà dans $data
}

/* ── Injection dans le template HTML original ── */
$templatePath = __DIR__ . '/templates/rapport.html';
$html = file_get_contents($templatePath);

if (!$html) {
    http_response_code(500);
    echo json_encode(['error' => 'Template introuvable']);
    exit;
}

foreach ($data as $key => $value) {
    $html = str_replace('{{' . $key . '}}', (string)$value, $html);
}

/* ── Enregistrement en base ── */
$sgp = DpeCalculator::sgpCalc($csc);
try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $stmt = $pdo->prepare('INSERT INTO evaluations
        (email, role, secteur, effectif, score_relationnel, score_sens, score_gouvernance, score_operationnel, score_apprenance, sgp_norm, sgp_pct, sigma)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
        $email, $role, $secteur, $effectif,
        $csc[0], $csc[1], $csc[2], $csc[3], $csc[4],
        $sgp['sgpNorm'], $sgp['pct'], $sgp['sigma']
    ]);
} catch (PDOException $e) {
    // non bloquant
}

echo json_encode([
    'success' => true,
    'html'    => $html,
    'sgp'     => $data['SGP'],
    'email'   => $email,
]);
