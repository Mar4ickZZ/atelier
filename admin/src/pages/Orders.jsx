import React, {useEffect, useState} from 'react';
import axios from "axios";
import {backendUrl, currency} from "../App.jsx";
import {toast} from "react-toastify";
import {assets} from "../assets/assets.js";

const Orders = ({token}) => {

    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {

        if (!token) {
            return null
        }

        try {

            const response = await axios.post(backendUrl + '/api/order/list', {}, {headers: {token}})
            if (response.data.success) {
                setOrders(response.data.orders.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/status', {
                orderId,
                status: event.target.value
            }, {headers: {token}})
            if (response.data.success) {
                await fetchAllOrders()
            }
        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }


useEffect(() => {
    fetchAllOrders()
}, [token]);

return (<div>
    <h3>Pagina de comandă</h3>
    <div>
        {orders.map((order, index) => (<div
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
            key={index}>
            <img className='w-12' src={assets.parcel_icon} alt=""/>
            <div>
                <div>
                    {order.items.map((item, index) => (
                        <p className='py-0.5' key={index}>
                            {item.name} x {item.quantity}
                            <div className='my-2'>Înălțimea: {item.size.split('x')[0]}</div>
                            <div>Lungimea: {item.size.split('x')[1]}</div>
                        </p>

                    ))}
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
                <p>{order.address.email}</p>
            </div>
            <div>
            <p className='text-sm sm:text-[15px]'>Cantitatea : {order.items.length}</p>
                <p className='mt-3'>Metoda de plată : {order.paymentMethod}</p>
                <p>Plată : {order.payment ? 'Făcut' : 'În așteptare'}</p>
                <p>Data : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
            <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Comandă plasată</option>
                <option value="Ambalare">Ambalare</option>
                <option value="Expediat">Expediat</option>
                <option value="În livrare">În livrare</option>
                <option value="Livrat">Livrat</option>
            </select>


        </div>))}
    </div>
</div>)
}

export default Orders;