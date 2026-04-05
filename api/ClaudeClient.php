<?php

class ClaudeClient
{
    private string $apiKey;
    private string $model;
    private bool $enabled;

    public function __construct()
    {
        $this->enabled = defined('AI_ENABLED') ? AI_ENABLED : false;
        $this->apiKey  = defined('AI_API_KEY') ? AI_API_KEY : '';
        $this->model   = defined('AI_MODEL') ? AI_MODEL : 'claude-sonnet-4-20250514';
    }

    /**
     * Generate narrative texts for the report.
     * Returns ['synthese' => ..., 'pointSaillant' => ..., 'insights' => [5 strings]]
     * Falls back to pre-written texts on any failure.
     */
    public function generate(array $data): array
    {
        if (!$this->enabled || empty($this->apiKey)) {
            return $this->fallback($data);
        }

        try {
            return $this->callApi($data);
        } catch (\Exception $e) {
            return $this->fallback($data);
        }
    }

    private function callApi(array $data): array
    {
        $systemPrompt = "Tu génères le contenu narratif d'un rapport DPE — Dynamiques de Présences Énergétiques.\n"
            . "Réponds UNIQUEMENT en JSON valide. Pas de markdown, pas d'explication.\n"
            . "Langage accessible à tout manager : pas de jargon académique.\n"
            . "Ton direct, bienveillant, ancré dans des situations concrètes du quotidien.\n"
            . "Pas de : \"cadre systémique\", \"écart-type\", \"SGP\", \"σ\", \"dissipation\", \"entropie\".\n"
            . "Oui : situations du quotidien, \"réunion du lundi\", \"qui décide\", \"quelqu'un qui part\".\n"
            . "Chaque insight mentionne le lien avec au moins une autre dimension.\n"
            . "Insights négatifs : sévérité proportionnelle au score (≤8 = frein fort, 9-10 = modéré, ≥11 = positif).";

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
            'model'      => $this->model,
            'max_tokens' => 1200,
            'messages'   => [
                ['role' => 'user', 'content' => json_encode($payload, JSON_UNESCAPED_UNICODE)],
            ],
            'system' => $systemPrompt,
        ];

        $ch = curl_init('https://api.anthropic.com/v1/messages');
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_HTTPHEADER     => [
                'Content-Type: application/json',
                'x-api-key: ' . $this->apiKey,
                'anthropic-version: 2023-06-01',
            ],
            CURLOPT_POSTFIELDS     => json_encode($body, JSON_UNESCAPED_UNICODE),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 20,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode < 200 || $httpCode >= 300 || !$response) {
            throw new \Exception('Claude API error: HTTP ' . $httpCode);
        }

        $json = json_decode($response, true);
        $raw  = $json['content'][0]['text'] ?? '';
        $clean = preg_replace('/```json|```/', '', trim($raw));
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

    private function fallback(array $data): array
    {
        // Return empty — DpeCalculator already set fallback values in $data
        return [];
    }
}
