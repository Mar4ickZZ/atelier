import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import CartTotal from "../components/CartTotal.jsx";
import { Helmet } from "react-helmet";

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate, token } = useContext(ShopContext); // добавили token
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        document.title = "Coș de cumpărături - Atelier Maria";
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", "Vizualizează și editează produsele din coșul tău. Finalizează comanda la Atelier Maria - perdele și draperii premium.");

        if (products.length > 0) {
            const tempData = [];
            for (const itemId in cartItems) {
                for (const sizePair in cartItems[itemId]) {
                    if (cartItems[itemId][sizePair] > 0) {
                        const [sizesH, sizesL] = sizePair.split('x');
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
        <main className='border-t pt-14'>
            <Helmet>
                <title>Coș de cumpărături - Atelier Maria</title>
                <meta name="description" content="Vizualizează și editează produsele din coșul tău. Finalizează comanda la Atelier Maria - perdele și draperii premium." />
            </Helmet>

            <section className='text-2xl mb-3'>
                <Title text1={'COȘUL'} text2={'TĂU'} />
            </section>

            <section>
                {cartData.map((item, index) => {
                    const productData = products.find(product => product._id === item._id);
                    if (!productData) return null;

                    return (
                        <div key={index}
                             className='py-4 border-t border-b text-gray-700 grid grid-cols-1 sm:grid-cols-[4fr_2fr_1fr] gap-6 sm:items-center'>

                            <div className='flex items-start gap-4 sm:gap-6'>
                                <img
                                    className='w-16 sm:w-20'
                                    src={productData.image[0]}
                                    alt={`Imagine produs: ${productData.name}`}
                                    loading="lazy"
                                />
                                <div className='flex flex-col gap-1'>
                                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                    <div
                                        className='flex flex-wrap sm:flex-nowrap items-start gap-2 sm:gap-5 mt-2 text-sm'>
                                        <p>{currency}{productData.price}/metru</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>Lungimea: {item.sizesH}</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>Înălțimea: {item.sizesL}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity & Delete for mobile */}
                            <div className='flex justify-between items-center sm:hidden px-1'>
                                <input
                                    onChange={(e) => {
                                        const newValue = Number(e.target.value);
                                        if (newValue > 0) {
                                            updateQuantity(item._id, item.sizesH, item.sizesL, newValue);
                                        }
                                    }}
                                    className='border w-16 px-2 py-1'
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                    aria-label="Modifică cantitatea"
                                />
                                <img
                                    onClick={() => updateQuantity(item._id, item.sizesH, item.sizesL, 0)}
                                    className='w-5 cursor-pointer'
                                    src={assets.bin_icon}
                                    alt="Șterge produsul"
                                />
                            </div>

                            {/* Quantity & Delete for desktop */}
                            <React.Fragment>
                                <input
                                    onChange={(e) => {
                                        const newValue = Number(e.target.value);
                                        if (newValue > 0) {
                                            updateQuantity(item._id, item.sizesH, item.sizesL, newValue);
                                        }
                                    }}
                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 hidden sm:block'
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                    aria-label="Modifică cantitatea"
                                />

                                <img
                                    onClick={() => updateQuantity(item._id, item.sizesH, item.sizesL, 0)}
                                    className='w-4 mr-4 sm:w-5 cursor-pointer hidden sm:block'
                                    src={assets.bin_icon}
                                    alt="Șterge produsul"
                                />
                            </React.Fragment>
                        </div>

                    );
                })}
            </section>

            <section className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal/>

                    {!token && (
                        <p className='text-red-600 text-sm text-end mt-4'>
                            Trebuie să fii <strong>autentificat</strong> pentru a finaliza comanda.
                        </p>
                    )}

                    <div className='w-full text-end'>
                        <button
                            onClick={() => navigate('/place-order')}
                            className={`text-white text-sm my-8 px-8 py-3 ${token ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!token}
                            aria-label="Finalizează cumpărăturile"
                        >
                            FINALIZEAZĂ CUMPĂRĂTURILE
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Cart;
