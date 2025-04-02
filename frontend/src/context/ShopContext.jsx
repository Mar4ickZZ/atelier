import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'RON ';
    const delivery_fee = 20;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, sizesH, sizesL) => {
        if (!sizesH || !sizesL) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        const sizeKey = `${sizesH}x${sizesL}`; // Объединяем размеры в один ключ
        cartData[itemId][sizeKey] = (cartData[itemId][sizeKey] || 0) + 1;

        setCartItems(cartData);

        console.log("Cart after adding:", cartData); // Проверка, что добавляется правильно

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, sizesH, sizesL }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };


    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                totalCount += cartItems[items][size] || 0;
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, sizesH, sizesL, quantity) => {
        let cartData = structuredClone(cartItems);
        const sizeKey = `${sizesH}x${sizesL}`;

        if (cartData[itemId]?.[sizeKey] !== undefined) {
            cartData[itemId][sizeKey] = quantity;
        }

        setCartItems(cartData);

        console.log("Cart after update:", cartData); // Проверка

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, sizesH, sizesL, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;
            for (const size in cartItems[items]) {
                totalAmount += (itemInfo.price || 0) * (cartItems[items][size] || 0);
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
