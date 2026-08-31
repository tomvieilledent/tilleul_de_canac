/* Le Tilleul de Canac — avis des voyageurs
 * Lit data/reviews.json et affiche les 5 avis les plus récents.
 */
(function () {
  "use strict";

  var CONFIG = {
    dataUrl: "data/reviews.json",
    max: 5,
    bookingFallback:
      "https://www.booking.com/hotel/fr/chambre-d-39-hote-rodez.fr.html#tab-reviews",
  };

  var el = document.getElementById("reviews");
  if (!el) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
      }[c];
    });
  }

  function fmtDate(d) {
    if (!d) return "";
    // accepte "2026-08" ou "2026-08-24"
    var p = String(d).split("-");
    var months = [
      "janv.", "févr.", "mars", "avr.", "mai", "juin",
      "juil.", "août", "sept.", "oct.", "nov.", "déc.",
    ];
    if (p.length >= 2) {
      var m = months[+p[1] - 1] || "";
      return (p.length >= 3 ? p[2] + " " : "") + m + " " + p[0];
    }
    return String(d);
  }

  function sortKey(r) {
    return String(r.date || "").padEnd(10, "0");
  }

  function render(data) {
    var list = (data.reviews || []).slice().sort(function (a, b) {
      return sortKey(b).localeCompare(sortKey(a));
    }).slice(0, CONFIG.max);

    var url = data.bookingReviewsUrl || CONFIG.bookingFallback;
    var link = document.getElementById("reviews-booking-link");
    if (link) link.href = url;

    var scoreEl = document.getElementById("reviews-score");
    if (scoreEl && data.score != null) {
      scoreEl.textContent = String(data.score).replace(".", ",");
      scoreEl.closest(".reviews-badge").hidden = false;
    }
    var countEl = document.getElementById("reviews-count");
    if (countEl && data.count != null) {
      countEl.textContent = data.count + " avis";
    }

    if (!list.length) {
      el.innerHTML =
        '<p class="reviews-empty">Les premiers avis seront bientôt affichés ici. ' +
        'En attendant, consultez-les sur ' +
        '<a href="' + esc(url) + '" target="_blank" rel="noopener">Booking.com</a>.</p>';
      return;
    }

    el.innerHTML = list.map(function (r) {
      var parts = [];
      parts.push('<article class="review">');
      parts.push('<header class="review-head">');
      if (r.score != null) {
        parts.push('<span class="review-score">' + esc(String(r.score).replace(".", ",")) + "</span>");
      }
      parts.push("<div><p class=\"review-author\">" + esc(r.author || "Voyageur") + "</p>");
      var when = r.stay || fmtDate(r.date);
      if (when) parts.push('<p class="review-date">' + esc(when) + "</p>");
      parts.push("</div></header>");

      if (r.title) parts.push('<p class="review-title">' + esc(r.title) + "</p>");
      if (r.positive) parts.push('<p class="review-pos">＋ ' + esc(r.positive) + "</p>");
      if (r.negative) parts.push('<p class="review-neg">－ ' + esc(r.negative) + "</p>");
      parts.push("</article>");
      return parts.join("");
    }).join("");
  }

  fetch(CONFIG.dataUrl, { cache: "no-cache" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(render)
    .catch(function (err) {
      console.error("Avis:", err);
      el.innerHTML =
        '<p class="reviews-empty">Consultez les avis sur ' +
        '<a href="' + CONFIG.bookingFallback + '" target="_blank" rel="noopener">Booking.com</a>.</p>';
    });
})();
