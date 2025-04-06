import React from 'react';
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import { Helmet } from "react-helmet";

const Contact = () => {
    return (
        <main className="px-4">
            <Helmet>
                <title>Contact - Atelier Maria</title>
                <meta
                    name="description"
                    content="Contactează Atelier Maria pentru comenzi personalizate, program de funcționare sau locație. Ne găsești în Baia Mare, pe Bulevardul Traian 22A."
                />
            </Helmet>

            <div className="text-center text-2xl pt-10 border-t">
                <Title text1="CONTACTEAZĂ" text2="ACUM" />
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-10 items-center md:items-start max-w-screen-md mx-auto">
                <img
                    className="w-full md:max-w-[480px] rounded-lg shadow-md"
                    src={assets.contact_img}
                    alt="Imagine de contact - Atelier Maria"
                />

                <address className="not-italic flex flex-col gap-6 text-gray-600">
                    <p className="font-semibold text-xl">Magazinul Nostru</p>

                    <a
                        href="https://maps.google.com/?q=Bulevardul%20Traian%2022A,%20Baia%20Mare"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900"
                        aria-label="Vezi locația pe Google Maps"
                    >
                        Bulevardul Traian 22A<br /> Baia Mare
                    </a>

                    <p className="text-gray-500">
                        <strong>Ore de lucru:</strong><br />
                        Luni - Vineri: 09:00 - 17:00<br />
                        Sâmbătă: 09:00 - 14:00
                    </p>

                    <a
                        href="tel:+40755397885"
                        className="text-gray-500 hover:text-gray-900"
                    >
                        Tel: +40 755 397 885
                    </a>

                    <a
                        href="mailto:mariacalinicivas@gmail.com"
                        className="text-gray-500 hover:text-gray-900"
                    >
                        Email: mariacalinicivas@gmail.com
                    </a>
                </address>
            </div>
        </main>
    );
};

export default Contact;
