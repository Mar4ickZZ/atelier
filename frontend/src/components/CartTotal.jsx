import React, { useContext } from 'react';
import shopContext, { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount, cartItems, products } = useContext(ShopContext);

    // Функция для расчета общей стоимости с учетом длины
    const calculateTotal = () => {
        let total = 0;

        // Проходим по всем товарам в корзине
        for (const itemId in cartItems) {
            const itemData = products.find((product) => product._id === itemId); // Получаем данные товара
            if (!itemData) continue; // Если товар не найден, пропускаем

            // Для каждого размера (в вашем случае sizeL или sizeH)
            for (const size in cartItems[itemId]) {
                const pricePerMeter = itemData.price; // Цена за 100 см
                const lengthFactor = parseInt(size) / 100; // Преобразуем длину в коэффициент
                total += cartItems[itemId][size] * pricePerMeter * lengthFactor; // Добавляем стоимость
            }
        }

        return total;
    };

    const subtotal = calculateTotal();
    const total = subtotal + (subtotal > 0 ? delivery_fee : 0);

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'TOTAL'} text2={'CĂRUCIOR'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Taxa de livrare</p>
                    <p>{currency} {subtotal > 0 ? delivery_fee.toFixed(2) : '0.00'}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency}{total.toFixed(2)}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
