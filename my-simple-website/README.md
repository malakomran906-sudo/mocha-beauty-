# My Simple Website

Einföld kynningarsíða búin til með HTML, CSS og JavaScript. Þetta dæmi er ætlað til að sýna hvernig hægt er að búa til lítinn, aðgengilegan og móttækilegan vef.

## Uppsetning

1. Opnaðu möppuna `my-simple-website/src` í vafra (opna `index.html`). Engin sértæk uppsetning er nauðsynleg — þetta er statísk síða.

2. Ef þú vilt keyra fljóta staðbundna vefþjónustu í skel (til að forðast CORS ef þú bætir utanaðkomandi síðum síðar):

```bash
# með Python 3
python3 -m http.server 8000
# opna http://localhost:8000 í vafra
```

## Skrár

- `src/index.html` — Aðal HTML skjölið (íslenskt dæmi: haus, kynning, þjónusta og tengiliðaform).
- `src/css/styles.css` — Stílar og móttækni.
- `src/js/main.js` — Einföld JavaScript-samskipti: form-staðfesting og nav-toggle fyrir farsíma.

## Hvernig á að breyta

- Til að breyta texta: opna `src/index.html` og breyta innihaldinu.
- Til að breyta útliti: opna `src/css/styles.css`.
- Til að breyta virkni (t.d. senda form á bakenda): opna `src/js/main.js`.

## Næstu skref (valfrjálst)

- Bæta við raunverulegri bakenda-endapunktu fyrir form (t.d. með fetch til þíns API).
- Bæta myndum eða sérleturgerð (fonts) í `src/fonts`.

Ef þú vilt að ég setji þetta upp á GitHub Pages eða útbýti fleiri síðum, segðu mér hvað þú vilt og ég framkvæmi það.