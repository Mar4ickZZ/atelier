import React from 'react';
import Title from "../components/Title.jsx";
import {NavLink} from "react-router-dom";

const About = () => {
    return (
        <div>

            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'Politica privind confidențialitatea și'} text2={'prelucrarea datelor cu caracter personal'} />
            </div>

            <div className='my-2.5 flex flex-col justify-center md:flex-row gap-16'>
                <div className='flex flex-col justify-center gap-6 md:w-2/3 text-gray-600'>
                    <div>
                        <p className='mt-4 mb-1.5'>1. Introducere</p>
                        <p>Protejarea datelor dumneavoastră este o prioritate pentru noi. Această politică explică cum
                            colectăm, utilizăm și protejăm informațiile personale.</p>

                        <p className='mt-4 mb-1.5'>2. Date colectate</p>
                        <p>Colectăm următoarele date: nume, prenume, email, adresă, număr de telefon, necesare pentru
                            procesarea comenzilor.</p>

                        <p className='mt-4 mb-1.5'>3. Scopul colectării datelor</p>
                        <p>Datele sunt folosite exclusiv pentru procesarea comenzilor și livrarea produselor.</p>

                        <p className='mt-4 mb-1.5'>4. Partajarea datelor</p>
                        <p>Datele pot fi transmise către terțe părți (curieri, procesatori de plăți), doar pentru
                            realizarea comenzilor.</p>

                        <p className='mt-4 mb-1.5'>5. Securitatea datelor</p>
                        <p>Implementăm măsuri de securitate pentru protecția datelor în fața accesului neautorizat.</p>

                        <p className='mt-4 mb-1.5'>6. Drepturile utilizatorilor</p>
                        <p>Aveți dreptul să solicitați accesul, rectificarea sau ștergerea datelor personale. Ne puteți
                            contacta la <NavLink to="mailto:mariacalinicivas@gmail.com">mariacalinicivas@gmail.com</NavLink>.</p>

                        <p className='mt-4 mb-1.5'>7. Modificări ale politicii</p>
                        <p>Ne rezervăm dreptul de a actualiza această politică. Orice modificare va fi publicată pe
                            site.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;