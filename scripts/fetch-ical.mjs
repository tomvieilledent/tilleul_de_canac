/**
 * Récupère l'agenda iCal de Booking et génère data/availability.json.
 *
 * Usage :
 *   BOOKING_ICAL_URL="https://ical.booking.com/v1/export?t=..." node scripts/fetch-ical.mjs
 *
 * Le lien iCal se récupère dans l'extranet Booking :
 *   Tarifs & Disponibilité  ->  Synchroniser les calendriers  ->  Exporter le calendrier
 */

import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "data", "availability.json");
const BOOKING_PAGE =
  "https://www.booking.com/hotel/fr/chambre-d-39-hote-rodez.fr.html";

/** Déplie les lignes iCal (RFC 5545 : continuation par espace/tab en début de ligne). */
export function unfold(text) {
  return text.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
}

/** "20260145" ou "2026-01-45" -> "2026-01-45" (date seule). */
function normDate(raw) {
  const m = raw.match(/(\d{4})-?(\d{2})-?(\d{2})/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

export function parseEvents(ics) {
  const text = unfold(ics);
  const blocks = text.split("BEGIN:VEVENT").slice(1);
  const ranges = [];

  for (const block of blocks) {
    const body = block.split("END:VEVENT")[0];
    const get = (key) => {
      const re = new RegExp(`^${key}[^:\\r\\n]*:(.+)$`, "mi");
      const m = body.match(re);
      return m ? m[1].trim() : null;
    };

    const start = normDate(get("DTSTART") || "");
    let end = normDate(get("DTEND") || "");
    if (!start) continue;

    // DTEND absent -> réservation d'une nuit (fin = lendemain, exclusif)
    if (!end) {
      const d = new Date(start + "T00:00:00Z");
      d.setUTCDate(d.getUTCDate() + 1);
      end = d.toISOString().slice(0, 10);
    }

    ranges.push({ start, end, summary: get("SUMMARY") || "" });
  }

  // tri + fusion des plages qui se touchent
  ranges.sort((a, b) => a.start.localeCompare(b.start));
  const merged = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end) {
      if (r.end > last.end) last.end = r.end;
    } else {
      merged.push({ ...r });
    }
  }
  return merged.map(({ start, end }) => ({ start, end }));
}

function previousUrl() {
  try {
    return JSON.parse(readFileSync(OUT, "utf8")).bookingUrl || BOOKING_PAGE;
  } catch {
    return BOOKING_PAGE;
  }
}

async function main() {
  const icalUrl = process.env.BOOKING_ICAL_URL;
  if (!icalUrl) {
    console.error("BOOKING_ICAL_URL manquant. Rien à faire.");
    process.exit(process.env.CI ? 1 : 0);
  }

  const res = await fetch(icalUrl, {
    headers: { "User-Agent": "tilleul-de-canac-site/1.0" },
  });
  if (!res.ok) {
    console.error(`Échec du téléchargement iCal : HTTP ${res.status}`);
    process.exit(1);
  }

  const ics = await res.text();
  const booked = parseEvents(ics);

  const payload = {
    updated: new Date().toISOString(),
    source: "booking-ical",
    bookingUrl: previousUrl(),
    booked,
  };

  writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n");
  console.log(
    `OK : ${booked.length} plage(s) indisponible(s) écrite(s) dans data/availability.json`
  );
}

// exécuté seulement si lancé directement (pas à l'import)
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await main();
}
