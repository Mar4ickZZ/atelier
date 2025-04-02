import React from 'react';
import {assets} from "../assets/assets.js";

const OurPolicy = () => {
    return (
        <div
            className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

            <div>
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5 ' alt=""/>
                <p className='font-semibold'>Politică de schimb ușoară</p>
                <p className='text-gray-400'>Oferim o politică de schimb fără bătăi de cap!</p>
            </div>

            <div>
                <img src={assets.quality_icon} className='w-12 m-auto mb-5 ' alt=""/>
                <p className='font-semibold'>Politică de retur de 7 zile</p>
                <p className='text-gray-400'>Oferim retur gratuit în termen de 7 zile!</p>
            </div>

            <div>
                <img src={assets.support_img} className='w-12 m-auto mb-5 ' alt=""/>
                <p className='font-semibold'>Cel mai bun suport pentru clienți</p>
                <p className='text-gray-400'>Oferim asistență 24/7!</p>
            </div>

        </div>
    );
};

export default OurPolicy;