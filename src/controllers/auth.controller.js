import { User } from "../models/user.model.js"
import { Op } from 'sequelize'
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js"

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userFound = await User.findOne({
            where: { email }
        })
        if(!userFound) return res.status(400).json({ response: "Usuario no existe."});
        const isMatch = await bcrypt.compare(password,userFound.password)
        if(!isMatch) return res.status(400).json({ response: "Credenciales inválidas."})
        const token = await createAccessToken({ id: userFound.id })
        res.cookie('token', token)
        res.status(200).json({response:{
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        }})
    } catch (error) {
        res.status(500).json({ response: error.message})
    }
}
export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const passwordHash = await bcrypt.hash(password,10)
        const userFound = await User.findOne({
            where: {
                [Op.or]: [
                  { username },
                  { email }
                ]
            }
        })
        if(userFound) return res.status(404).json({ response: "El usuario ya existe."});
        
        const newUser = await User.create({
            username,
            email,
            password: passwordHash
        });
        const userSave = await newUser.save();
        const token = await createAccessToken({ id: userSave.id })
        res.cookie('token', token)
        res.status(200).json({
            id: userSave.id,
            username: userSave.username,
            email: userSave.email,
            createdAt: userSave.createdAt,
            updatedAt: userSave.updatedAt
        })
    } catch (error) {
        res.status(500).json({ response: error.message})
    }
}
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date()
    })
    res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findOne({ where: { id: req.user.id }})
    if(!userFound) res.status(400).json({ response: "Usuario no existe"})
    res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        state: userFound.state,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}