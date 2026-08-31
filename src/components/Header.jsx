import { useState } from "react";
import LindenLeaf from "./LindenLeaf.jsx";

const LINKS = [
  ["#presentation", "La maison"],
  ["#chambre", "La chambre"],
  ["#avis", "Avis"],
  ["#environs", "Les environs"],
  ["#reservation", "Disponibilités"],
  ["#contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" id="haut">
      <div className="container header-inner">
        <a className="brand" href="#haut" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <LindenLeaf size={28} />
          </span>
          <span className="brand-text">
            Le Tilleul<span> de Canac</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Navigation principale">
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
          <ul id="menu" className={open ? "is-open" : undefined}>
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a className="btn btn-small" href="#reservation" onClick={() => setOpen(false)}>
                Réserver
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
