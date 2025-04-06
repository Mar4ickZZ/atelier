import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);
    const deliveryCharge = 20;

    const loadOrderData = async () => {
        try {
            if (!token) return;

            const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {
                headers: { token }
            });

            if (response.data.success) {
                let allOrdersItem = [];

                response.data.orders.forEach((order) => {
                    let orderTotal = 0;

                    order.items.forEach((item) => {
                        const pricePerMeter = item.price;
                        const lengthFactor = parseInt(item.size) / 100;
                        const itemTotal = item.quantity * pricePerMeter * lengthFactor;

                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        item['itemTotal'] = itemTotal;

                        orderTotal += itemTotal;
                        allOrdersItem.push(item);
                    });

                    if (orderTotal > 0) {
                        allOrdersItem[allOrdersItem.length - 1]['orderTotalWithDelivery'] =
                            (orderTotal + deliveryCharge).toFixed(2);
                    }
                });

                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.error("Failed to load order data", error);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [token]);

    const location = useLocation();

    useEffect(() => {
        if (location.state?.orderSuccess) {
            toast.success("Comanda a fost plasată cu succes!");
        }

        loadOrderData();
    }, [token]);

    return (
        <div className='border-t pt-16'>
            <Helmet>
                <title>Istoric comenzi – Atelier Maria</title>
                <meta
                    name="description"
                    content="Vizualizați comenzile dvs. recente la Atelier Maria. Descoperiți perdele, draperii, galerii și accesorii premium pentru decorul casei."
                />
                <meta
                    name="keywords"
                    content="perdele, draperii, galerii, accesorii, fețe de masă, perne decorative, comenzi, istoric comenzi, Atelier Maria, Baia Mare"
                />
                <meta name="author" content="Atelier Maria" />
                <meta name="robots" content="noindex, follow" />

                {/* Open Graph pentru rețele sociale */}
                <meta property="og:title" content="Istoric comenzi – Atelier Maria" />
                <meta property="og:description" content="Accesează istoricul comenzilor tale la Atelier Maria. Calitate premium pentru decorul casei." />
                <meta property="og:url" content="https://atelier-maria.ro/orders" />
                <meta property="og:type" content="website" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Istoric comenzi – Atelier Maria" />
                <meta name="twitter:description" content="Vizualizați comenzile dvs. la Atelier Maria – perdele și draperii de calitate premium." />
            </Helmet>


            <div className='text-2xl'>
                <Title text1={'COMENZILE'} text2={'MELE'} />
            </div>

            <div>
                {orderData.map((item, index) => (
                    <div
                        key={index}
                        className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
                    >
                        <div className='flex items-start gap-6 text-sm'>
                            <img
                                className='w-16 sm:w-20'
                                src={item.image[0]}
                                alt={`Produs: ${item.name}`}
                                loading="lazy"
                            />
                            <div className='flex flex-col gap-1.5'>
                                <p className='sm:text-base font-medium'>{item.name}</p>
                                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                                    <p>{currency}{item.itemTotal.toFixed(2)}</p>
                                    <p>Cantitate: {item.quantity}</p>
                                </div>
                                <p className='sm:text-base'>Mărimiile: {item.size}</p>
                                <p className='mt-1'>
                                    Data: <span className='text-gray-400'>
                                        {new Date(item.date).toLocaleDateString('ro-RO', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </p>
                                <p className='mt-1'>
                                    Metodă de plată: <span className='text-gray-400'>{item.paymentMethod}</span>
                                </p>
                                {item.orderTotalWithDelivery && (
                                    <p className='mt-1 font-medium text-green-600'>
                                        Total cu livrare: {currency}{item.orderTotalWithDelivery}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className='text-sm text-base'>{item.status}</p>
                            </div>
                            <button
                                onClick={loadOrderData}
                                className='border px-4 py-2 text-sm font-medium rounded-sm'
                            >
                                Stare comandă
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
