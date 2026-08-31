import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Room from "./components/Room.jsx";
import Gallery from "./components/Gallery.jsx";
import Reviews from "./components/Reviews.jsx";
import Surroundings from "./components/Surroundings.jsx";
import Booking from "./components/Booking.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu">
        <Hero />
        <About />
        <Room />
        <Gallery />
        <Reviews />
        <Surroundings />
        <Booking />
        <Contact />
      </main>
    </>
  );
}
