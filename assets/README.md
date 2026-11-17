# Originale assets

Kilde: `Voksen Crap (Copy).pdf`, leveret af brugeren, side 1 (390 × 844 pt).
PDF'en er en eksport af Figma-forsiden `HJEM / dukkehus` (node 12:11).

- `dukkehus.svg`: original vektorgrafik, udtrukket fra rektanglet (8, 148)–(382, 702). SVG-viewBox: 374 × 554. Indeholder alle otte rum og deres originale labels. Det er kun illustrationen, ikke hele skærmen.
- `icon-home.svg`, `icon-search.svg`, `icon-heart.svg`: navigationens originale symboler fra samme PDF.

Ingen illustrationer er nytegnet. SVG-filerne bruger eksportens originale stier og clips og kræver ingen eksterne fonte eller netværksadgang.
Køkkenets hitområde er defineret ud fra PDF-koordinaterne (25, 463)–(191, 565) og skalerer relativt til SVG'en.

HTML-tekst bruger Arial/Helvetica som dokumenteret fallback. PDF'ens fonte er Type 3 uden genbrugelig fontfamilie; logo og brødtekst er derfor ikke garanteret et præcist typografisk match.

## Browserkompatibel illustration
`dukkehus.png` er en direkte gengivelse af PDF-illustrationen i 3× opløsning (1122 × 1662 px), fra samme rektangel som SVG-filen. Brug PNG i HTML: SVG-eksportens PDF-masker skjuler tag og rum i browseren. PNG bevarer alle originale detaljer uden nye illustrationer. SVG beholdes som kildeeksport.

## Køkken
`koekken.png`: originalillustrationen inklusive pink ramme fra side 2 i den samme PDF, rektangel (12, 199)–(371, 563). Eksporteret ved 3× opløsning (1077 × 1092 px). HTML viser den med referenceformat 359 × 364 px.
Ovnens hotspot følger PDF-rektanglet (144, 405)–(235, 511), omregnet til procenter af illustrationen. `data-hack="rengoer-ovnen"` er identifikatoren til senere tilkobling af den faktiske hacksiderute; der er endnu ikke oprettet en URL til en ikke-eksisterende side.

## Opdateret forside (ny PDF)
`dukkehus.png` er nu eksporteret fra side 1 i `Voksen Crap (Copy) (1).pdf`, samme rektangel (8, 148)–(382, 702) og 3× opløsning. Den indeholder den nye opvasker i køkkenrummet. Det eksisterende hotspot passer fortsat til rummets uændrede grænser.
`icon-video.png` er det originale VIDEO-symbol fra samme side, rektangel (332, 784)–(356, 807), i 3× opløsning. De tre eksisterende symboler genbruges; deres form er uændret. Den gamle `dukkehus.svg` er ikke den aktuelle præsentationsfil.

## Opdateret køkken (ny PDF)
`koekken.png` er nu eksporteret fra side 2 i `Voksen Crap (Copy) (1).pdf`, rektangel (12, 199)–(371, 563), ved 3× opløsning. Den nye originalillustration indeholder opvaskeren under vasken. Ovnens position er uændret, så dens eksisterende hotspot bevares. Ingen hack-detaljeside er oprettet.

## Opvasker-hotspot
Opvaskemaskinen er PDF-side 2, (41, 408)–(85, 509). Det nye HTML-link er placeret relativt til køkkenillustrationens (12, 199)–(371, 563). Hotspottet overlapper ikke ovnen og fører til `opvasker.html`.

`icon-home-inactive.png`: originalt mørkt husikon fra ny PDF side 2, (42, 784)–(62, 805), 3× opløsning. Bruges på køkken- og opvaskersiden uden CSS-filter, så ikonets hvide baggrund bevares.

`icon-search-active.png`: aktivt blåt søgeikon fra ny PDF, side 4, rektangel (140, 784)–(160, 805), 3× opløsning. Bruges på søgesiden uden CSS-filter.

`icon-heart-active.png`: aktivt blåt hjerte fra ny PDF, side 5, (235, 784)–(259, 805), 3× opløsning. Bruges på GEMTE HACKS uden CSS-filter.

`icon-video-active.svg`: samme VIDEO-symbol fra ny PDF, side 1, (332, 784)–(356, 807), farvet blåt til den aktive VIDEO-side efter brugerens bestilling. Hvid baggrund bevares uden CSS-filter.
