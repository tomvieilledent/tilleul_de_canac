import { useState } from "react";
import { useApp } from "./app/store.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Room from "./components/Room.jsx";
import Gallery from "./components/Gallery.jsx";
import Reviews from "./components/Reviews.jsx";
import Surroundings from "./components/Surroundings.jsx";
import VisitAround from "./components/VisitAround.jsx";
import Booking from "./components/Booking.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import LegalModal from "./components/LegalModal.jsx";

export default function App() {
  const { t } = useApp();
  const [modal, setModal] = useState(null); // "legal" | "privacy" | null

  return (
    <>
      <a className="skip-link" href="#contenu">{t("nav.skip")}</a>
      <Header />
      <main id="contenu">
        <Hero />
        <About />
        <Room />
        <Gallery />
        <Reviews />
        <Surroundings />
        <VisitAround />
        <Booking />
        <Contact />
      </main>
      <Footer onOpen={setModal} />
      <LegalModal which={modal} onClose={() => setModal(null)} />
    </>
  );
}
