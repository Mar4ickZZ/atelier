import React, { useContext, useEffect } from 'react';
import { ShopContext } from "../context/ShopContext.jsx";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) return;

            const response = await axios.post(`${backendUrl}/api/order/verifyStripe`, {
                success,
                orderId
            }, {
                headers: { token }
            });

            if (response.data.success) {
                setCartItems({});
                navigate('/orders', { state: { orderSuccess: true } });
            } else {
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return <div className="min-h-[60vh] flex justify-center items-center text-gray-500">Se verifică plata...</div>;
};

export default Verify;
