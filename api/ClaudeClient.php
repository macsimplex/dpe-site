<?php

class ClaudeClient
{
    private string $apiKey;
    private string $model;
    private string $productId;
    private bool $enabled;

    public function __construct()
    {
        $this->enabled   = defined('AI_ENABLED') ? AI_ENABLED : false;
        $this->apiKey    = defined('AI_API_KEY') ? AI_API_KEY : '';
        $this->productId = defined('AI_PRODUCT_ID') ? AI_PRODUCT_ID : '';
        $this->model     = defined('AI_MODEL') ? AI_MODEL : 'qwen3';
    }

    /**
     * Generate narrative texts for the report.
     * Returns ['SYNTHESE' => ..., 'POINT_SAILLANT' => ..., 'CADRE_x_INSIGHT' => ...]
     * Falls back to pre-written texts on any failure.
     */
    public function generate(array $data): array
    {
        if (!$this->enabled || empty($this->apiKey) || empty($this->productId)) {
            return [];
        }

        try {
            return $this->callApi($data);
        } catch (\Exception $e) {
            return [];
        }
    }

    private function callApi(array $data): array
    {
        $systemPrompt = "Tu génères le contenu narratif d'un rapport DPE — Dynamiques de Présences Énergétiques.\n"
            . "Réponds UNIQUEMENT en JSON valide. Pas de markdown, pas d'explication, pas de ```.\n"
            . "Langage accessible à tout manager ou dirigeant de PME : pas de jargon académique.\n"
            . "Ton direct, bienveillant, ancré dans des situations concrètes du quotidien.\n"
            . "Pas de : \"cadre systémique\", \"écart-type\", \"SGP\", \"σ\", \"dissipation\", \"entropie\".\n"
            . "Oui : situations du quotidien, \"réunion du lundi\", \"qui décide\", \"quelqu'un qui part\".\n"
            . "Chaque insight mentionne le lien avec au moins une autre dimension.\n"
            . "Insights négatifs : sévérité proportionnelle au score (≤8 = frein fort, 9-10 = modéré, ≥11 = positif).\n\n"
            . "Format de réponse attendu :\n"
            . "{\"synthese\": \"2-3 phrases sur le score global, contextualisées au rôle et secteur.\",\n"
            . " \"pointSaillant\": \"1-2 phrases croisant la dimension la plus faible avec les forces existantes.\",\n"
            . " \"insights\": [\"Texte Confiance\", \"Texte Cap\", \"Texte Décision\", \"Texte Organisation\", \"Texte Apprentissage\"]}";

        $scores = [];
        for ($i = 0; $i < 5; $i++) {
            $scores[] = intval($data['CADRE_' . $i . '_SCORE']);
        }

        $payload = [
            'scores'    => $scores,
            'cadres'    => DpeCalculator::CADRE_NAMES,
            'sgp'       => intval($data['SGP']),
            'sigma'     => floatval($data['SIGMA']),
            'pct'       => intval($data['PCT']),
            'role'      => $data['ROLE'],
            'secteur'   => $data['SECTEUR_LABEL'],
            'effectif'  => intval($data['EFFECTIF_NUM']),
            'priorites' => [$data['PRIO_1_NOM'], $data['PRIO_2_NOM']],
            'forces'    => [$data['FORCE_1_NOM'], $data['FORCE_2_NOM']],
        ];

        $body = [
            'model'                => $this->model,
            'stream'               => false,
            'max_completion_tokens' => 1500,
            'temperature'          => 0.7,
            'messages'             => [
                ['role' => 'system', 'content' => $systemPrompt],
                ['role' => 'user', 'content' => json_encode($payload, JSON_UNESCAPED_UNICODE)],
            ],
        ];

        $url = 'https://api.infomaniak.com/2/ai/' . $this->productId . '/openai/v1/chat/completions';

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_HTTPHEADER     => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $this->apiKey,
            ],
            CURLOPT_POSTFIELDS     => json_encode($body, JSON_UNESCAPED_UNICODE),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 30,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode < 200 || $httpCode >= 300 || !$response) {
            throw new \Exception('Infomaniak AI error: HTTP ' . $httpCode);
        }

        $json = json_decode($response, true);
        $raw  = $json['choices'][0]['message']['content'] ?? '';

        // Nettoyer le JSON (enlever ```json, thinking tags, etc.)
        $clean = preg_replace('/```json|```/', '', $raw);
        $clean = preg_replace('/<think>[\s\S]*?<\/think>/', '', $clean);
        $clean = trim($clean);
        $aiData = json_decode($clean, true);

        if (!$aiData || !isset($aiData['synthese'])) {
            throw new \Exception('Invalid AI response format');
        }

        $result = [
            'SYNTHESE'       => $aiData['synthese'],
            'POINT_SAILLANT' => $aiData['pointSaillant'] ?? $data['POINT_SAILLANT'],
        ];

        if (isset($aiData['insights']) && is_array($aiData['insights']) && count($aiData['insights']) >= 5) {
            for ($i = 0; $i < 5; $i++) {
                $result['CADRE_' . $i . '_INSIGHT'] = $aiData['insights'][$i];
            }
        }

        return $result;
    }
}
