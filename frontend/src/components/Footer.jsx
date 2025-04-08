import React from 'react';
import {assets} from "../assets/assets.js";
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>

                <div>
                    <img src={assets.logo} className='mb-5 w-48' alt=""/>
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Descoperă colecția noastră de perdele și draperii premium, create pentru a aduce stil, confort
                        și intimitate în orice încăpere. Fie că îți dorești un decor modern, clasic sau elegant, îți
                        oferim soluții personalizate, materiale de calitate și o gamă variată de modele și culori.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANIA</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <NavLink to={'/'}>
                            <li>Home</li>
                        </NavLink>

                        <NavLink to={'/about'}>
                            <li>Cunoaște-ne</li>
                        </NavLink>

                        <NavLink to={'/orders'}>
                            <li>Сomenzi</li>
                        </NavLink>

                        <NavLink to={'/contact'}>
                            <li>Contact</li>
                        </NavLink>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>INFORMAȚII LEGALE</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <NavLink to={'/conditions'}>
                            <li>Termenii și Condiții</li>
                        </NavLink>

                        <NavLink to={'/personaldata'}>
                            <li>Prelucrarea datelor cu caracter personal (GDPR)</li>
                        </NavLink>

                        <NavLink to={'https://anpc.ro/'} target={'_blank'}>
                            <li>ANPC</li>
                        </NavLink>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>VORBEȘTE CU NOI</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li><NavLink to="tel:+40755397885">+40755397885</NavLink></li>
                        <li><NavLink to="mailto:mariacalinicivas@gmail.com">mariacalinicivas@gmail.com</NavLink></li>
                        <div className='flex mt-5 gap-6'>
                            <NavLink className='h-10' target={'_blank'}
                                     to={'https://www.instagram.com/ateliermariatextil?igsh=MThmcHhpeXhpemRvYg=='}><img
                                src={assets.instagram_logo} alt=""/></NavLink>
                            <NavLink className='h-10' target={'_blank'}
                                     to={'https://www.facebook.com/share/1GzeKRQnFn/?mibextid=wwXIfr'}><img
                                src={assets.facebook_logo} alt=""/></NavLink>
                            <NavLink className='h-10' target={'_blank'}
                                     to={'https://www.tiktok.com/@atelier_maria?is_from_webapp=1&'}><img
                                src={assets.tiktok_logo} alt=""/></NavLink>
                        </div>

                    </ul>
                </div>

            </div>

            <div className='py-5'>
                <hr/>
            </div>

        </div>
    );
};

export default Footer;