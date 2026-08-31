/* Le Tilleul de Canac — calendrier des disponibilités
 * Lit data/availability.json (généré depuis l'iCal Booking par GitHub Action)
 * et affiche 2 mois en marquant les jours indisponibles.
 */
(function () {
  "use strict";

  var CONFIG = {
    dataUrl: "data/availability.json",
    monthsToShow: 2,
    // URL de repli si le JSON ne contient pas bookingUrl
    bookingUrlFallback:
      "https://www.booking.com/hotel/fr/chambre-d-39-hote-rodez.fr.html",
  };

  var DOW = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  var MONTHS = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];

  // année courante dans le footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var calEl = document.getElementById("calendar");
  if (!calEl) return;

  function toDate(str) {
    // "YYYY-MM-DD" -> Date locale à minuit
    var p = str.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  function startOfToday() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  function sameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  // ranges: [{start, end}] avec end exclusif (convention iCal)
  function isBooked(day, ranges) {
    for (var i = 0; i < ranges.length; i++) {
      if (day >= ranges[i].start && day < ranges[i].end) return true;
    }
    return false;
  }

  function renderMonth(year, month, ranges, today) {
    var wrap = document.createElement("div");
    wrap.className = "cal-month";

    var title = document.createElement("h4");
    title.textContent = MONTHS[month] + " " + year;
    wrap.appendChild(title);

    var grid = document.createElement("div");
    grid.className = "cal-grid";

    DOW.forEach(function (d) {
      var c = document.createElement("div");
      c.className = "cal-dow";
      c.textContent = d;
      grid.appendChild(c);
    });

    var first = new Date(year, month, 1);
    // JS: 0=dimanche ; on veut lundi en tête
    var lead = (first.getDay() + 6) % 7;
    for (var i = 0; i < lead; i++) {
      var empty = document.createElement("div");
      empty.className = "cal-day is-empty";
      grid.appendChild(empty);
    }

    var daysInMonth = new Date(year, month + 1, 0).getDate();
    for (var d = 1; d <= daysInMonth; d++) {
      var day = new Date(year, month, d);
      var cell = document.createElement("div");
      cell.className = "cal-day";
      cell.textContent = String(d);

      if (day < today) {
        cell.className += " is-past";
      } else if (isBooked(day, ranges)) {
        cell.className += " is-booked";
        cell.setAttribute("aria-label", d + " " + MONTHS[month] + " — indisponible");
      } else {
        cell.className += " is-free";
        cell.setAttribute("aria-label", d + " " + MONTHS[month] + " — disponible");
      }
      if (sameDay(day, today)) cell.className += " is-today";

      grid.appendChild(cell);
    }

    wrap.appendChild(grid);
    return wrap;
  }

  function render(data) {
    var ranges = (data.booked || []).map(function (r) {
      return { start: toDate(r.start), end: toDate(r.end) };
    });

    var today = startOfToday();
    calEl.innerHTML = "";

    var months = document.createElement("div");
    months.className = "calendar-months";

    var cursor = new Date(today.getFullYear(), today.getMonth(), 1);
    for (var m = 0; m < CONFIG.monthsToShow; m++) {
      months.appendChild(
        renderMonth(cursor.getFullYear(), cursor.getMonth(), ranges, today)
      );
      cursor.setMonth(cursor.getMonth() + 1);
    }
    calEl.appendChild(months);

    // lien Booking
    var link = document.getElementById("booking-link");
    if (link && data.bookingUrl) link.href = data.bookingUrl;

    // date de mise à jour
    var upd = document.getElementById("calendar-updated");
    if (upd && data.updated) {
      var dt = new Date(data.updated);
      if (!isNaN(dt)) {
        upd.textContent =
          "Disponibilités mises à jour le " +
          dt.toLocaleDateString("fr-FR", {
            day: "numeric", month: "long", year: "numeric",
            hour: "2-digit", minute: "2-digit",
          });
      }
    }
  }

  function showError() {
    calEl.innerHTML =
      '<p class="calendar-error">Le calendrier n\'a pas pu être chargé. ' +
      'Consultez directement les disponibilités sur ' +
      '<a href="' + CONFIG.bookingUrlFallback + '" target="_blank" rel="noopener">Booking.com</a>.</p>';
  }

  fetch(CONFIG.dataUrl, { cache: "no-cache" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      if (!data.bookingUrl) data.bookingUrl = CONFIG.bookingUrlFallback;
      render(data);
    })
    .catch(function (err) {
      console.error("Calendrier:", err);
      showError();
    });
})();
