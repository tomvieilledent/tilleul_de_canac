// Données éditoriales du site.

export const BOOKING_URL =
  "https://www.booking.com/hotel/fr/chambre-d-39-hote-rodez.fr.html";
export const BOOKING_REVIEWS_URL = BOOKING_URL + "#tab-reviews";

export const CONTACT = {
  address1: "270 chemin de Canac",
  address2: "12850 Onet-le-Château",
  phone: "06 63 71 39 62",
  phoneHref: "+33663713962",
  email: "lbcmarie.12@gmail.com",
  languages: "Français, anglais, espagnol",
};

// Carte OpenStreetMap (coordonnées approximatives — à affiner)
export const MAP = {
  embed:
    "https://www.openstreetmap.org/export/embed.html?bbox=2.5300%2C44.3520%2C2.6050%2C44.3880&layer=mapnik&marker=44.3700%2C2.5675",
  link: "https://www.openstreetmap.org/?mlat=44.3700&mlon=2.5675#map=15/44.3700/2.5675",
};

export const ROOM_FEATURES = [
  {
    title: "Le couchage",
    text: "Une chambre familiale pouvant accueillir jusqu'à 3 personnes, avec coin salon et télévision.",
  },
  {
    title: "La salle de bains",
    text: "Salle de bains privative avec baignoire ou douche, sèche-cheveux et articles de toilette offerts.",
  },
  {
    title: "La kitchenette",
    text: "Coin repas avec cuisine équipée : micro-ondes, réfrigérateur et vaisselle.",
  },
  {
    title: "Le petit-déjeuner",
    text: "Un petit-déjeuner continental maison, copieux, servi chaque matin et inclus dans le tarif.",
  },
];

export const HIGHLIGHTS = [
  "Parking privé gratuit",
  "Wi-Fi gratuit dans la chambre",
  "Jardin avec terrasse",
  "Petit-déjeuner maison inclus",
];

export const PRACTICAL = [
  "Petit-déjeuner maison inclus",
  "Parking privé gratuit sur place",
  "Animaux non admis",
  "Paiement et conditions d'annulation gérés via Booking",
];

export const DISTANCES = [
  { place: "Gare de Rodez", value: "< 5 min à pied" },
  { place: "Cathédrale Notre-Dame de Rodez", value: "2 km" },
  { place: "Musée Soulages", value: "2 km" },
  { place: "Golf", value: "2 km" },
];

// Photos attendues dans public/photos/ (photo-1.jpg …). BASE_URL gère le préfixe GitHub Pages.
export const PHOTOS = Array.from({ length: 6 }, (_, i) => ({
  src: `${import.meta.env.BASE_URL}photos/photo-${i + 1}.jpg`,
  alt: `Photo de la chambre d'hôtes ${i + 1}`,
}));

export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
