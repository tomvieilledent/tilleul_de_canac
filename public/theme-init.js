/* Applique le thème et la langue avant le premier rendu, pour éviter tout clignotement. */
(function () {
  try {
    var t = localStorage.getItem("tdc.theme");
    if (t !== "light" && t !== "dark") {
      t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.dataset.theme = t;
    var l = localStorage.getItem("tdc.lang");
    if (["fr", "en", "es", "de"].indexOf(l) > -1) document.documentElement.lang = l;
  } catch (e) {}
})();
