import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [sizesH, setSizesH] = useState('');
    const [sizesL, setSizesL] = useState('');

    useEffect(() => {
        const foundProduct = products.find(item => item._id === productId);
        if (foundProduct) {
            setProductData(foundProduct);
            setImage(foundProduct.image[0]);
        }
    }, [productId, products]);

    const handleCustomSizeRequest = () => {
        const whatsappNumber = "40755397885";
        const message = `Bună ziua! Aș dori să comand produsul '${productData?.name}' cu dimensiuni personalizate.`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    };

    return productData ? (
        <div className='border-t-2 pt-10'>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-3 sm:w-[18.7%] w-full'>
                        {productData.image.map((item, index) => (
                            <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full cursor-pointer' alt={`Imagine ${productData.name} ${index + 1}`} />
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={image} className='w-full h-auto' alt={`Imagine principală ${productData.name}`} />
                    </div>
                </div>

                <div className='flex-1'>
                    <h1 className='font-semibold text-2xl mt-2'>{productData.name} - {productData.category}</h1>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price} / metru</p>
                    <p className='mt-5 text-gray-600 md:w-4/5'>{productData.description}</p>

                    <div className='flex flex-col gap-4 my-8'>
                        <p className='font-medium'>Alegeți lungimea (cm):</p>
                        <div className='flex flex-wrap gap-2'>
                            {productData.sizesH.map((item, index) => (
                                <button
                                    onClick={() => setSizesH(item)}
                                    className={`border py-2 px-4 bg-gray-100 hover:border-orange-400 transition ${item === sizesH ? 'border-orange-500' : ''}`}
                                    key={index}>{item}</button>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 my-8'>
                        <p className='font-medium'>Alegeți înălțimea (cm):</p>
                        <div className='flex flex-wrap gap-2'>
                            {productData.sizesL.map((item, index) => (
                                <button
                                    onClick={() => setSizesL(item)}
                                    className={`border py-2 px-4 bg-gray-100 hover:border-orange-400 transition ${item === sizesL ? 'border-orange-500' : ''}`}
                                    key={index}>{item}</button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart(productData._id, sizesH, sizesL)}
                        className='bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition'
                    >
                        🛒 Adaugă în coș
                    </button>

                    <p className='mt-4 text-gray-700 text-sm font-semibold'>Dimensiune personalizată? Scrieți-ne pe WhatsApp și vă ajutăm imediat! 📏✨</p>
                    <button
                        onClick={handleCustomSizeRequest}
                        className='bg-green-500 text-white px-6 py-3 mt-2 text-sm rounded-lg shadow-md hover:bg-green-600 active:bg-green-700 transition-all'
                    >
                        📲 Comandă pe WhatsApp
                    </button>

                    <hr className='mt-8 sm:w-4/5'/>
                </div>
            </div>

            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : <div className='opacity-0'></div>;
};

export default Product;