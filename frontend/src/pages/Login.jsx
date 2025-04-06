import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    useEffect(() => {
        if (token) navigate("/");
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const endpoint = isRegister ? "/api/user/register" : "/api/user/login";
            const payload = isRegister ? formData : { email: formData.email, password: formData.password };

            const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

            if (data.success) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "A apărut o eroare!");
        }
    };

    return (
        <>
            <Helmet>
                <title>{isRegister ? "Creează cont - Atelier Maria" : "Autentificare - Atelier Maria"}</title>
                <meta
                    name="description"
                    content={
                        isRegister
                            ? "Creează un cont pe Atelier Maria pentru a comanda perdele și draperii personalizate, realizate cu grijă și atenție la detalii."
                            : "Autentifică-te în contul tău Atelier Maria pentru a vizualiza comenzile și produsele preferate."
                    }
                />
            </Helmet>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
                <div className="inline-flex items-center gap-2 mb-2 mt-10">
                    <p className="prata-regular text-3xl">{isRegister ? "Creează cont" : "Autentificare"}</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>

                {isRegister && (
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 border border-gray-800"
                        placeholder="Nume"
                        required
                    />
                )}

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 border border-gray-800"
                    placeholder="Email"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 border border-gray-800"
                    placeholder="Parolă"
                    required
                />

                <div className="w-full flex justify-between text-sm mt-[-8px]">
                    <p onClick={() => setIsRegister(!isRegister)} className="cursor-pointer">
                        {isRegister ? "Autentificare" : "Creează cont"}
                    </p>
                </div>

                <button className="bg-black text-white font-light px-8 py-2 mt-4">
                    {isRegister ? "Creează cont" : "Intră în cont"}
                </button>
            </form>
        </>
    );
};

export default Login;
