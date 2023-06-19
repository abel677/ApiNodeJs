import { Router } from "express"
import { login, logout, profile, register } from "../controllers/auth.controller.js"
import { validateToken } from "../middleware/validateToken.js"
import { validateSchema } from '../middleware/validator.middleware.js'
import { registerSchema, loginShema } from '../schemas/auth.schema.js'

const router =  Router()

router.post('/login',validateSchema(loginShema) ,login)
router.post('/register',validateSchema(registerSchema), register)
router.post('/logout',logout)

router.get('/profile',validateToken, profile)

export default router