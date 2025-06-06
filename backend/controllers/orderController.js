import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

// global variables
const currency = 'RON';
const deliveryCharge = 20;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to calculate total order price
const calculateTotal = (items) => {
    let total = 0;

    items.forEach(item => {
        const pricePerMeter = item.price; // Цена за 100 см
        const lengthFactor = parseInt(item.size) / 100;
        total += item.quantity * pricePerMeter * lengthFactor;
    });

    return total;
};

// Placing orders using COD Method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success: true, message: "Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }

}


// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        const subtotal = calculateTotal(items);
        const amount = subtotal + (subtotal > 0 ? deliveryCharge : 0);

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Card",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: (item.price * (parseInt(item.size) / 100)) * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Taxe de livrare"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `https://atelier-maria.ro/orders?success=true&orderId=${newOrder._id}`,
            cancel_url: `https://atelier-maria.ro/orders?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });


        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// User Order Data For Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Stare actualizată' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };