import React from "react";
import { Helmet } from "react-helmet";
import Hero from "../components/Hero.jsx";
import LatestCollection from "../components/LatestCollection.jsx";
import BestSeller from "../components/BestSeller.jsx";
import OurPolicy from "../components/OurPolicy.jsx";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Atelier Maria</title>
                <meta
                    name="description"
                    content="Descoperă cele mai noi colecții de produse personalizate realizate manual. Calitate, rafinament și suflet în fiecare creație - Atelier Maria."
                />

                {/* Schema.org JSON-LD for homepage */}
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Atelier Maria",
                        "description": "Atelier Maria oferă produse personalizate din perdele și draperii premium, lucrate manual, pentru orice tip de interior.",
                        "url": "https://atelier-maria.ro",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Atelier Maria",
                            "sameAs": [
                                "https://www.facebook.com/ateliermaria",
                                "https://www.instagram.com/ateliermariatextil?igsh=MThmcHhpeXhpemRvYg==",
                                "https://www.tiktok.com/@atelier_maria?is_from_webapp=1&"
                            ]
                        },
                        "mainEntityOfPage": "https://atelier-maria.ro"
                    }
                    `}
                </script>
            </Helmet>

            <main>
                <Hero />

                <section className="mb-16" aria-label="Colecția nouă">
                    <LatestCollection />
                </section>

                <section className="mb-16" aria-label="Cele mai vândute produse">
                    <BestSeller />
                </section>

                <section aria-label="Politica Atelier Maria">
                    <OurPolicy />
                </section>
            </main>
        </>
    );
};

export default React.memo(Home);
