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
        $fontDir = __DIR__ . '/fonts';

        $mpdf = new \Mpdf\Mpdf([
            'format'        => 'A4',
            'margin_top'    => 0,
            'margin_bottom' => 0,
            'margin_left'   => 0,
            'margin_right'  => 0,
            'fontDir'       => [$fontDir],
            'fontdata'      => [
                'cormorant' => [
                    'R'  => 'CormorantGaramond-Regular.ttf',
                    'I'  => 'CormorantGaramond-LightItalic.ttf',
                    'B'  => 'CormorantGaramond-SemiBold.ttf',
                    'L'  => 'CormorantGaramond-Light.ttf',
                ],
                'jost' => [
                    'R'  => 'Jost-Light.ttf',
                ],
            ],
            'default_font'       => 'jost',
            'default_font_size'  => 10,
            'tempDir'            => sys_get_temp_dir() . '/mpdf',
        ]);

        // Load template
        $templatePath = __DIR__ . '/templates/rapport-mpdf.html';
        $html = file_get_contents($templatePath);

        if (!$html) {
            throw new \Exception('Template not found: ' . $templatePath);
        }

        // Inject all markers
        foreach ($data as $key => $value) {
            $html = str_replace('{{' . $key . '}}', (string)$value, $html);
        }

        // Render PDF
        $mpdf->WriteHTML($html);

        // Return as base64
        $pdfContent = $mpdf->Output('', 'S');
        return base64_encode($pdfContent);
    }
}
