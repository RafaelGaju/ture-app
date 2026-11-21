# Ture — cronometru de joc (PWA)

Aplicație web instalabilă pentru schimbarea turelor la 1–6 jucători, cu timer configurabil,
semnal discret la 15 secunde rămase, alarmă la 00:00 și zaruri 3D animate (1–6, opțional din Setări).
Instalată pe telefon rulează în fullscreen și ține ecranul aprins. Funcționează offline după prima deschidere.

**Live:** https://rafaelgaju.github.io/ture-app/

## Instalare pe Android
1. Deschide adresa de mai sus în Chrome.
2. Meniul ⋮ → «Instalează aplicația».

## Actualizare
Modifică fișierele, crește `CACHE_VERSION` în `sw.js` și fă push pe `main` — GitHub Pages republică automat.

## Credite
Sunetele zarurilor (`sounds/`) provin din pachetul [@3d-dice/dice-box-threejs](https://www.npmjs.com/package/@3d-dice/dice-box-threejs), licență MIT — vezi `sounds/LICENSE-dice-box-threejs.txt`.
