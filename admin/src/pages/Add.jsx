import React, {useState} from 'react';
import {assets} from "../assets/assets.js";
import axios from 'axios'
import {backendUrl} from "../App.jsx"
import {toast} from "react-toastify";

const Add = ({token}) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] =  useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Perdele")
    const [subCategory, setSubCategory] = useState("De Bumbac")
    const [bestseller, setBestseller] = useState(false)
    const [sizesL, setSizesL] = useState([])
    const [sizesH, setSizesH] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizesL", JSON.stringify(sizesL))
            formData.append("sizesH", JSON.stringify(sizesH))


            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})

            if (response.data.succes) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Încărcați imaginea</p>

                <div className='flex gap-2'>
                    <label htmlFor='image1'>
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=""/>
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden/>
                    </label>

                    <label htmlFor='image2'>
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=""/>
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden/>
                    </label>

                    <label htmlFor='image3'>
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=""/>
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden/>
                    </label>

                    <label htmlFor='image4'>
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=""/>
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden/>
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Numele produsului</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2'
                       type="text" placeholder='Tastați aici' required/>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Descriere produs</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                          className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Scrieți conținut aici'
                          required/>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

                <div>
                    <p className='mb-2'>Categoria de produse</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Perdele">Perdele</option>
                        <option value="Draperii">Draperii</option>
                        <option value="Galerii">Galerii</option>
                        <option value="Accesorii">Accesorii</option>
                        <option value="Fețe">Fețe</option>
                        <option value="Perne">Perne</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Subcategoria</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="De bumbac">De bumbac</option>
                        <option value="De lin">De lin</option>
                        <option value="Din poliester">Din poliester</option>
                        <option value="Cu imprimeuri florale">Cu imprimeuri florale</option>
                        <option value="Tul Grek">Tul Grek</option>
                        <option value="Plissate">Plissate</option>
                        <option value="Din mătase">Din mătase</option>
                        <option value="Cu broderii">Cu broderii</option>
                        <option value="În stil scandinav">În stil scandinav</option>
                        <option value="Tip panel">Tip panel</option>
                        <option value="Cu franjuri sau pompom">Cu franjuri sau pompom</option>
                        <option value="Pentru bucătărie">Pentru bucătărie</option>
                        <option value="Din jacard">Din jacard</option>

                        <option value="Clasice">Clasice</option>
                        <option value="Din voal">Din voal</option>
                        <option value="Din catifea">Din catifea</option>
                        <option value="Cu imprimeuri">Cu imprimeuri</option>
                        <option value="Blackout">Blackout</option>
                        <option value="Semi-transparente">Semi-transparente</option>
                        <option value="Plissate">Plissate</option>
                        <option value="Cu margini brodate">Cu margini brodate</option>
                        <option value="De tip panou">De tip panou</option>

                        <option value="Din aluminiu">Din aluminiu</option>
                        <option value="Din lemn">Din lemn</option>
                        <option value="Din inox">Din inox</option>
                        <option value="Șine pentru draperii (din aluminiu)">Șine pentru draperii (din aluminiu)</option>
                        <option value="Șine telescopice">Șine telescopice</option>
                        <option value="Șine motorizate">Șine motorizate</option>
                        <option value="Șine ascunse (tip suspendat)">Șine ascunse (tip suspendat)</option>
                        <option value="Tip tub">Tip tub</option>
                        <option value="Cu prinderi decorative">Cu prinderi decorative</option>
                        <option value="Cu suporturi ascunse">Cu suporturi ascunse</option>
                        <option value="cu finisaje cromate">cu finisaje cromate</option>
                        <option value="Șine cu role">Șine cu role</option>
                        <option value="Șine pentru draperii tip Wave">Șine pentru draperii tip Wave</option>
                        <option value="Șine cu prinderi cu cleme">Șine cu prinderi cu cleme</option>
                        <option value="Cu sistem de fixare pe perete">Cu sistem de fixare pe perete</option>
                        <option value="Pentru feronerie decorativă">Pentru feronerie decorativă</option>
                        <option value="Șine drepte sau curbate">Șine drepte sau curbate</option>
                        <option value="Șine cu motorizare prin telecomanda">Șine cu motorizare prin telecomanda</option>

                        <option value="Franjuri">Franjuri</option>
                        <option value="Inele pentru galerii">Inele pentru galerii</option>
                        <option value="Cleme pentru draperii">Cleme pentru draperii</option>
                        <option value="Cartele pentru draperii">Cartele pentru draperii</option>
                        <option value="Franjuri decorative">Franjuri decorative</option>
                        <option value="Panglici pentru draperii">Panglici pentru draperii</option>
                        <option value="Rejansa">Rejansa</option>

                        <option value="Fețe de masă din bumbac">Fețe de masă din bumbac</option>
                        <option value="Fețe de masă impermeabile">Fețe de masă impermeabile</option>

                        <option value="Perne decorative">Perne decorative</option>
                        <option value="Perne ortopedice">Perne ortopedice</option>

                    </select>
                </div>

                <div>
                    <p className='mb-2'>Prețul produsului</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price}
                           className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25'/>
                </div>

            </div>

            <div>
                <p className='mb-2'>Lungime</p>
                <div className='flex gap-3'>
                    <div
                        onClick={() => setSizesL(prev => prev.includes('100cm') ? prev.filter(item => item !== "100cm") : [...prev, "100cm"])}>
                        <p className={`${sizesL.includes("100cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>100cm</p>
                    </div>

                    <div
                        onClick={() => setSizesL((prev) => prev.includes('150cm') ? prev.filter(item => item !== "150cm") : [...prev, "150cm"])}>
                        <p className={`${sizesL.includes("150cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>150cm</p>
                    </div>

                    <div
                        onClick={() => setSizesL((prev) => prev.includes('200cm') ? prev.filter(item => item !== "200cm") : [...prev, "200cm"])}>
                        <p className={`${sizesL.includes("200cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>200cm</p>
                    </div>

                    <div
                        onClick={() => setSizesL((prev) => prev.includes('250cm') ? prev.filter(item => item !== "250cm") : [...prev, "250cm"])}>
                        <p className={`${sizesL.includes("250cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>250cm</p>
                    </div>

                    <div
                        onClick={() => setSizesL((prev) => prev.includes('300cm') ? prev.filter(item => item !== "300cm") : [...prev, "300cm"])}>
                        <p className={`${sizesL.includes("300cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>300cm</p>
                    </div>

                    <div
                        onClick={() => setSizesL((prev) => prev.includes('400cm') ? prev.filter(item => item !== "400cm") : [...prev, "400cm"])}>
                        <p className={`${sizesL.includes("400cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>400cm</p>
                    </div>

                </div>
            </div>

            <div>
                <p className='mb-2'>Înălțime</p>
                <div className='flex gap-3'>
                    <div
                        onClick={() => setSizesH(prev => prev.includes('100cm') ? prev.filter(item => item !== "100cm") : [...prev, "100cm"])}>
                        <p className={`${sizesH.includes("100cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>100cm</p>
                    </div>

                    <div
                        onClick={() => setSizesH((prev) => prev.includes('150cm') ? prev.filter(item => item !== "150cm") : [...prev, "150cm"])}>
                        <p className={`${sizesH.includes("150cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>150cm</p>
                    </div>

                    <div
                        onClick={() => setSizesH((prev) => prev.includes('200cm') ? prev.filter(item => item !== "200cm") : [...prev, "200cm"])}>
                        <p className={`${sizesH.includes("200cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>200cm</p>
                    </div>

                    <div
                        onClick={() => setSizesH((prev) => prev.includes('250cm') ? prev.filter(item => item !== "250cm") : [...prev, "250cm"])}>
                        <p className={`${sizesH.includes("250cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>250cm</p>
                    </div>

                    <div
                        onClick={() => setSizesH((prev) => prev.includes('300cm') ? prev.filter(item => item !== "300cm") : [...prev, "300cm"])}>
                        <p className={`${sizesH.includes("300cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>300cm</p>
                    </div>

                    <div
                        onClick={() => setSizesH((prev) => prev.includes('400cm') ? prev.filter(item => item !== "400cm") : [...prev, "400cm"])}>
                        <p className={`${sizesH.includes("400cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>400cm</p>
                    </div>

                </div>
            </div>


            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox"
                       id='bestseller'/>
                <label className='cursor-pointer' htmlFor="bestseller">Adaugă la bestseller</label>
            </div>

            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADAUGĂ</button>
        </form>
    );
};


export default Add;