import { useApp } from "../app/store.jsx";
import { useJson } from "../hooks/useJson.js";
import { BOOKING_REVIEWS_URL } from "../lib/site.js";
import { longDate } from "../lib/calendar.js";

const MAX = 5;
const sortKey = (r) => String(r.date || "").padEnd(10, "0");
const fmtScore = (s) => String(s).replace(".", ",");

export default function Reviews() {
  const { t, locale } = useApp();
  const { data } = useJson("data/reviews.json");

  const url = data?.bookingReviewsUrl || BOOKING_REVIEWS_URL;
  const list = (data?.reviews || [])
    .slice()
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)))
    .slice(0, MAX);

  const when = (r) => {
    if (r.stay) return r.stay;
    if (!r.date) return "";
    const p = String(r.date).split("-");
    const d = new Date(+p[0], +(p[1] || 1) - 1, +(p[2] || 1));
    return Number.isNaN(d.valueOf()) ? r.date : longDate(locale, d);
  };

  return (
    <section id="avis" className="section section-alt" aria-labelledby="avis-title">
      <div className="container">
        <p className="eyebrow">{t("reviews.eyebrow")}</p>
        <h2 id="avis-title">{t("reviews.title")}</h2>

        {data?.score != null && (
          <p className="reviews-badge">
            <span>{fmtScore(data.score)}</span>
            {data.count != null && <span>{data.count} {t("reviews.reviewsWord")}</span>}
            {t("reviews.scoreSuffix")}
          </p>
        )}

        <p className="section-intro">{t("reviews.intro")}</p>

        <div className="reviews">
          {list.length === 0 ? (
            <p className="reviews-empty">
              {t("reviews.empty")}{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">Booking.com</a>
            </p>
          ) : (
            list.map((r, i) => (
              <article className="review" key={`${r.author}-${r.date}-${i}`}>
                <header className="review-head">
                  {r.score != null && (
                    <span className="review-score" aria-hidden="true">{fmtScore(r.score)}</span>
                  )}
                  <div>
                    <p className="review-author">
                      {r.author || t("reviews.anonymous")}
                      {r.score != null && (
                        <span className="visually-hidden"> — {fmtScore(r.score)}/10</span>
                      )}
                    </p>
                    {when(r) && <p className="review-date">{when(r)}</p>}
                  </div>
                </header>
                {r.title && <p className="review-title">{r.title}</p>}
                {r.positive && <p className="review-pos"><span aria-hidden="true">＋ </span>{r.positive}</p>}
                {r.negative && <p className="review-neg"><span aria-hidden="true">－ </span>{r.negative}</p>}
              </article>
            ))
          )}
        </div>

        <p className="note">
          <a href={url} target="_blank" rel="noopener noreferrer">{t("reviews.seeAll")}</a>
        </p>
      </div>
    </section>
  );
}
