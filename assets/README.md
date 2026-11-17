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

## Weboptimerede navigationsikoner
`icon-home.png`, `icon-search.png`, `icon-heart.png` og `icon-video-active.png` er gengivet direkte fra de eksisterende SVG-eksporter ved 3× opløsning. HTML bruger nu disse filer i de samme CSS-mål. De oprindelige SVG-filer er bevaret som kilder.

## Introfacade
`dukkehus-facade.svg` er en ny, kodebygget facade til den bestilte åbneanimation; den er ikke et Figma-asset. To CSS-halvdele bruger samme facade med udvendige hængselpunkter. Den originale rumillustration og køkkenlinket bevares.

## Badeværelse
`badevaerelse.png` genbruger originalt badeværelsesrum fra ny PDF, side 1, rektangel (25, 354)–(191, 456), gengivet ved 6× opløsning fra PDF-vektorerne. Ingen nye møbler eller erstatningsillustration er tilføjet.

## Højere badeværelsesillustration
`badevaerelse-hoej.png` (1240 × 1269) er en AI-redigeret variant af `badevaerelse.png`, lavet med det indbyggede imagegen-værktøj efter brugerens accept af at flytte møblerne. Originalen er bevaret. Redigeringsprompt: Omkomponér det eksisterende badeværelse til et næsten kvadratisk, højere rum. Bevar møblernes naturlige proportioner, oprindelige genstande, farver og kraftige konturer; fordel badekar, håndvask, spejl, skab, håndklæde og plante med mere væg- og gulvplads. Bevar teksten BADEVÆRELSE. Ingen ekstra møbler eller letterboxing.

`badevaerelse-hoej-v2.png`: imagegen-redigering af den høje variant. Prompt: Flyt kun det pink håndklæde med sort holder og blå detaljer ned over badekarret; bevar størrelse, øvrige møbler, farver og rum. Tidligere version er bevaret.

## Stue
`stue-original.png`: oprindelig stue udtrukket fra ny PDF side 1, (199, 354)–(365, 456), ved 6× opløsning. `stue-hoej.png` (1240 × 1268) er en imagegen-redigering til en højere rumkomposition. Prompt: Bevar original sofa, puder, bord, lampe, vindue og plante med naturlige proportioner og tykke konturer. Fordel dem i et højere rum med naturlig gulvplacering; behold STUE og original palette. Ingen nye møbler, strækning eller letterboxing.

## Illustrationer uden overskrift
`stue-uden-tekst.png` og `badevaerelse-uden-tekst.png` er imagegen-redigeringer af de seneste godkendte varianter. Prompt: Fjern kun STUE/BADEVÆRELSE i billedets top og genskab samme baggrund. Bevar møbler, størrelse og positioner. Sidernes HTML-overskrifter bevares. Tidligere billeder er bevaret.

## Soveværelse
`sovevaerelse-original.png`: originalt rum fra ny PDF side 1, (25, 246)–(191, 348), 6× opløsning. `sovevaerelse-hoej.png` (1244 × 1265) er redigeret med imagegen. Prompt: Komponér det samme soveværelse naturligt i et højere rum uden tekst. Bevar seng, puder, pink tæppe, natbord med lampe, vindue, plante og billede i naturlige proportioner. Ingen ekstra møbler, strækning eller letterboxing.

## Altan
`altan-original.png`: originalt rum fra ny PDF side 1, (199, 246)–(365, 348), 6× opløsning. `altan-hoej.png` (1254 × 1254) er en imagegen-redigering. Prompt: Bevar samme stol, bord, kop, planter og rækværk i naturlige proportioner; fordel dem i en højere scene med mere himmel og gulv. Ingen tekst, nye genstande, strækning eller letterboxing.

## Værksted
`vaerksted-original.png`: originalt rum fra ny PDF side 1, (25, 570)–(191, 672), 6× opløsning. `vaerksted-hoej.png` (1254 × 1254) er en imagegen-redigering. Prompt: Bevar arbejdsbord, værktøjstavle, værktøj, vindue og to kasser. Fordel dem naturligt i et højere rum uden tekst, strækning, nye genstande eller letterboxing.

## Kontor
`kontor-original.png`: originalt rum fra ny PDF side 1, (199, 570)–(365, 672), 6× opløsning. `kontor-hoej.png` (1244 × 1265) er en imagegen-redigering. Prompt: Bevar skrivebord, laptop, kop, stol, billeder, vindue, plante og blå opbevaring. Fordel dem naturligt i et højere rum uden tekst, strækning eller nye genstande.

## Genoprettet vaskerum
`vaskerum-original.png`: ny PDF side 1, (199, 462)–(365, 564), 6× opløsning. `vaskerum-hoej.png` (1254 × 1254) er en imagegen-redigering. Prompt: Fordel samme vaskemaskine, kurv, tøj, vindue og beholdere naturligt i et højere rum uden tekst, strækning eller nye genstande.
