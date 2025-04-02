import React from 'react';
import Title from "../components/Title.jsx";
import {assets} from "../assets/assets.js";

const About = () => {
    return (
        <div>

            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'DESPRE'} text2={'NOI'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=""/>
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>La Atelier Maria, transformăm fiecare casă într-un spațiu elegant și primitor prin perdele și draperii premium. Punem accent pe calitate, stil și funcționalitate, oferind soluții care îmbină estetica cu confortul.</p>
                    <p>Fie că preferi un design modern, clasic sau sofisticat, colecția noastră diversificată de materiale, texturi și culori îți permite să găsești perdelele perfecte pentru locuința ta. Alegem cu atenție fiecare țesătură pentru a asigura durabilitate, rafinament și un aspect impecabil.</p>
                    <b className='text-gray-800'>Misiunea Noastră</b>
                    <p>Misiunea noastră este de a îmbina estetica cu funcționalitatea, oferindu-ți perdele și draperii premium care să îți reflecte stilul personal. Punem accent pe inovație, calitate și servicii impecabile, asigurând o experiență de cumpărare ușoară și plăcută.</p>
                </div>
            </div>

            <div className='text-xl py-4'>
                <Title text1={'DE CE SĂ NE'} text2={'ALEGI PE NOI'} />
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Calitate Garantată:</b>
                    <p className='text-gray-600'>Toate perdelele și draperiile noastre sunt realizate din materiale premium, atent selecționate pentru a garanta durabilitate și rafinament.</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Personalizare și Diversitate:</b>
                    <p className='text-gray-600'>Oferim soluții personalizate pentru fiecare tip de interior, cu o gamă variată de culori, modele și texturi.</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Servicii Profesionale:</b>
                    <p className='text-gray-600'>Echipa noastră de specialiști este gata să te consilieze în alegerea perfectă, asigurându-se că produsul final îndeplinește toate așteptările tale.</p>
                </div>
            </div>

        </div>
    );
};

export default About;