import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";

const categoryMapping = {
    Perdele: ['De bumbac', 'De lin', 'Din poliester', 'Cu imprimeuri florale', 'Tul Grek', 'Plissate', 'Din mătase', 'Cu broderii', 'În stil scandinav', 'Tip panel', 'Cu franjuri sau pompom', 'Pentru bucătărie', 'De bumbac', 'Din jacard'],
    Draperii: ['Clasice', 'Din voal', 'Din catifea', 'Cu imprimeuri', 'Blackout', 'Semi-transparente', 'Plissate', 'Cu margini brodate', 'De tip panou'],
    Galerii: ['Din aluminiu', 'Din lemn', 'Din inox', 'Șine pentru draperii (din aluminiu)', 'Șine telescopice', 'Șine motorizate', 'Șine ascunse (tip suspendat)', 'Tip tub', 'Cu prinderi decorative', 'Cu suporturi ascunse', 'cu finisaje cromate', 'Șine cu role', 'Șine pentru draperii tip Wave', 'Șine cu prinderi cu cleme', 'Cu sistem de fixare pe perete', 'Pentru feronerie decorativă', 'Șine drepte sau curbate', 'Șine cu motorizare prin telecomanda'],
    Accesorii: ['Franjuri', 'Inele pentru galerii', 'Cleme pentru draperii', 'Cartele pentru draperii', 'Franjuri decorative', 'Panglici pentru draperii', 'Rejansa' ],
    Fețe: ['Fețe de masă din bumbac', 'Fețe de masă impermeabile'],
    Perne: ['Perne decorative', 'Perne ortopedice']
};

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');
    const [availableSubCategories, setAvailableSubCategories] = useState([]);

    useEffect(() => {
        let updatedSubCategories = [];
        category.forEach(cat => {
            if (categoryMapping[cat]) {
                updatedSubCategories = [...updatedSubCategories, ...categoryMapping[cat]];
            }
        });
        setAvailableSubCategories(updatedSubCategories);
        setSubCategory(prev => prev.filter(sub => updatedSubCategories.includes(sub)));
    }, [category]);

    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        setFilterProducts(productsCopy);
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products]);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>SORTARE
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=""/>
                </p>
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORII</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        {Object.keys(categoryMapping).map(cat => (
                            <p key={cat} className='flex gap-2'>
                                <input className='w-3' type="checkbox" value={cat} onChange={toggleCategory}/> {cat}
                            </p>
                        ))}
                    </div>
                </div>

                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TIP</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        {availableSubCategories.map(subCat => (
                            <p key={subCat} className='flex gap-2'>
                                <input className='w-3' type="checkbox" value={subCat} onChange={toggleSubCategory}/> {subCat}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'TOATĂ'} text2={'COLECȚIA'} />
                    <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                        <option value="relavent">Sortează după: Relevant</option>
                        <option value="low-high">Sortează după: Preț crescător</option>
                        <option value="high-low">Sortează după: Preț descrescător</option>
                    </select>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {filterProducts.map((item, index) => (
                        <ProductItem key={index} name={item.name} id={item._id} image={item.image} price={`${item.price}/metru`} />

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
