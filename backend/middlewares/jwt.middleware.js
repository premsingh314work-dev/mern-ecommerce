import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey=process.env.SECRET_KEY;

export const GenreateJWT=(payload)=>{
    const token = jwt.sign(payload,secretKey);
    return token;
}
export const Check_JWT= (req, res, next) => {
    const token = req.cookies?.jwt || req.headers["authorization"]?.split(" ")[1]; // Expect "Bearer <token>"

    if (!token){
        return res.status(401).redirect('/sign-in?message=AccessDenied');
    } 
    try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
    } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
    }
};