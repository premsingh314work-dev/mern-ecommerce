import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey=process.env.SECRET_KEY;

export const GenreateJWT=(payload)=>{
    const token = jwt.sign(payload,secretKey);
    return token;
}
const CheckJWT=()=>{

}