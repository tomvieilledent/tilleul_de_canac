import { useEffect, useRef, useState } from "react";
import { useApp } from "../app/store.jsx";
import LindenLeaf from "./LindenLeaf.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import LangSwitch from "./LangSwitch.jsx";

export default function Header() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  const links = [
    ["#presentation", t("nav.house")],
    ["#chambre", t("nav.room")],
    ["#avis", t("nav.reviews")],
    ["#environs", t("nav.surroundings")],
    ["#reservation", t("nav.availability")],
    ["#contact", t("nav.contact")],
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <LindenLeaf size={28} title="" />
          </span>
          <span className="brand-text">
            Le Tilleul<span> de Canac</span>
          </span>
        </a>

        <nav className="site-nav" aria-label={t("nav.menu")} ref={navRef}>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {t("nav.menu")}
          </button>
          <ul id="primary-menu" className={open ? "is-open" : undefined}>
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a className="btn btn-small" href="#reservation" onClick={() => setOpen(false)}>
                {t("nav.book")}
              </a>
            </li>
            <li className="menu-tools">
              <LangSwitch />
              <ThemeToggle />
            </li>
          </ul>
        </nav>

        <div className="tools-desktop">
          <LangSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
