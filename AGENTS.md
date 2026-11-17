# VOKSEN CRAP! — design- og udviklingsguide

## 1. Formål, prioritet og scope
Læs altid hele denne fil, før kode ændres. VOKSEN CRAP! er en mobilorienteret hjemmeside, som hjælper unge voksne med praktiske voksenproblemer gennem et humoristisk, farverigt dukkehusunivers. Bevar designidentiteten; implementering er ikke en invitation til redesign.

Den konkrete brugeropgave har forrang. Implementér kun den bestilte side. Ændr kun andre sider, når det er nødvendigt for bestilt fælles navigation eller funktionalitet. Større designmæssige eller tekniske ændringer kræver brugerens accept. Afslut hver bestilt side og afvent godkendelse før den næste.

## 2. Gældende reference og dokumentationsstatus
**Nyeste og primære visuelle reference:** `../Voksen Crap (Copy) (1).pdf`, gennemgået 16. november 2026. Den har seks sider: HJEM, KØKKEN, HOW TO OPVASKER, SØG, GEMTE HACKS og VIDEO. Side 3 er 390 × 1232 pt; de øvrige er 390 × 844 pt. Disse er PDF-mål, ikke et krav om faste browserhøjder.

Figma: https://www.figma.com/design/6f9MEzdLKKRNol4lBNFPtW/Voksen-Crap--Copy-?node-id=0-1

Den nye PDF har forrang ved designkonflikter. `../Voksen Crap (Copy).pdf` er den gamle eksport og må kun bruges som historisk kilde. Eksisterende assets er udtrukket fra den gamle eksport og skal sammenlignes med den nye før genbrug. Opfind ikke skjulte Figma-sider, officielle tokens eller manglende indhold.

Værdier markeret **PDF-verificeret** er aflæst fra PDF'ens geometri, tekststørrelser eller RGB-fyld, afrundet til HEX. De er ikke officielle Figma-tokens. Eksakte fonte, fontvægte, CSS-linjehøjder og komponentradier er ikke verificeret. Estimater skal fortsat markeres som estimater.

## 3. Faktisk projektstruktur og implementeringsstatus
- `index.html`: eksisterende forside med dukkehus og link til `koekken.html`. Den følger nu den nye PDF med `VÆLG ET RUM ↓`, opdateret husillustration og fire navigationspunkter. SØG linker til `soeg.html`; GEMT linker til `gemte.html`; VIDEO linker til `video.html`.
- `koekken.html`: eksisterende køkkenside; tilbage-link og HJEM fører til `index.html`. Siden følger nu den nye PDF med opvasker i originalillustrationen, ↑ i handlingsboksen og fire navigationspunkter. Ovnens hotspot viser en midlertidig dialog.
- `css/style.css`: fælles designsystem, navigation og sidestyles; mobile-first, 390 px komposition, maksimalt 440 px fra 600 px viewportbredde.
- `js/kitchen.js`: dialog for `data-hack="rengoer-ovnen"`; ovnrengøringssiden findes ikke. Opvaskerguiden er en separat side med almindelig HTML-navigation.
- `js/home.js`: kommentarfil, ikke indlæst; forsidens navigation kræver ikke JavaScript.
- `assets/dukkehus.png`: opdateret fra ny PDF, side 1, i 3× opløsning. `assets/koekken.png` er opdateret fra ny PDF, side 2, i 3× opløsning.
- `assets/dukkehus.svg`: kildeeksport med maskefejl i browseren. Brug ikke denne fil som præsentationsasset uden verificeret rettelse.
- `assets/icon-home.svg`, `assets/icon-search.svg`, `assets/icon-heart.svg`: eksisterende navigationssymboler. `assets/icon-video.png` er udtrukket fra den nye PDF.
- `assets/README.md`: historisk eksportkilde og hotspot-koordinater.
- Projektets øvrige PNG er et separat collagelogo, ikke forsidens logoudgave. `Life Hack.pdf` er ikke den nye Figma-reference.

`opvasker.html` er implementeret med 10 trin, dekorativ videoplads og fælles navigation. Køkkenets opvasker-link fører dertil; tilbage-linket fører til `koekken.html`. `soeg.html` er implementeret med fem PDF-kort, dynamisk filtrering i `js/search.js` og SØG-links fra alle eksisterende sider. `gemte.html` er implementeret med fire adskilte eksempelkort, GEMT-navigation og lokal favoritlagring. `video.html` er implementeret med to dekorative videopladsfelter og VIDEO-links fra alle seks sider. Ingen rigtige videoer er leveret. Denne guide beskriver deres ønskede design, ikke færdig funktionalitet. Guideopdateringen giver ikke tilladelse til at ændre hjemmesiden.

## 4. Designidentitet og eksisterende variabler
Lys creme, kongeblå topstreg, pink accenter, limefelter, store mørke fede overskrifter, hvide afrundede kort og illustrationer med kraftige konturer. Udtrykket er legende og retropræget. Ingen stockfotos, gradienter, glaseffekter eller nye dekorative skygger. Det nye design prioriterer større typografi, mere luft og tydeligere komponenter; mål den enkelte komponent frem for at skalere alt vilkårligt.

### Farver — PDF-verificerede, ikke officielle tokens
| Rolle | Ny PDF | Eksisterende CSS og anvendelse |
| --- | --- | --- |
| Forsidebaggrund | `#F6E9D7` | `--color-background` i roden |
| Køkken, guide, søg og gemte | `#FFF6E9` | Køkkenets eksisterende override af `--color-background` |
| Videosidebaggrund | `#FFF8F2` | Fremtidig sideoverride af samme variabel |
| Mørk forsidetekst | `#252321` | `--color-text` |
| Mørk tekst på øvrige guidesider | `#242222` | Lille PDF-variation; vurder konkret ved implementering |
| Blå topstreg på HJEM | `#3156DC` | `--color-primary` |
| Blå på øvrige sider | `#3155DD` | Lille PDF-variation; opret ikke et konkurrerende primærfarvesæt |
| Pink hus/køkken | `#F75C8D` | `--color-accent` |
| Pink guide/gemte-overskrift | `#F25386` | Bevar forskellen fra illustrationspink ved senere styling |
| Lime i køkkenboks | `#D4F264` | Eksisterende `--color-lime` |
| Hvide kort/navigation | `#FFFFFF` | `--color-navigation`; genbrug relevant semantisk rolle |
| Guidevideo-placeholder | `#D9D9D9` | Fremtidig videovariant |
| Lilla videofelt | `#D6B4EB` | Fremtidig videovariant |
| Mintgrønt videofelt | `#A3E2CA` | Fremtidig videovariant |
| Videosidens overskrift | `#302B34` | Sidespecifik tekstfarve |

Genbrug de eksisterende custom properties i `css/style.css`. Nye roller må tilføjes dér ved relevant implementering, men ikke som et parallelt designsystem. Bevar `--page-width`, `--navigation-height`, `--safe-bottom` og `--font-family`. Kontrollér kontrast; PDF-farver er ikke i sig selv en garanti for WCAG-overholdelse.

### Typografi og mål
PDF-fontene er Type 3 uden identificeret genbrugelig fontfamilie. Arial/Helvetica er eksisterende dokumenteret fallback, ikke et verificeret fontmatch. Bevar kraftige overskrifter og versaler, hvor de vises. Brug almindelig sætningsform i hjælpetekst og guides.

PDF-verificerede tekststørrelser: logo 28 pt; forsideundertitel 11; instruktion 17; køkkenoverskrift 39; introduktion 14; køkkenboks 16/12; HOW TO 37; OPVASKER! 48; SÅDAN GØR DU 22; trin 14 og numre 13; SØG 43; GEMTE/HACKS 40; videosidetitel 27; videokorttitler 20 og undertitler 12. Oversæt til CSS ud fra 390 px-reference og kontrollér visuelt. Påstå ikke verificerede vægte eller linjehøjder.

Typiske vandrette margener er PDF-verificeret 20–22 pt; video bruger 18 pt kortmargen og 16 pt indre afstand. Kortafrunding er **estimeret** cirka 12–18 px afhængigt af komponenten; mål originalkurverne før pixelpræcis levering. Søge- og gemtekort er hvide uden de gamle kraftige mørke rammer. Illustrationernes mørke konturer bevares.

Topstreger varierer i PDF'en: HJEM/VIDEO 12 pt, KØKKEN 7 pt, guide/SØG/GEMTE 13 pt samlet synlig højde. Bevar den konkrete reference; indfør ikke en ny vilkårlig tykkelse på alle sider.

## 5. De seks sider
### 5.1 HJEM — dukkehuset
Logo `VOKSEN CRAP!` med mørk VOKSEN og pink CRAP!, undertekst `ET HUS FULDT AF VOKSENPROBLEMER` og ny instruktion **`VÆLG ET RUM ↓`**. Den erstatter `TRYK PÅ KØKKENET ↓`.

Det store dukkehus er det centrale asset. Bevar pink tag, mørke konturer og alle otte rum i rækkefølgen soveværelse/altan, badeværelse/stue, køkken/vaskerum, værksted/kontor. Køkkenet er fremhævet med blå ramme og åbner køkkensiden. Tilføj ikke undersider til øvrige rum uden bestilling.

Brug original illustration med proportionale HTML-links eller tilgængelige SVG-links over præcise rumområder. Links skal have beskrivende navne, synligt fokus og følge illustrationen ved skalering. Ingen klikbare div-elementer. Bevar billedets udseende, og gør kun reelt tilgængelige rum interaktive.

### 5.2 KØKKEN — zoom
Rækkefølge: `← TIL HUSET`, `KØKKENET`, `Tryk på det, du vil have hjælp til.`, original køkkenillustration med pink ramme, limeboks og fælles navigation.

Limeboksen viser `HVAD SKAL VI HJÆLPE MED?` og **`Vælg en ting i køkkenet ↑`**. Pil op erstatter den implementerede plus-tekst.

PDF-verificeret illustration: x=12, y=199, 359 × 364 pt. Limeboks: x=22, y=592, 346 × 77 pt. **Den nye illustration indeholder også en opvasker under vasken til venstre for ovnen.** Det gamle køkkenasset viser skab her og skal ikke antages at matche.

Genstande kan blive proportionale hotspots med links til faktiske guides. Navne, fokusrækkefølge og trykflader skal være forståelige. Brug den nye illustrations koordinater ved nye hotspots; gamle ovnkoordinater må ikke ukritisk genbruges. Ovn og opvasker er forskellige genstande og hacks. En midlertidig knap/dialog må ikke omtales som en færdig navigationsrute.

### 5.3 HOW TO OPVASKER — aktuel hack-detaljereference
Den aktuelle guide er ikke længere ovnrengøring. Rækkefølge: `← TIL KØKKENET`, sort `HOW TO`, pink `OPVASKER!`, `Sæt din opvasker op til at bruge den første gang`, gråt videofelt med afspilningssymbol og `Indsæt video her`, derefter `SÅDAN GØR DU` og 10 trin.

**Præcis trintekst fra den nye PDF** (visuelle linjeskift er samlet, ordlyden er bevaret):
1. Skru proppen af i bunden af din opvasker
2. Påfør salt ned i hullet
3. Sæt proppen på igen
4. I lågen på din opvasker er der en lille låge
5. Tag din afspænding og påfør i hullet op til pilen
6. Luk lågen igen
7. Åben nu lågen ved siden af
8. Indsæt her din opvaskertabs
9. Luk lågen igen
10. Din opvasker er nu klar til at køre første gang

Implementér senere som én `ol` med præcis 10 `li`. Numrene vises 01–10, med lime på ulige trin og pink på lige. Hvert trin har et hvidt afrundet kort. Nummerfeltet supplerer listens semantik; farve må ikke alene forklare rækkefølge. Bevar tekstombrydning uden faste højder, som klipper tekst ved zoom.

PDF-verificeret: videofelt x=18, y=240, 348 × 220 pt; trinkort cirka 350 × 53 pt med cirka 9 pt mellemrum. Listen begynder y=507 og slutter y=1118. Sidens højde 1232 pt indebærer scrolling på almindelige telefoner; pres ikke guiden ind i 844 px.

Videofeltet er en placeholder uden kilde. Ingen opdigtet URL, autoplay eller afspilningshandling. Bevar pladsen, så en rigtig video senere kan indsættes uden layoutændring.

### 5.4 SØG — oversigt over hacks
`SØG`, `Find hjælp til dit voksenproblem.`, hvidt afrundet søgefelt med `Søg efter et hack`, `UDFORSK HACKS` og fem større hvide kort med blå kategoritekst og blå højrepil:

| Kategori | Titel |
| --- | --- |
| Køkken | Rengør ovnen |
| Badeværelse | Fjern kalk fra bruseren |
| Vaskerum | Sådan vasker du tøj |
| Økonomi | Lav dit første budget |
| Værksted | Hæng en hylde op |

PDF-verificeret søgefelt: x=20, y=146, 350 × 48 pt. Kortenes synlige hvide flader: x=21, bredde 348, højde 75 pt; y=236, 323, 410, 497 og 584. Genbrug kortstruktur med kategori, titel og dekorativ pil. Ét beskrivende link pr. kort, når destinationen findes. Søgeformular skal have rigtig label; placeholder alene er utilstrækkelig. Filtreringen er nu implementeret på de fem HTML-korts kategori og titel med Vanilla JavaScript. Den ignorerer store/små bogstaver, understøtter danske bogstaver og Unicode-normalisering, viser alle ved tomt felt og en tydelig besked ved nul resultater. Status annonceres via en live-region. Alle fem detaljer mangler; kortene er derfor knapper, som viser en statusdialog, indtil faktiske destinationssider findes. Erstat dem med links, når relevante sider er implementeret.

**Rengør ovnen er fortsat et separat søgeresultat. Det er ikke et alternativt navn på HOW TO OPVASKER, og de må ikke automatisk få samme destination.**

### 5.5 GEMTE HACKS — eksempelindhold
Sort `GEMTE`, pink `HACKS ♡`, `Dine bedste voksen-tricks samlet.`, blå `GEMTE EKSEMPLER` og fire hvide afrundede kort:

| Kategori | Titel |
| --- | --- |
| Køkken | Rengør ovnen |
| Badeværelse | Fjern kalk fra bruseren |
| Vaskerum | Vask dit tøj rigtigt |
| Økonomi | Hold styr på budgettet |

Kort har samme mål og y-start som søgekort, men kun fire kort. Kategorierne er **pink i PDF'en**, hvor søgesidens er blå. Bevar dette som komponentvariant. De fire kort er eksempelindhold og gemmes aldrig automatisk som favoritter. `js/favorites.js` eksponerer `window.VoksenFavorites` med `add(id)`, `remove(id)`, `list()` og `persistent`. Lagringsnøgle: `voksen-crap:favorites:v1`. Ugyldige data og ukendte ID’er håndteres, dubletter fjernes og blokeret lagring bruger sessionshukommelse. `js/saved.js` viser personlige favoritter i en separat sektion, kun når de findes, og bevarer altid eksemplerne. Ingen nye synlige gemme-/fjernknapper er tilføjet; placering skal godkendes før UI-integration. Opvasker har sit eget ID og link, og ovnrengøring må ikke pege dertil.

En senere Vanilla JavaScript-funktion kan gemme en liste af stabile hack-ID'er i `localStorage` og genbruge kortene fra et fælles dataformat. Implementér kun ved bestilling, håndtér ugyldige data og utilgængelig lagring, og beskriv tom tilstand særskilt. Det kræver ikke backend, konto eller synkronisering. En gemmeknap skal være `button` med beskrivende navn og `aria-pressed`.

### 5.6 VIDEO — VoksenCrap på film
`VoksenCrap på film` og `Reklame og fraklip samlet ét sted`. To hvide afrundede kort:

1. `Reklame for appen` / `Din præsentations- eller reklamevideo`; lilla videofelt med afspilningssymbol og `Indsæt video her`.
2. `Fraklip` / `Bag kulisserne og de sjove øjeblikke`; mintgrønt videofelt med samme symbol og placeholdertekst.

PDF-verificeret: kort x=18, bredde 354, højde 314 pt, y=121 og 453. Indre videofelter x=34, bredde 322, højde 200 pt, y=199 og 531. Kortafstand 18 pt. Brug en fælles videokortkomponent med titel, beskrivelse og videofeltvariant.

Ingen videoer, URL'er eller afspilningsfunktion er leveret. Placeholderens symbol er dekorativt, ikke en falsk fungerende afspilningsknap. Ved senere levering af en video anvendes eksempelvis `video controls` med passende undertekster og tilgængeligt navn; fasthold feltets proportioner. Vælg ikke en ekstern videotjeneste uden aftale.

## 6. Fælles komponenter og navigation
Det **nye design har fire punkter på alle seks sider**, i rækkefølgen:
1. HJEM — husikon.
2. SØG — søgeikon.
3. GEMT — hjerteikon.
4. VIDEO — afspilningsikon.

Navigationen har hvid baggrund, ikon over label og fire jævnt fordelte felter. PDF-verificeret højde er 68 pt, placeret y=776 på 844 pt-sider og y=1164 på guidesiden. PDF'en viser blå aktiv HJEM, SØG og GEMT på de respektive sider. Køkken og guide har ingen aktiv topdestination; VIDEO fremstår mørk i PDF'en. Videosiden bruger efter brugerens udtrykkelige bestilling blå aktiv VIDEO-markering og `aria-current="page"`.

Brug navngivet `nav`, rigtige links til faktiske destinationer og `aria-current="page"` på den aktuelle side. Genbrug `.bottom-nav` og `.bottom-nav__item`; tilpas den fælles komponent ved en bestilt navigationstilpasning, ikke ved denne dokumentationsopgave. Opret ikke falske links med `href="#"`, 404-destinationer eller opdigtede sidestier. Dokumentér utilgængelige destinationer som midlertidig implementeringsstatus. Forsiden bruger `.bottom-nav--four` med fire punkter. Køkkensiden genbruger også `.bottom-nav--four` med fire punkter.

Andre fælles komponenter: sidehoved/tilbagelink, illustreret hotspotområde, hack-kort med farvevariant, kategorilabel, søgefelt, `ol`-trinliste, lime-informationsboks og genanvendeligt videofelt/videokort. Komponentgenbrug kræver ikke et framework. Opret kun de komponenter, den bestilte opgave behøver.

## 7. Originale assets
Undersøg eksisterende assets og den nyeste PDF før eksport. Bevar illustrationernes farver, konturer, komposition og proportioner. Ingen emojis, stockfotos, standardikoner eller generiske nytegninger som erstatning for huset eller køkkenet.

Hvis et originalt asset ikke kan findes eller udtrækkes, informér brugeren før genskabelse. Brug ikke screenshots af hele skærme som implementering. Direkte udtræk af original illustration fra PDF er tilladt. SVG kræver browserkontrol af masker og clips; brug en højopløst original PNG-eksport, når SVG gengives forkert. Gem lokalt, dokumentér kildefil, side og koordinater, og undgå midlertidige Figma-URL'er i kode. Gamle asset-koordinater gælder kun deres konkrete eksport.

## 8. Teknik, semantik og vedligeholdelse
Kun HTML5, CSS3 og Vanilla JavaScript som udgangspunkt. Ingen React, Vue, Tailwind, Bootstrap, jQuery eller andre frameworks uden udtrykkelig godkendelse. Ingen PHP uden brugerens godkendelse; PhpStorm kræver ikke PHP. Tilføj ikke unødvendige dependencies eller buildsystem.

Undersøg filstruktur før ændringer, og genbrug eksisterende styles og komponenter. Hold HTML, CSS og JavaScript adskilt. Ingen inline CSS, inline JavaScript eller eventhandlers. Brug konsekvente beskrivende navne og små funktioner. Almindelige links kræver ikke JavaScript.

Brug dansk dokumentsprog, viewport, beskrivende titler, `header`, én `main`, navngivet `nav`, `section` til navngivne afsnit, `article` til selvstændige kort når relevant, `figure` til illustration/video og `footer` til faktisk sidefodsindhold. Undgå tomme semantiske beholdere og unødvendig ARIA. Én meningsfuld `h1` og logisk hierarki. Brug links til navigation, knapper til handlinger, `ol`/`li` til guide og `form`/`label`/søgeinput til søgning.

## 9. Tilgængelighed og responsivitet
WCAG 2.2 AA er målet, ikke en automatisk certificering af PDF'en.

- Tastaturbetjening, logisk fokusrækkefølge og tydelig fokusmarkering på alle interaktioner. Fokus må ikke skjules under fast navigation.
- Beskrivende alt-tekst til informative illustrationer; dekorative ikoner skjules for skærmlæsere, når teksten allerede beskriver dem.
- Hotspots får præcise navne og skalerer relativt til originalasset. Ingen interaktion alene via hover eller farve.
- Normal tekst mindst 4,5:1 kontrast; stor tekst mindst 3:1. Kontrollér også kontrolkonturer og fokus. Eventuelle nødvendige designafvigelser dokumenteres og afklares.
- Sigt efter 44 × 44 CSS-px trykflader; AA kræver mindst 24 × 24 px eller en relevant undtagelse.
- Korrekte formularlabels. Statiske bokse skal ikke automatisk have `role="alert"`. Rigtige videoer kræver relevant tekstalternativ/undertekster, når de leveres.
- Mobile-first. 390 px er referencebredde; bevar billedernes aspektforhold og centrér den smalle komposition på større skærme. Den eksisterende 440 px desktopgrænse er en projektbeslutning, ikke en PDF-token.
- Tillad naturlig scrolling, især den lange guide. Brug ikke fast sidehøjde eller overflow til at skjule indhold.
- Fast navigation tager højde for `env(safe-area-inset-bottom)`; indholdets bundafstand skal dække hele navigationshøjden.
- Kontrollér 320 px, 390 px, større telefoner, desktop og tekstzoom uden vandret scrolling, tekstklipning eller overlappende kontroller.
- Respektér `prefers-reduced-motion`, hvis bevægelse senere indføres; tilføj ikke dekorativ animation uden behov.

## 10. Ændringsoversigt og næste implementeringer
Denne revision erstatter den gamle femsiders beskrivelse og modstridende historiske tillæg:
- `VÆLG ET RUM ↓` erstatter den gamle forsideinstruktion.
- Fire menupunkter erstatter tre i mål-designet.
- HOW TO OPVASKER med video og 10 præcise trin erstatter ovnrengøring som aktuel guide-reference.
- Køkkenillustrationen indeholder nu en opvasker; handlingsboksen bruger ↑.
- Søge- og gemtekort er større hvide afrundede flader; farvevarianter og eksempeltekster er dokumenteret.
- Videosiden og genanvendelig placeholderkomponent er nye.
- Større typografi og mere luft skal følges i de konkrete komponentmål.

Afklaringer før relevante implementeringer: præcis fontfamilie og vægte; eksakte radier og CSS-linjehøjder; faktiske nye side-URL'er og guidekoblinger; VIDEO's visuelle aktive tilstand; videoindhold og undertekster; ønsket søgelogik og gemmeadfærd. Disse må ikke opfindes. De 10 trins ordlyd er verificeret, men skal ikke udlægges som en universel teknisk vejledning til alle opvaskermodeller.

## 11. Arbejdsproces for kommende agenter
1. Læs denne fil og brugerens scope før kodeændringer.
2. Undersøg faktisk kode og nyeste Figma-PDF; skeln mellem implementeret status og ønsket design.
3. Find originale assets, genbrug komponenter og verificér mål før nye valg.
4. Implementér kun den bestilte side; begræns nødvendige ændringer i fælles komponenter.
5. Opfind ikke indhold, funktioner, illustrationer, ruter eller officielle tokens.
6. Spørg før større design- eller teknikændringer, medmindre de allerede er udtrykkeligt bestilt.
7. Kontrollér semantik, tastatur, kontrast, responsivitet, navigation, safe areas og lokale assets.
8. Sammenlign visuelt med nyeste reference ved samme bredde, når browseradgang er mulig. Angiv ærligt begrænsninger; påstå ikke pixelpræcision eller fuld WCAG-overholdelse uden kontrol.
9. Bevar brugerens øvrige arbejde og originale kildefiler. Opret ikke en konkurrerende agentfil.
10. Aflever kort ændrede filer, gennemførte kontroller og mangler. Stop og afvent godkendelse før mere arbejde.

### Implementeret videokomponent
`video.html` genbruger `.video-placeholder` fra opvaskerguiden med varianterne `--purple` og `--mint` i `.video-card`. Opvaskerguidens styles er bevaret. Afspilningssymboler er dekorative. Når konkrete filer leveres, erstattes figure-indhold med navngivet `video controls playsinline`, rigtige source-filer og eventuelle danske `track kind="captions"`-filer. Ingen autoplay. Wrapperens aspektforhold og fælles styles bevares.
