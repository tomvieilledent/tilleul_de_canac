import { useJson } from "../hooks/useJson.js";
import { BOOKING_URL } from "../lib/site.js";
import {
  DOW, MONTHS, toDate, startOfToday, sameDay, isBooked, monthGrid,
} from "../lib/calendar.js";

const MONTHS_TO_SHOW = 2;

function Month({ year, month, ranges, today }) {
  return (
    <div className="cal-month">
      <h4>{`${MONTHS[month]} ${year}`}</h4>
      <div className="cal-grid">
        {DOW.map((d) => (
          <div className="cal-dow" key={d}>{d}</div>
        ))}
        {monthGrid(year, month).map((day, i) => {
          if (!day) return <div className="cal-day is-empty" key={`e${i}`} />;
          let cls = "cal-day";
          let label;
          if (day < today) {
            cls += " is-past";
          } else if (isBooked(day, ranges)) {
            cls += " is-booked";
            label = `${day.getDate()} ${MONTHS[month]} — indisponible`;
          } else {
            cls += " is-free";
            label = `${day.getDate()} ${MONTHS[month]} — disponible`;
          }
          if (sameDay(day, today)) cls += " is-today";
          return (
            <div className={cls} key={day.toISOString()} aria-label={label}>
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Booking() {
  const { data, error } = useJson("data/availability.json");

  const today = startOfToday();
  const ranges = (data?.booked || []).map((r) => ({
    start: toDate(r.start),
    end: toDate(r.end),
  }));
  const bookingUrl = data?.bookingUrl || BOOKING_URL;

  const months = [];
  const cursor = new Date(today.getFullYear(), today.getMonth(), 1);
  for (let i = 0; i < MONTHS_TO_SHOW; i++) {
    months.push({ year: cursor.getFullYear(), month: cursor.getMonth() });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  const updated =
    data?.updated && !Number.isNaN(new Date(data.updated).valueOf())
      ? new Date(data.updated).toLocaleDateString("fr-FR", {
          day: "numeric", month: "long", year: "numeric",
          hour: "2-digit", minute: "2-digit",
        })
      : null;

  return (
    <section id="reservation" className="section section-alt">
      <div className="container">
        <p className="eyebrow">Disponibilités &amp; réservation</p>
        <h2>Vérifiez les dates libres</h2>
        <p className="section-intro">
          Le calendrier ci-dessous est synchronisé avec l'agenda Booking de la chambre d'hôtes. Les
          dates <strong>indisponibles</strong> apparaissent grisées. La réservation et le paiement se
          font sur Booking.
        </p>

        <div className="booking-block">
          <div className="calendar" aria-live="polite">
            {error ? (
              <p className="calendar-error">
                Le calendrier n'a pas pu être chargé. Consultez directement les disponibilités sur{" "}
                <a href={bookingUrl} target="_blank" rel="noopener">Booking.com</a>.
              </p>
            ) : !data ? (
              <p className="calendar-loading">Chargement du calendrier…</p>
            ) : (
              <div className="calendar-months">
                {months.map((m) => (
                  <Month
                    key={`${m.year}-${m.month}`}
                    year={m.year}
                    month={m.month}
                    ranges={ranges}
                    today={today}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="booking-cta">
            <h3>Réserver</h3>
            <p>Choisissez vos dates et finalisez votre séjour en quelques clics sur Booking.</p>
            <a className="btn btn-block" href={bookingUrl} target="_blank" rel="noopener">
              Réserver sur Booking.com
            </a>
            <p className="booking-legend">
              <span className="swatch swatch-free" /> Disponible
              <span className="swatch swatch-booked" /> Indisponible
            </p>
            {updated && (
              <p className="booking-updated">Disponibilités mises à jour le {updated}</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
