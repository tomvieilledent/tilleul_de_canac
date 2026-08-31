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

// Carte — 270 chemin de Canac, 12850 Onet-le-Château (coordonnées de la fiche OSM du gîte)
export const MAP = {
  lat: 44.36362,
  lon: 2.58369,
  zoom: 16,
  label: "Le Tilleul de Canac — 270 chemin de Canac, 12850 Onet-le-Château",
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

// Photos attendues dans public/photos/ : tc1.jpg, tc2.jpg, … BASE_URL gère le préfixe GitHub Pages.
export const PHOTO_COUNT = 6;
export const PHOTOS = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  src: `${import.meta.env.BASE_URL}photos/tc${i + 1}.jpg`,
  alt: `Photo de la chambre d'hôtes ${i + 1}`,
}));

export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
