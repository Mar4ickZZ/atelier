import React from 'react';
import Title from "../components/Title.jsx";
import {NavLink} from "react-router-dom";

const About = () => {
    return (
        <div>

            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'Termenii și'} text2={'condiți'} />
            </div>

            <div className='my-2.5 flex flex-col justify-center md:flex-row gap-16'>
                <div className='flex flex-col justify-center gap-6 md:w-2/3 text-gray-600'>
                    <div>
                        <p className='mt-4 mb-1.5'>1. Introducere</p>
                        <p>Bine ați venit pe site-ul <b>Atelier Maria</b> (<a
                            href="https://atelier-maria.ro">atelier-maria.ro</a>). Accesarea și utilizarea acestui site
                            implică acceptarea termenilor și condițiilor de mai jos. Vă rugăm să le citiți cu atenție.
                        </p>

                        <p className='mt-4 mb-1.5'>2. Date despre companie</p>
                        <p><b>Atelier Maria S.R.L.</b>, Jud. Maramureș, Municipiul Baia Mare, Bulevardul
                            TRAIAN, Nr.22A, Etaj PARTER, email: <NavLink to="mailto:mariacalinicivas@gmail.com">mariacalinicivas@gmail.com</NavLink>, telefon: <NavLink to="tel:+40755397885">+40755397885</NavLink>.</p>

                        <p className='mt-4 mb-1.5'>3. Produse și servicii</p>
                        <p>Atelier Maria comercializează produse personalizate conform cerințelor clienților. Toate
                            imaginile de pe site sunt cu titlu informativ.</p>

                        <p className='mt-4 mb-1.5'>4. Comenzi și livrare</p>
                        <p>Comenzile se plasează online. Atelier Maria colaborează cu servicii de curierat pentru
                            livrare. Termenul de livrare este specificat la finalizarea comenzii.</p>

                        <p className='mt-4 mb-1.5'>5. Plăți</p>
                        <p>Plata se poate realiza prin transfer bancar sau prin procesatori de plăți online.</p>

                        <p className='mt-4 mb-1.5'>6. Retururi și reclamații</p>
                        <p>Produsele personalizate nu pot fi returnate, exceptând cazurile de defecte de fabricație.
                            Reclamațiile se pot trimite la adresa de email specificată.</p>

                        <p className='mt-4 mb-1.5'>7. Protecția datelor personale</p>
                        <p>Datele clienților sunt colectate și utilizate conform politicii de confidențialitate
                            disponibile pe site.</p>

                        <p className='mt-4 mb-1.5'>8. Modificări ale termenilor și condițiilor</p>
                        <p>Atelier Maria își rezervă dreptul de a modifica acești termeni fără notificare
                            prealabilă.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;