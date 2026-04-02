# DPE · Entrelacs — Assets web

Marque : **L'Entrelacs** — cinq ellipses à 36° d'intervalle, point central.
Couleurs : Or `#c9a052` (sur fond sombre) · Or foncé `#8a6830` (sur fond clair)

---

## Fichiers

| Fichier | Usage |
|---|---|
| `mark.svg` | Marque seule, fond transparent — **à utiliser sur fond sombre** |
| `mark-inverse.svg` | Marque seule, fond transparent — **à utiliser sur fond clair** |
| `logo-dark.svg / .png` | Logo horizontal complet, fond #0d0b08 |
| `logo-light.svg / .png` | Logo horizontal complet, fond #f4efe6 |
| `favicon.svg` | Favicon SVG avec `prefers-color-scheme` (navigateurs modernes) |
| `favicon.ico` | Favicon ICO multi-taille 16+32+48 px (compatibilité universelle) |
| `favicon-16.png` | Favicon PNG 16×16 |
| `favicon-32.png` | Favicon PNG 32×32 |
| `apple-touch-icon.png` | Icône iOS/macOS 180×180 |
| `logo-512.png` | Marque 512×512 (PWA manifest, stores) |
| `og-image.png` | Image Open Graph 1200×630 (réseaux sociaux) |

---

## Intégration HTML

```html
<!-- Dans <head> -->
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">

<!-- Open Graph (réseaux sociaux) -->
<meta property="og:image" content="https://votre-domaine.fr/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- PWA manifest.json -->
<!--
{
  "icons": [
    { "src": "/assets/logo-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
-->
```

## Couleurs de référence

```css
:root {
  --dpe-gold:       #c9a052;  /* or principal — fond sombre */
  --dpe-gold-dark:  #8a6830;  /* or foncé — fond clair */
  --dpe-bg-dark:    #0d0b08;  /* fond nuit */
  --dpe-bg-light:   #f4efe6;  /* fond parchemin */
  --dpe-border:     #2a2218;  /* bordure subtile */
}
```
