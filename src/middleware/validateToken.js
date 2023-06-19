import jwt from 'jsonwebtoken'
import { TOKEN_SECRECT } from '../config/config.js';
export const validateToken = (req, res, next) => {

    const  { token }  = req.cookies;
    if(!token) return res.status(401).json({ response: "No autorizado"})
    jwt.verify(token, TOKEN_SECRECT, (err, decode) => {
        if(err) return res.status(403).json({ response: "Token inválido"})
        req.user = decode
    })
    next()
}