<?php

require_once __DIR__ . '/../vendor/autoload.php';

class PdfGenerator
{
    /**
     * Generate PDF from template data.
     * Returns base64-encoded PDF string.
     */
    public function generate(array $data): string
    {
        $mpdf = new \Mpdf\Mpdf([
            'format'             => 'A4',
            'margin_top'         => 0,
            'margin_bottom'      => 0,
            'margin_left'        => 0,
            'margin_right'       => 0,
            'default_font'       => 'dejavusans',
            'default_font_size'  => 10,
            'tempDir'            => sys_get_temp_dir() . '/mpdf',
        ]);

        // Load template
        $templatePath = __DIR__ . '/templates/rapport-mpdf.html';
        $html = file_get_contents($templatePath);

        if (!$html) {
            throw new \Exception('Template not found: ' . $templatePath);
        }

        // Replace custom font names with system fonts
        $html = str_replace("'cormorant',Georgia,serif", "Georgia,serif", $html);
        $html = str_replace("'cormorant', Georgia, serif", "Georgia,serif", $html);
        $html = str_replace("'jost',Arial,sans-serif", "dejavusans,Arial,sans-serif", $html);
        $html = str_replace("'jost', Arial, sans-serif", "dejavusans,Arial,sans-serif", $html);

        // Inject all markers
        foreach ($data as $key => $value) {
            $html = str_replace('{{' . $key . '}}', htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8'), $html);
        }

        // SVG radar needs raw HTML (not escaped)
        if (isset($data['RADAR_SVG'])) {
            $html = str_replace(
                htmlspecialchars($data['RADAR_SVG'], ENT_QUOTES, 'UTF-8'),
                $data['RADAR_SVG'],
                $html
            );
        }

        // Render PDF
        $mpdf->WriteHTML($html);

        // Return as base64
        $pdfContent = $mpdf->Output('', 'S');
        return base64_encode($pdfContent);
    }
}
