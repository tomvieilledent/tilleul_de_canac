# Le Tilleul de Canac

Site web de la chambre d'hôtes **Le Tilleul de Canac** — 270 chemin de Canac, 12850 Onet-le-Château.

**React + Vite**, déployé sur **GitHub Pages**. Le calendrier de disponibilités est
synchronisé automatiquement depuis l'agenda **Booking** (iCal). Les avis sont saisis
à la main (Booking n'a pas d'API d'avis).

Site en ligne : <https://tomvieilledent.github.io/tilleul_de_canac/>

## Structure

```
index.html                     Point d'entrée Vite
vite.config.js                 base = /tilleul_de_canac/
src/
  main.jsx, App.jsx, index.css
  components/                   Header, Hero, About, Room, Gallery, Reviews,
                               Surroundings, Booking, Contact, Footer, LindenLeaf, Photo
  hooks/useJson.js             Chargement des JSON de public/
  lib/site.js                  Textes, contacts, distances, URL Booking
  lib/calendar.js              Helpers de dates du calendrier
public/
  favicon.svg                  Logo — feuille de tilleul
  photos/                      tc1.jpg, tc2.jpg, …
  data/availability.json       Disponibilités (généré automatiquement)
  data/reviews.json            5 derniers avis (édité à la main)
scripts/fetch-ical.mjs         iCal Booking -> public/data/availability.json
.github/workflows/
  deploy.yml                   Build Vite + déploiement Pages (push sur main)
  sync-availability.yml        Sync des dispos toutes les 3 h
  reviews-reminder.yml         Rappel avis, chaque lundi matin
```

## Développement local

```bash
npm install
npm run dev        # http://localhost:5173/tilleul_de_canac/
npm run build      # génère dist/
npm run preview    # sert dist/
```

## Mise en ligne

Déjà configuré : **Settings → Pages → Source : GitHub Actions**. Chaque push sur
`main` déclenche `deploy.yml` (build Vite → publication de `dist/`).

## Photos

Déposer les images dans `public/photos/` : `tc1.jpg`, `tc2.jpg`, … (paysage,
ratio 4:3, ~1600 px, JPEG < 400 Ko). Le nombre affiché se règle via `PHOTO_COUNT`
dans `src/lib/site.js`. Tant qu'une photo est absente, le site affiche un bloc
« Photo à venir ».

## Calendrier des disponibilités

1. Extranet Booking : *Tarifs & Disponibilité → Synchroniser les calendriers →
   Exporter le calendrier*. Copier le lien `.ics`.
2. Repo → **Settings → Secrets and variables → Actions → New repository secret** :
   - Nom : `BOOKING_ICAL_URL`
   - Valeur : le lien `.ics`
3. Repo → **Actions → Sync disponibilités Booking → Run workflow** pour une première
   synchro. Ensuite, mise à jour automatique toutes les 3 h, suivie d'un redéploiement.

Sans ce secret, le calendrier affiche toutes les dates libres et le bouton
« Réserver sur Booking.com » reste fonctionnel.

### Format de `public/data/availability.json`

```json
{
  "updated": "2026-08-31T09:00:00.000Z",
  "source": "booking-ical",
  "bookingUrl": "https://www.booking.com/hotel/fr/chambre-d-39-hote-rodez.fr.html",
  "booked": [{ "start": "2026-09-10", "end": "2026-09-14" }]
}
```

`end` est **exclusif** (jour de départ). Le fichier peut aussi être édité à la main.

## Avis des voyageurs

Saisie manuelle dans `public/data/reviews.json` (5 plus récents, le plus récent en
premier). Chaque **lundi matin**, `reviews-reminder.yml` ouvre une *issue* de rappel.
Fréquence modifiable via le `cron` du workflow.

### Format d'un avis

```json
{
  "author": "Grégoire",
  "date": "2026-08-30",
  "stay": "1 nuit · août 2026",
  "score": 9.0,
  "title": "Fabuleux",
  "positive": "Proximité du centre, calme, dimensions de la chambre, petit-déjeuner.",
  "negative": "Absence de climatisation mais ventilateur efficace."
}
```

Champs : `author`, `date` (`AAAA-MM-JJ`, sert au tri), `stay` (texte affiché),
`title`, `score` (sur 10), `positive`, `negative` (laisser `""` si vide).
`score` / `count` à la racine du fichier alimentent le bandeau global (optionnel).
