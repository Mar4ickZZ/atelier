import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Helmet } from "react-helmet";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";

const categoryMapping = {
    Perdele: ['De bumbac', 'De lin', 'Din poliester', 'Cu imprimeuri florale', 'Tul Grek', 'Plissate', 'Din mătase', 'Cu broderii', 'În stil scandinav', 'Tip panel', 'Cu franjuri sau pompom', 'Pentru bucătărie', 'De bumbac', 'Din jacard'],
    Draperii: ['Clasice', 'Din voal', 'Din catifea', 'Cu imprimeuri', 'Blackout', 'Semi-transparente', 'Plissate', 'Cu margini brodate', 'De tip panou'],
    Galerii: ['Din aluminiu', 'Din lemn', 'Din inox', 'Șine pentru draperii (din aluminiu)', 'Șine telescopice', 'Șine motorizate', 'Șine ascunse (tip suspendat)', 'Tip tub', 'Cu prinderi decorative', 'Cu suporturi ascunse', 'cu finisaje cromate', 'Șine cu role', 'Șine pentru draperii tip Wave', 'Șine cu prinderi cu cleme', 'Cu sistem de fixare pe perete', 'Pentru feronerie decorativă', 'Șine drepte sau curbate', 'Șine cu motorizare prin telecomanda'],
    Accesorii: ['Franjuri', 'Inele pentru galerii', 'Cleme pentru draperii', 'Cartele pentru draperii', 'Franjuri decorative', 'Panglici pentru draperii', 'Rejansa'],
    Fețe: ['Fețe de masă din bumbac', 'Fețe de masă impermeabile'],
    Perne: ['Perne decorative', 'Perne ortopedice']
};

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const availableSubCategories = useMemo(() =>
            category.flatMap(cat => categoryMapping[cat] || []),
        [category]
    );

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (showSearch && search) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category.length > 0) {
            result = result.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            result = result.filter(item => subCategory.includes(item.subCategory));
        }

        // Apply sorting
        if (sortType === "price_asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortType === "price_desc") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, category, subCategory, search, showSearch, sortType]);

    const toggleCategory = (value) => {
        setCategory(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (value) => {
        setSubCategory(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    return (
        <main className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            <Helmet>
                <title>Toată colecția - Atelier Maria</title>
                <meta name="description" content="Descoperă colecția completă de perdele, draperii, galerii și accesorii de la Atelier Maria. Produse de calitate premium pentru orice stil de interior." />
            </Helmet>

            {/* Фильтры */}
            <aside className="min-w-60">
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className="my-2 text-xl flex items-center cursor-pointer gap-2"
                >
                    SORTARE
                    <img
                        className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
                        src={assets.dropdown_icon}
                        alt="Toggle Filter"
                    />
                </p>

                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORII</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {Object.keys(categoryMapping).map(cat => (
                            <label key={cat} className="flex gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={cat}
                                    checked={category.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                    className="w-3"
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TIP</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {availableSubCategories.map(subCat => (
                            <label key={subCat} className="flex gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={subCat}
                                    checked={subCategory.includes(subCat)}
                                    onChange={() => toggleSubCategory(subCat)}
                                    className="w-3"
                                />
                                {subCat}
                            </label>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Продукты */}
            <section className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1="TOATĂ" text2="COLECȚIA" />

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="text-sm border border-gray-300 px-2 py-1"
                        aria-label="Sortează produsele"
                    >
                        <option value="relevant">Relevanță</option>
                        <option value="price_asc">Preț crescător</option>
                        <option value="price_desc">Preț descrescător</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filteredProducts.map(item => (
                        <ProductItem
                            key={item._id}
                            name={item.name}
                            id={item._id}
                            image={item.image}
                            price={`${item.price}/metru`}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Collection;
