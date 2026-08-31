import { useJson } from "../hooks/useJson.js";
import { BOOKING_REVIEWS_URL } from "../lib/site.js";
import { MONTHS } from "../lib/calendar.js";

const MAX = 5;

function fmtDate(d) {
  if (!d) return "";
  const p = String(d).split("-");
  const short = [
    "janv.", "févr.", "mars", "avr.", "mai", "juin",
    "juil.", "août", "sept.", "oct.", "nov.", "déc.",
  ];
  if (p.length >= 2) {
    const m = short[+p[1] - 1] || MONTHS[+p[1] - 1] || "";
    return `${p.length >= 3 ? p[2] + " " : ""}${m} ${p[0]}`;
  }
  return String(d);
}

const sortKey = (r) => String(r.date || "").padEnd(10, "0");
const fmtScore = (s) => String(s).replace(".", ",");

export default function Reviews() {
  const { data } = useJson("data/reviews.json");

  const url = data?.bookingReviewsUrl || BOOKING_REVIEWS_URL;
  const list = (data?.reviews || [])
    .slice()
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)))
    .slice(0, MAX);

  return (
    <section id="avis" className="section section-alt">
      <div className="container">
        <p className="eyebrow">Avis des voyageurs</p>
        <h2>Ce qu'en disent nos hôtes</h2>

        {data?.score != null && (
          <p className="reviews-badge">
            <span>{fmtScore(data.score)}</span>
            {data.count != null && <span>{data.count} avis</span>}
            sur Booking
          </p>
        )}

        <p className="section-intro">
          Les {MAX} avis les plus récents, repris de la page Booking de la chambre d'hôtes.
        </p>

        <div className="reviews" aria-live="polite">
          {list.length === 0 ? (
            <p className="reviews-empty">
              Les premiers avis seront bientôt affichés ici. En attendant, consultez-les sur{" "}
              <a href={url} target="_blank" rel="noopener">Booking.com</a>.
            </p>
          ) : (
            list.map((r, i) => (
              <article className="review" key={`${r.author}-${r.date}-${i}`}>
                <header className="review-head">
                  {r.score != null && (
                    <span className="review-score">{fmtScore(r.score)}</span>
                  )}
                  <div>
                    <p className="review-author">{r.author || "Voyageur"}</p>
                    {(r.stay || r.date) && (
                      <p className="review-date">{r.stay || fmtDate(r.date)}</p>
                    )}
                  </div>
                </header>
                {r.title && <p className="review-title">{r.title}</p>}
                {r.positive && <p className="review-pos">＋ {r.positive}</p>}
                {r.negative && <p className="review-neg">－ {r.negative}</p>}
              </article>
            ))
          )}
        </div>

        <p className="note">
          <a href={url} target="_blank" rel="noopener">Voir tous les avis sur Booking.com</a>
        </p>
      </div>
    </section>
  );
}
