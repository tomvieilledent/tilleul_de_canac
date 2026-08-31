# Le Tilleul de Canac

Site web de la chambre d'hôtes **Le Tilleul de Canac** — 270 chemin de Canac, 12850 Onet-le-Château.

Site statique (HTML/CSS/JS, aucune dépendance) déployé sur **GitHub Pages**, avec un
calendrier de disponibilités synchronisé automatiquement depuis l'agenda **Booking**.

## Structure

```
index.html                     Page unique
assets/css/style.css           Styles
assets/js/calendar.js          Menu mobile + rendu du calendrier
assets/js/reviews.js           Rendu des avis voyageurs
assets/photos/                 Photos (photo-1.jpg … photo-6.jpg)
data/availability.json         Disponibilités (généré automatiquement)
data/reviews.json              5 derniers avis (édité à la main)
scripts/fetch-ical.mjs         Convertit l'iCal Booking -> availability.json
.github/workflows/deploy.yml               Déploiement GitHub Pages
.github/workflows/sync-availability.yml    Sync des dispos toutes les 3 h
.github/workflows/reviews-reminder.yml     Rappel avis, chaque lundi matin
```

## Mise en ligne (une seule fois)

1. **Pousser le code** sur `main`.
2. Repo → **Settings → Pages** → *Build and deployment* → **Source : GitHub Actions**.
3. Le workflow *Déploiement GitHub Pages* publie le site à l'adresse indiquée
   (`https://tomvieilledent.github.io/tilleul_de_canac/`).

## Calendrier des disponibilités

1. Dans l'**extranet Booking** : *Tarifs & Disponibilité → Synchroniser les calendriers
   → Exporter le calendrier*. Copier le lien `.ics`.
2. Repo → **Settings → Secrets and variables → Actions → New repository secret** :
   - Nom : `BOOKING_ICAL_URL`
   - Valeur : le lien `.ics`
3. Repo → **Actions → Sync disponibilités Booking → Run workflow** pour une première
   synchro immédiate. Ensuite, mise à jour automatique toutes les 3 h.

Sans ce secret, le calendrier s'affiche avec toutes les dates libres et le bouton
« Réserver sur Booking.com » reste fonctionnel.

### Format de `data/availability.json`

```json
{
  "updated": "2026-08-31T09:00:00.000Z",
  "source": "booking-ical",
  "bookingUrl": "https://www.booking.com/hotel/fr/chambre-d-39-hote-rodez.fr.html",
  "booked": [
    { "start": "2026-09-10", "end": "2026-09-14" }
  ]
}
```

`end` est **exclusif** (jour de départ). On peut aussi éditer ce fichier à la main.

## Avis des voyageurs

Booking n'expose aucune API d'avis et bloque les accès automatisés : les avis sont
donc saisis à la main dans `data/reviews.json` (les 5 plus récents, le plus récent
en premier).

Chaque **lundi matin**, le workflow *Rappel avis Booking* crée une *issue* de rappel
(si aucune n'est déjà ouverte). Pour changer la fréquence, modifier le `cron` dans
`.github/workflows/reviews-reminder.yml`.

### Format de `data/reviews.json`

```json
{
  "updated": "2026-08-31",
  "source": "manual",
  "bookingReviewsUrl": "https://www.booking.com/hotel/fr/chambre-d-39-hote-rodez.fr.html#tab-reviews",
  "score": 9.4,
  "count": 12,
  "reviews": [
    {
      "author": "Grégoire",
      "country": "",
      "date": "2026-08",
      "stay": "1 nuit · août 2026",
      "score": 9.0,
      "title": "Fabuleux",
      "positive": "Proximité du centre, calme, dimensions de la chambre, petit-déjeuner.",
      "negative": "Absence de climatisation, mais ventilateur efficace.",
      "text": ""
    }
  ]
}
```

Champs : `author` (nom), `date` (`AAAA-MM`, sert au tri), `stay` (texte libre affiché,
ex. « 1 nuit · août 2026 »), `title`, `score` (sur 10), et soit `text`, soit le couple
`positive`/`negative` (format Booking). `country` optionnel.
Tant que `reviews` est vide, le site renvoie vers la page avis Booking.

## Développement local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Tester la génération du calendrier :

```bash
BOOKING_ICAL_URL="https://ical.booking.com/v1/export?t=..." node scripts/fetch-ical.mjs
```

## À compléter

- Ajouter les vraies photos dans `assets/photos/`
- Vérifier / ajuster le marqueur de la carte (coordonnées exactes) dans `index.html`
- Renseigner le secret `BOOKING_ICAL_URL`
