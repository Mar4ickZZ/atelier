import React from 'react';
import { Helmet } from "react-helmet";
import Title from "../components/Title.jsx";

const Conditions = () => {
    return (
        <main className="border-t pt-8 px-4">
            <Helmet>
                <title>Termeni și condiții - Atelier Maria</title>
                <meta
                    name="description"
                    content="Citește termenii și condițiile de utilizare a site-ului Atelier Maria. Informații despre comenzi, livrare, plăți și protecția datelor personale."
                />
            </Helmet>

            <Title text1="Termenii și" text2="condiții" />

            <section className="my-4 mx-auto max-w-3xl text-gray-600 text-sm sm:text-base">
                <h2 className="mt-6 text-lg font-semibold">1. Introducere</h2>
                <p>
                    Bine ați venit pe site-ul <b>Atelier Maria</b> (
                    <a href="https://atelier-maria.ro" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        atelier-maria.ro
                    </a>
                    ). Accesarea și utilizarea acestui site implică acceptarea termenilor și condițiilor de mai jos. Vă rugăm să le citiți cu atenție.
                </p>

                <h2 className="mt-6 text-lg font-semibold">2. Date despre companie</h2>
                <p>
                    <b>Atelier Maria S.R.L.</b>, Jud. Maramureș, Municipiul Baia Mare, Bulevardul TRAIAN, Nr.22A, Etaj PARTER. <br />
                    Email: <a href="mailto:mariacalinicivas@gmail.com" className="text-blue-600 hover:underline">mariacalinicivas@gmail.com</a> <br />
                    Telefon: <a href="tel:+40755397885" className="text-blue-600 hover:underline">+40 755 397 885</a>
                </p>

                <h2 className="mt-6 text-lg font-semibold">3. Produse și servicii</h2>
                <p>Atelier Maria comercializează produse personalizate conform cerințelor clienților. Toate imaginile de pe site sunt cu titlu informativ.</p>

                <h2 className="mt-6 text-lg font-semibold">4. Comenzi și livrare</h2>
                <p>Comenzile se plasează online. Atelier Maria colaborează cu servicii de curierat pentru livrare. Termenul de livrare este specificat la finalizarea comenzii.</p>

                <h2 className="mt-6 text-lg font-semibold">5. Plăți</h2>
                <p>Plata se poate realiza prin transfer bancar sau prin procesatori de plăți online.</p>

                <h2 className="mt-6 text-lg font-semibold">6. Retururi și reclamații</h2>
                <p>Produsele personalizate nu pot fi returnate, exceptând cazurile de defecte de fabricație. Reclamațiile se pot trimite la adresa de email specificată.</p>

                <h2 className="mt-6 text-lg font-semibold">7. Protecția datelor personale</h2>
                <p>Datele clienților sunt colectate și utilizate conform politicii de confidențialitate disponibile pe site.</p>

                <h2 className="mt-6 text-lg font-semibold">8. Modificări ale termenilor și condițiilor</h2>
                <p>Atelier Maria își rezervă dreptul de a modifica acești termeni fără notificare prealabilă.</p>
            </section>
        </main>
    );
};

export default Conditions;
