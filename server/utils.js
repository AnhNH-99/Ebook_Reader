import jwt from 'jsonwebtoken';

export function verifyJwtToken(token, secretKey) {
    console.log(token);
    return new Promise((resolve, rejects) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return rejects(error);
            }
            resolve(decoded);
        })
    })
}