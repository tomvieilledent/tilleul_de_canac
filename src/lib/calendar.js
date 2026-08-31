export function toDate(str) {
  const p = String(str).split("-");
  return new Date(+p[0], +p[1] - 1, +p[2]);
}

export function startOfToday() {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

export function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// ranges : [{ start: Date, end: Date }] avec end exclusif (convention iCal)
export function isBooked(day, ranges) {
  return ranges.some((r) => day >= r.start && day < r.end);
}

// Grille d'un mois : cases vides en tête (lundi premier) + jours.
export function monthGrid(year, month) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/** Abréviations des jours (lundi -> dimanche) pour la locale. */
export function weekdayNames(locale) {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 2024-01-01 est un lundi
  return Array.from({ length: 7 }, (_, i) => cap(fmt.format(new Date(2024, 0, 1 + i))));
}

export function monthLabel(locale, year, month) {
  return cap(
    new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
      new Date(year, month, 1)
    )
  );
}

export function longDate(locale, date) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function dateTime(locale, date) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
