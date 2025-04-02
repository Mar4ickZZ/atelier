import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import CartTotal from "../components/CartTotal.jsx";

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);


    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const itemId in cartItems) {
                for (const sizePair in cartItems[itemId]) {
                    if (cartItems[itemId][sizePair] > 0) {
                        const [sizesH, sizesL] = sizePair.split('x'); // Исправлено: теперь разделитель 'x'

                        tempData.push({
                            _id: itemId,
                            sizesH,
                            sizesL,
                            quantity: cartItems[itemId][sizePair]
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'COȘUL'} text2={'TĂU'} />
            </div>

            <div>
                {cartData.map((item, index) => {
                    const productData = products.find(product => product._id === item._id);

                    return (
                        <div key={index}
                             className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_fr] items-center gap-6'>
                            <div className='flex items-start gap-6'>
                                <img className='w-16 sm:w-20' src={productData.image[0]} alt=""/>
                                <div>
                                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                    <div className='flex items-center gap-5 mt-2'>
                                        <p>{currency}{productData.price}/metru</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>Lungimea: {item.sizesH}</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>Înălțimea: {item.sizesL}</p>
                                    </div>
                                </div>
                            </div>
                            <input
                                onChange={(e) => {
                                    const newValue = Number(e.target.value);
                                    if (newValue > 0) {
                                        updateQuantity(item._id, item.sizesH, item.sizesL, newValue);
                                    }
                                }}
                                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                                type="number"
                                min={1}
                                defaultValue={item.quantity}
                            />
                            <img
                                onClick={() => updateQuantity(item._id, item.sizesH, item.sizesL, 0)}
                                className='w-4 mr-4 sm:w-5 cursor-pointer'
                                src={assets.bin_icon}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>

            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal/>
                    <div className='w-full text-end'>
                        <button onClick={() => navigate('/place-order')}
                                className='bg-black text-white text-sm my-8 px-8 py-3'>
                            FINALIZEAZĂ CUMPĂRĂTURILE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
