<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/DpeCalculator.php';

$token = $_GET['t'] ?? '';
if (!$token || !preg_match('/^[a-f0-9]{64}$/', $token)) {
    http_response_code(400);
    echo json_encode(['error' => 'Token invalide']);
    exit;
}

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare('SELECT * FROM evaluations WHERE token = ?');
    $stmt->execute([$token]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Rapport introuvable']);
        exit;
    }

    /* Marquer comme consulté */
    if (!$row['viewed_at']) {
        $pdo->prepare('UPDATE evaluations SET viewed_at = NOW() WHERE token = ?')->execute([$token]);
    }

    /* Recalculer toutes les données du rapport */
    $csc = [
        intval($row['score_relationnel']),
        intval($row['score_sens']),
        intval($row['score_gouvernance']),
        intval($row['score_operationnel']),
        intval($row['score_apprenance'])
    ];
    $data = DpeCalculator::computeAll($csc, $row['role'], $row['secteur'], intval($row['effectif']));

    /* Injecter les textes IA stockés */
    if ($row['ai_synthese']) $data['SYNTHESE'] = $row['ai_synthese'];
    if ($row['ai_point_saillant']) $data['POINT_SAILLANT'] = $row['ai_point_saillant'];
    $insights = json_decode($row['ai_insights'] ?? '[]', true);
    if (is_array($insights)) {
        for ($i = 0; $i < min(5, count($insights)); $i++) {
            $data['CADRE_' . $i . '_INSIGHT'] = $insights[$i];
        }
    }

    /* Charger et injecter le template */
    $html = file_get_contents(__DIR__ . '/templates/rapport.html');
    if (!$html) {
        http_response_code(500);
        echo json_encode(['error' => 'Template introuvable']);
        exit;
    }

    foreach ($data as $key => $value) {
        $html = str_replace('{{' . $key . '}}', (string)$value, $html);
    }

    echo json_encode([
        'success' => true,
        'html'    => $html,
        'sgp'     => $data['SGP'],
        'pct'     => $data['PCT'],
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur']);
}
