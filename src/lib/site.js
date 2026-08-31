// Données non traduites (coordonnées, liens). Les textes sont dans src/i18n/strings.js.

export const BOOKING_URL =
  "https://www.booking.com/hotel/fr/chambre-d-39-hote-rodez.fr.html";
export const BOOKING_REVIEWS_URL = BOOKING_URL + "#tab-reviews";

export const CONTACT = {
  address1: "270 chemin de Canac",
  address2: "12850 Onet-le-Château",
  phone: "06 63 71 39 62",
  phoneHref: "+33663713962",
  email: "lbcmarie.12@gmail.com",
};

// 270 chemin de Canac, 12850 Onet-le-Château (coordonnées de la fiche OSM du gîte)
export const MAP = { lat: 44.36362, lon: 2.58369, zoom: 16 };

// Photos dans public/photos/ : tc1.jpg … (galerie) et tc7.jpg (fond du bandeau d'accueil).
export const PHOTO_COUNT = 6;
export const GALLERY_PHOTOS = Array.from({ length: PHOTO_COUNT }, (_, i) => `tc${i + 1}.jpg`);
export const HERO_PHOTO = "tc7.jpg";

export const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\//, "")}`;
export const photo = (name) => asset(`photos/${name}`);
