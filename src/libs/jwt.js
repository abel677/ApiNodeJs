import  Jwt  from "jsonwebtoken"
import { TOKEN_SECRECT } from "../config/config.js"

export async function createAccessToken(payload){
    return new Promise ((resolve, reject) => {
        Jwt.sign(
            payload,
            TOKEN_SECRECT, 
            { 
                expiresIn: "1d"
            },
            (err, token)=>{
            if(err) reject(err)
            resolve(token)
        })
    })
}