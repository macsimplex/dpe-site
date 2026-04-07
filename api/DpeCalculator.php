<?php

class DpeCalculator
{
    const SECS = [
        'autre'     => ['l' => 'Tous secteurs',      's' => 42000, 't' => 0.17],
        'tech'      => ['l' => 'Tech / Numérique',   's' => 54000, 't' => 0.22],
        'conseil'   => ['l' => 'Conseil / Services',  's' => 56000, 't' => 0.21],
        'industrie' => ['l' => 'Industrie',           's' => 40000, 't' => 0.14],
        'sante'     => ['l' => 'Santé',               's' => 34000, 't' => 0.20],
        'finance'   => ['l' => 'Finance',             's' => 54000, 't' => 0.16],
        'retail'    => ['l' => 'Commerce',            's' => 30000, 't' => 0.28],
        'public'    => ['l' => 'Public / Asso.',      's' => 33000, 't' => 0.10],
    ];

    const CADRE_IDS    = ['r', 's', 'g', 'o', 'a'];
    const CADRE_NAMES  = ['Confiance', 'Cap', 'Décision', 'Organisation', 'Apprentissage'];
    const CADRE_COLORS = ['#c4603a', '#3d7040', '#2a4a8b', '#6b4a9b', '#b8924a'];
    const CADRE_DESCS  = [
        'Est-ce que les gens se disent vraiment les choses ?',
        'Est-ce que tout le monde sait où on va et pourquoi ?',
        'Qui décide quoi ? Est-ce que c\'est clair pour tout le monde ?',
        'Les réunions servent-elles à quelque chose ? L\'équipe s\'adapte-t-elle vite ?',
        'L\'équipe progresse-t-elle vraiment — ou refait-elle toujours les mêmes erreurs ?',
    ];

    const CADRE_LOW = [
        'La confiance est fragile. C\'est le premier levier à travailler — tout le reste en dépend.',
        'Le cap n\'est pas assez partagé. Votre équipe avance, mais sans boussole commune.',
        'Les règles du jeu ne sont pas assez claires. Ça crée de la lenteur et de la frustration.',
        'L\'organisation est fragile. Ça repose trop sur quelques personnes et quelques habitudes.',
        'L\'équipe a du mal à tirer les leçons. Les mêmes problèmes reviennent.',
    ];

    const CADRE_HIGH = [
        'La confiance est solide. Les gens se parlent franchement, et les tensions se règlent vite.',
        'Le cap est clair et partagé. Les gens comprennent le sens de ce qu\'ils font au quotidien.',
        'C\'est clair et fluide. Chacun sait ce qu\'il peut décider et ce qui doit remonter.',
        'L\'équipe est bien rodée. Les rôles sont clairs, les réunions utiles, l\'adaptation rapide.',
        'L\'équipe apprend de ses erreurs et s\'améliore en continu. Les bonnes idées circulent.',
    ];

    const CADRE_ACTIONS = [
        'Créer des moments d\'échange sans enjeu. Montrer l\'exemple en accueillant les désaccords.',
        'Échanger régulièrement sur le pourquoi, pas seulement le quoi. Expliquer vos décisions.',
        'Clarifier qui décide quoi. Écrire les décisions clés. Donner plus d\'autonomie.',
        'Clarifier les rôles de chacun. Simplifier les réunions. Prévoir des relèves.',
        'Prendre 15 minutes après les projets pour débriefer. Partager les leçons apprises.',
    ];

    const FORCE_TEXTS = [
        'r' => 'La confiance est là. C\'est la base sans laquelle rien d\'autre ne tient vraiment. Protégez-la : c\'est le terreau dans lequel tout ce que vous voulez changer peut prendre racine.',
        's' => 'C\'est votre atout le plus rare. Quand les gens comprennent et partagent le pourquoi de ce qu\'ils font, leur engagement résiste aux moments difficiles. Entretenez-le.',
        'g' => 'Les règles du jeu sont claires et reconnues. Le pouvoir circule vers la compétence. C\'est une fondation solide sur laquelle les autres dimensions peuvent s\'appuyer.',
        'o' => 'Vos façons de vous coordonner fonctionnent. Ce point fort progressera encore davantage quand la Gouvernance se clarifie — les deux sont directement liées.',
        'a' => 'Votre organisation sait apprendre de ce qu\'elle vit. Les erreurs alimentent le progrès. Continuez à créer des espaces où cette intelligence peut se partager.',
    ];

    const PRIO_TEXTS = [
        'r' => 'Renforcer l\'espace où chacun peut dire ce qu\'il pense sans craindre les conséquences. Des rituels simples — retours réguliers, moments d\'expression structurés — suffisent souvent.',
        's' => 'Aider chacun à comprendre et partager le pourquoi de ce qu\'il fait. Un récit commun clair rend les décisions plus faciles à prendre et à accepter.',
        'g' => 'Clarifier qui décide quoi, comment et avec qui. Pas besoin d\'une réorganisation — quelques règles du jeu claires suffisent souvent.',
        'o' => 'Clarifier les rôles et les rituels de coordination. Des réunions qui aboutissent, des actions claires, une équipe qui sait quoi faire sans qu\'on ait besoin de tout piloter.',
        'a' => 'Créer des moments réguliers où l\'équipe s\'arrête pour apprendre de ce qu\'elle a vécu — pas pour chercher des coupables, mais pour comprendre et s\'améliorer ensemble.',
    ];

    const SYNTHESE_FALLBACK = [
        'high'   => 'Votre organisation exprime une cohérence forte. Plusieurs dimensions sont bien activées et se renforcent mutuellement. Le potentiel résiduel réside dans le rééquilibrage des quelques points de tension identifiés.',
        'medium' => 'Votre organisation fonctionne — mais une partie de son énergie est absorbée par des frictions internes plutôt que d\'aller vers ce qui compte vraiment. Les dimensions fortes existent : elles attendent d\'être libérées des freins qui les ralentissent.',
        'low'    => 'Votre organisation porte un potentiel significatif encore largement sous-exploité. Les frictions internes captent une énergie qui pourrait être réinvestie dans la création de valeur. La bonne nouvelle : ce potentiel est déjà là — il ne demande pas à être créé.',
    ];

    /* ── Métriques globales ── */

    public static function sgpCalc(array $csc): array
    {
        $mean     = array_sum($csc) / count($csc);
        $variance = array_sum(array_map(fn($v) => pow($v - $mean, 2), $csc)) / count($csc);
        $sigma    = sqrt($variance);
        $sgpRaw   = max(0, $mean - $sigma);
        return [
            'mean'    => $mean,
            'sigma'   => $sigma,
            'sgpRaw'  => $sgpRaw,
            'sgpNorm' => round($sgpRaw * 25 / 15),
            'pct'     => round($sgpRaw / 15 * 100),
            'delta'   => max($csc) - min($csc),
        ];
    }

    public static function dissipRate(int $n): float
    {
        $c = max(5, min(25, $n));
        return 0.38 - (0.38 - 0.04) * (($c - 5) / 20);
    }

    public static function te(int $n): float
    {
        return (1 - max(5, min(25, $n)) / 25) * 0.10;
    }

    public static function me(int $n): float
    {
        return 0.15 * (1 - max(5, min(25, $n)) / 25) * 0.32;
    }

    public static function potentiel(int $n, float $ms, int $hc, float $sal): int
    {
        return round($ms * self::dissipRate($n))
             + round($hc * self::te($n) * $sal * 0.85)
             + round($ms * self::me($n));
    }

    public static function fmt(float $n): string
    {
        if ($n >= 1e6) return number_format($n / 1e6, 1, ',', '') . ' M€';
        if ($n >= 1e3) return round($n / 1e3) . ' K€';
        return number_format($n, 0, ',', ' ') . ' €';
    }

    public static function cadreColor(int $s): string
    {
        $p = ($s - 3) / 12;
        if ($p >= 0.83) return '#3d7040';
        if ($p >= 0.58) return '#7a8a3a';
        if ($p >= 0.33) return '#b8924a';
        return '#8b5a3a';
    }

    public static function sqLabel(int $pct): array
    {
        if ($pct >= 80) $c = '#4a7a4a';
        elseif ($pct >= 60) $c = '#7a8a3a';
        elseif ($pct >= 40) $c = '#b8924a';
        else $c = '#8b5a3a';
        return ['t' => $pct . '% du potentiel activé', 'c' => $c];
    }

    public static function niveauLabel(int $pct): array
    {
        if ($pct >= 80) return ['label' => 'Cohérence forte', 'desc' => 'Les dimensions se renforcent mutuellement. Focus : maintenir et affiner.'];
        if ($pct >= 60) return ['label' => 'Dynamique engagée', 'desc' => 'Des bases solides avec des leviers d\'amélioration identifiés.'];
        if ($pct >= 40) return ['label' => 'Fragilités identifiées', 'desc' => 'Des tensions internes absorbent une partie de l\'énergie collective.'];
        return ['label' => 'Potentiel à libérer', 'desc' => 'Un potentiel significatif attend d\'être activé. Le premier pas compte.'];
    }

    /* ── Radar SVG ── */

    public static function generateRadarSvg(array $scores, float $cx = 110, float $cy = 110, float $rv = 80): string
    {
        $nv = 5;
        $h  = '';

        // Grille pentagonale
        for ($lv = 1; $lv <= 5; $lv++) {
            $rd  = $rv * $lv / 5;
            $pts = [];
            for ($i = 0; $i < $nv; $i++) {
                $a    = (2 * M_PI * $i / $nv) - M_PI / 2;
                $pts[] = round($cx + $rd * cos($a), 1) . ',' . round($cy + $rd * sin($a), 1);
            }
            $sw = $lv === 5 ? 1 : 0.5;
            $h .= '<polygon points="' . implode(' ', $pts) . '" fill="none" stroke="#cbbfac" stroke-width="' . $sw . '" opacity="0.5"/>';
        }

        // Axes
        for ($i = 0; $i < $nv; $i++) {
            $a = (2 * M_PI * $i / $nv) - M_PI / 2;
            $h .= '<line x1="' . $cx . '" y1="' . $cy . '" x2="' . round($cx + $rv * cos($a), 1) . '" y2="' . round($cy + $rv * sin($a), 1) . '" stroke="#cbbfac" stroke-width="0.5" opacity="0.5"/>';
        }

        // Polygone des scores
        $scorePts = [];
        for ($i = 0; $i < $nv; $i++) {
            $a = (2 * M_PI * $i / $nv) - M_PI / 2;
            $v = ($scores[$i] / 15) * $rv;
            $scorePts[] = round($cx + $v * cos($a), 1) . ',' . round($cy + $v * sin($a), 1);
        }
        $h .= '<polygon points="' . implode(' ', $scorePts) . '" fill="#c9a052" fill-opacity="0.12" stroke="#c9a052" stroke-width="2"/>';

        // Points et labels
        for ($i = 0; $i < $nv; $i++) {
            $a   = (2 * M_PI * $i / $nv) - M_PI / 2;
            $v   = ($scores[$i] / 15) * $rv;
            $px  = round($cx + $v * cos($a), 1);
            $py  = round($cy + $v * sin($a), 1);
            $lx  = round($cx + ($rv + 21) * cos($a), 1);
            $ly  = round($cy + ($rv + 21) * sin($a), 1);
            $anc = $lx < $cx - 4 ? 'end' : ($lx > $cx + 4 ? 'start' : 'middle');
            $col = self::CADRE_COLORS[$i];
            $name = self::CADRE_NAMES[$i];

            $h .= '<circle cx="' . $px . '" cy="' . $py . '" r="4.5" fill="' . $col . '" stroke="white" stroke-width="1.5"/>';
            $h .= '<text x="' . $lx . '" y="' . round($ly + 4, 1) . '" text-anchor="' . $anc . '" font-size="9" font-family="Georgia,serif" fill="' . $col . '">' . $name . '</text>';
        }

        return '<svg viewBox="-40 -30 300 280" width="300" height="280" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">' . $h . '</svg>';
    }

    /* ── Synthèse fallback ── */

    public static function getSyntheseFallback(int $pct): string
    {
        if ($pct >= 70) return self::SYNTHESE_FALLBACK['high'];
        if ($pct >= 45) return self::SYNTHESE_FALLBACK['medium'];
        return self::SYNTHESE_FALLBACK['low'];
    }

    public static function getPointSaillantFallback(string $weakName, int $weakScore, string $strongName, int $strongScore): string
    {
        return $weakName . ' (' . $weakScore . '/15) est le levier prioritaire. En le renforçant, vous libérez aussi le potentiel de ' . $strongName . ' (' . $strongScore . '/15) qui est déjà bien activé.';
    }

    /* ── Master computation ── */

    public static function computeAll(array $csc, string $role, string $secteur, int $effectif): array
    {
        $S    = self::SECS[$secteur] ?? self::SECS['autre'];
        $sgp  = self::sgpCalc($csc);
        $ms   = round($effectif * $S['s'] * 1.45);
        $w    = self::dissipRate($sgp['sgpNorm']);
        $tex  = self::te($sgp['sgpNorm']);
        $mex  = self::me($sgp['sgpNorm']);
        $prod = round($ms * $w);
        $turn = round($effectif * $tex * $S['s'] * 0.85);
        $reun = round($ms * $mex);
        $pot  = $prod + $turn + $reun;
        $pp   = $effectif > 0 ? round($pot / $effectif) : 0;

        // ROI +1 point
        $sgpP1 = min(25, $sgp['sgpNorm'] + 1);
        $potP1 = self::potentiel($sgpP1, $ms, $effectif, $S['s']);
        $gain1 = $pot - $potP1;
        $ga    = $effectif > 0 ? round($gain1 * 12 / $effectif) : 0;
        $roiX  = $ga > 0 ? round($ga / 2000) : 0;

        // Classements
        $sorted = [];
        for ($i = 0; $i < 5; $i++) {
            $sorted[] = ['idx' => $i, 'id' => self::CADRE_IDS[$i], 'name' => self::CADRE_NAMES[$i], 'score' => $csc[$i], 'color' => self::CADRE_COLORS[$i]];
        }
        usort($sorted, fn($a, $b) => $a['score'] - $b['score']);
        $prios  = array_slice($sorted, 0, 2);
        $forces = array_slice(array_reverse($sorted), 0, 2);

        $niveau = self::niveauLabel($sgp['pct']);
        $ql     = self::sqLabel($sgp['pct']);
        $date   = (new \DateTime())->format('j') . ' ' . self::frenchMonth((int)(new \DateTime())->format('n')) . ' ' . (new \DateTime())->format('Y');

        // Build flat marker array
        $data = [
            'SGP'             => $sgp['sgpNorm'],
            'PCT'             => $sgp['pct'],
            'SIGMA'           => number_format($sgp['sigma'], 1, '.', ''),
            'DELTA'           => $sgp['delta'],
            'MEAN'            => number_format($sgp['mean'], 1, '.', ''),
            'SGP_RAW'         => number_format($sgp['sgpRaw'], 2, '.', ''),
            'POTENTIEL'       => self::fmt($pot),
            'POTENTIEL_PP'    => self::fmt($pp),
            'FOURCHETTE_BAS'  => self::fmt(round($pot * 0.70)),
            'FOURCHETTE_HAUT' => self::fmt(round($pot * 1.35)),
            'PROD'            => self::fmt($prod),
            'TURNOVER'        => self::fmt($turn),
            'REUNIONS'        => self::fmt($reun),
            'DISSIP_PCT'      => round($w * 100),
            'MASSE_SAL'       => self::fmt($ms),
            'GAIN_UN_PT'      => self::fmt($ga),
            'ROI_X'           => $roiX,
            'HORIZON'         => self::fmt(round($pot * 0.50)) . ' à ' . self::fmt(round($pot * 0.72)),
            'ROLE'            => $role ?: '—',
            'SECTEUR_LABEL'   => $S['l'],
            'EFFECTIF'        => $effectif . ' collaborateurs',
            'EFFECTIF_NUM'    => $effectif,
            'DATE'            => $date,
            'NIVEAU_LABEL'    => $niveau['label'],
            'NIVEAU_DESC'     => $niveau['desc'],
            'QUAL_LABEL'      => $ql['t'],
            'QUAL_COLOR'      => $ql['c'],
            'RADAR_SVG'       => self::generateRadarSvg($csc),
            'RADAR_SVG_MINI'  => self::generateRadarSvg($csc, 80, 80, 55),
        ];

        // Per-cadre markers
        for ($i = 0; $i < 5; $i++) {
            $s    = $csc[$i];
            $pctC = round(($s - 3) / 12 * 100);
            $col  = self::cadreColor($s);
            $data['CADRE_' . $i . '_NOM']       = self::CADRE_NAMES[$i];
            $data['CADRE_' . $i . '_SCORE']     = $s;
            $data['CADRE_' . $i . '_PCT']       = $pctC;
            $data['CADRE_' . $i . '_COLOR']     = self::CADRE_COLORS[$i];
            $data['CADRE_' . $i . '_BADGE']     = $col;
            $data['CADRE_' . $i . '_BAR_WIDTH'] = round(($s / 15) * 100) . '%';
            $data['CADRE_' . $i . '_DESC']      = self::CADRE_DESCS[$i];
            $data['CADRE_' . $i . '_INTERP']    = $pctC < 50 ? self::CADRE_LOW[$i] : self::CADRE_HIGH[$i];
        }

        // Forces & priorités
        for ($j = 0; $j < 2; $j++) {
            $f = $forces[$j];
            $p = $prios[$j];
            $n = $j + 1;
            $data['FORCE_' . $n . '_NOM']    = $f['name'];
            $data['FORCE_' . $n . '_SCORE']  = $f['score'];
            $data['FORCE_' . $n . '_PCT']    = round(($f['score'] - 3) / 12 * 100);
            $data['FORCE_' . $n . '_TEXTE']  = self::FORCE_TEXTS[$f['id']];
            $data['FORCE_' . $n . '_COLOR']  = $f['color'];
            $data['PRIO_' . $n . '_NOM']     = $p['name'];
            $data['PRIO_' . $n . '_SCORE']   = $p['score'];
            $data['PRIO_' . $n . '_PCT']     = round(($p['score'] - 3) / 12 * 100);
            $data['PRIO_' . $n . '_ACTION']  = self::PRIO_TEXTS[$p['id']];
            $data['PRIO_' . $n . '_COLOR']   = $p['color'];
        }
        $data['PRIO_MAINTIEN'] = implode(', ', array_map(fn($x) => $x['name'], array_slice($sorted, 2)));

        // Fallback AI texts
        $data['SYNTHESE']       = self::getSyntheseFallback($sgp['pct']);
        $data['POINT_SAILLANT'] = self::getPointSaillantFallback($prios[0]['name'], $prios[0]['score'], $forces[0]['name'], $forces[0]['score']);
        for ($i = 0; $i < 5; $i++) {
            $data['CADRE_' . $i . '_INSIGHT'] = $csc[$i] < 10 ? self::CADRE_LOW[$i] : self::CADRE_HIGH[$i];
        }

        // Calcul details for Sources page
        $cscStr = '';
        for ($i = 0; $i < 5; $i++) {
            $cscStr .= substr(self::CADRE_NAMES[$i], 0, 3) . '.=' . $csc[$i];
            if ($i < 4) $cscStr .= ', ';
        }
        $data['CSC_STR']      = $cscStr;
        $data['CSC_SUM']      = implode('+', $csc);
        $data['SAL_REF']      = number_format($S['s'], 0, ',', ' ');
        $data['SAL_REF_K']    = round($S['s'] / 1000);
        $data['TURNOVER_PCT'] = round($tex * 100);
        $data['REUNIONS_PCT'] = round($mex * 100);

        return $data;
    }

    private static function frenchMonth(int $m): string
    {
        return ['', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
                'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'][$m];
    }
}
