export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-media" role="img" aria-label="Vue du jardin de la chambre d'hôtes" />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="hero-kicker">Chambre d'hôtes · Onet-le-Château · Aveyron</p>
        <h1>Le Tilleul de Canac</h1>
        <p className="hero-lead">
          Une chambre familiale au calme, aux portes de Rodez : à moins de 5 minutes à pied de la
          gare, à 2 km de la cathédrale et du musée Soulages.
        </p>
        <div className="hero-actions">
          <a className="btn" href="#reservation">Voir les disponibilités</a>
          <a className="btn btn-ghost" href="#presentation">Découvrir la maison</a>
        </div>
      </div>
    </section>
  );
}
