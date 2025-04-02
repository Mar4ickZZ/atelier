import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import error from "multer/lib/multer-error.js";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: "Utilizatorul nu există"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {

            const token = createToken(user._id)
            res.json({success: true, token})

        } else {
            res.json({success: false, message: 'Nume de utilizator sau parolă incorectă'})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success: false, message: "Utilizatorul există deja"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Vă rugăm să introduceți un e-mail valid"})
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Introduceți vă rugăm o parolă sigură"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Route for admin login
const adminLogin = async (req, res) => {

    try {

        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success:false, message:"Nume de utilizator sau parolă incorectă"})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

export {loginUser, registerUser, adminLogin}