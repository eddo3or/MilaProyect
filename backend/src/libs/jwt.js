//Se importa el archivo dotenv donde se encuentra el valor TOKEN_SECRET
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

// Se exporta una función que puede usarse de forma asíncrona
// para crear un AccessToken cuando se quiera
export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1h"
            },
            (err, token) => {
                if (err) reject(err)
                else resolve(token)
            }
        );
    });
}

export function createToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {
                expiresIn: "600s"
            },
            (err, token) => {
                if (err) reject(err)
                else resolve(token)
            }
        );
    });
}

export function validateToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) reject("token inválido");
            else resolve(decoded);
        });
    });
}
