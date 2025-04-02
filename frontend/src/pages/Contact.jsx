import React from 'react';
import Title from "../components/Title.jsx";
import {assets} from "../assets/assets.js";
import {NavLink} from "react-router-dom";

const Contact = () => {
    return (
        <div>

            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'CONTACTEZĂ'} text2={'ACUM'}/>
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt=""/>
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Magazinul Nostru</p>

                    <NavLink
                        to="https://maps.google.com/?q=Bulevardul%20Traian%2022A,%20Baia%20Mare"
                        target="_blank"
                        className='text-gray-500'
                    >
                        Bulevardul Traian 22A<br/>Baia Mare
                    </NavLink>

                    <NavLink
                        to="tel:+40755397885"
                        className='text-gray-500'
                    >
                        Tel: +40 755 397 885
                    </NavLink>

                    <NavLink
                        to="mailto:mariacalinicivas@gmail.com"
                        className='text-gray-500'
                    >
                        Email: mariacalinicivas@gmail.com
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Contact;