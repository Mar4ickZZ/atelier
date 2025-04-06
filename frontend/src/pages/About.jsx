import React, { useEffect } from 'react';
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import { Helmet } from "react-helmet";

const About = () => {

    useEffect(() => {
        document.title = "Despre noi - Atelier Maria";
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", "Descoperă povestea Atelier Maria și misiunea noastră. Perdele și draperii premium, calitate garantată și servicii profesionale.");
    }, []);

    return (
        <main>
            <Helmet>
                <title>Despre noi - Atelier Maria</title>
                <meta name="description" content="Descoperă povestea Atelier Maria și misiunea noastră. Perdele și draperii premium, calitate garantată și servicii profesionale." />
                <meta name="keywords" content="perdele, draperii, perdele premium, atelier, decor interior, personalizare, calitate, Baia Mare, atelier Maria" />
                <meta name="author" content="Atelier Maria" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Atelier Maria",
                        "url": "https://atelier-maria.ro",
                        "logo": "https://atelier-maria.ro/path-to-logo.jpg",
                        "description": "Perdele și draperii premium, realizate cu dragoste și atenție la detalii.",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+40 123 456 789",
                            "contactType": "customer service"
                        }
                    })}
                </script>
            </Helmet>

            <section className="text-center pt-8 border-t">
                <Title text1="DESPRE" text2="NOI" />
            </section>

            <section className="my-10 flex flex-col md:flex-row gap-16 items-center">
                <img
                    className="w-full md:max-w-[450px]"
                    src={assets.about_img}
                    alt="Imagine Atelier Maria - perdele și draperii premium"
                    loading="lazy"
                />
                <article className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>
                        La <strong>Atelier Maria</strong>, transformăm fiecare casă într-un spațiu elegant și primitor prin perdele și draperii premium.
                        Punem accent pe calitate, stil și funcționalitate, oferind soluții care îmbină estetica cu confortul.
                    </p>
                    <p>
                        Fie că preferi un design modern, clasic sau sofisticat, colecția noastră diversificată de materiale, texturi și culori
                        îți permite să găsești perdelele perfecte pentru locuința ta. Alegem cu atenție fiecare țesătură pentru a asigura durabilitate,
                        rafinament și un aspect impecabil.
                    </p>
                    <h2 className="text-gray-800 text-lg font-bold">Misiunea Noastră</h2>
                    <p>
                        Misiunea noastră este de a îmbina estetica cu funcționalitatea, oferindu-ți perdele și draperii premium care să îți reflecte stilul personal.
                        Punem accent pe inovație, calitate și servicii impecabile, asigurând o experiență de cumpărare ușoară și plăcută.
                    </p>
                </article>
            </section>

            <section className="text-center text-xl py-4">
                <Title text1="DE CE SĂ NE" text2="ALEGI PE NOI" />
            </section>

            <section className="flex flex-col md:flex-row text-sm mb-20">
                <article className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <h2 className="text-lg font-bold">Calitate Garantată</h2>
                    <p className="text-gray-600">
                        Toate perdelele și draperiile noastre sunt realizate din materiale premium,
                        atent selecționate pentru a garanta durabilitate și rafinament.
                    </p>
                </article>

                <article className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <h2 className="text-lg font-bold">Personalizare și Diversitate</h2>
                    <p className="text-gray-600">
                        Oferim soluții personalizate pentru fiecare tip de interior, cu o gamă variată de culori, modele și texturi.
                    </p>
                </article>

                <article className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <h2 className="text-lg font-bold">Servicii Profesionale</h2>
                    <p className="text-gray-600">
                        Echipa noastră de specialiști este gata să te consilieze în alegerea perfectă,
                        asigurându-se că produsul final îndeplinește toate așteptările tale.
                    </p>
                </article>
            </section>
        </main>
    );
};

export default About;
