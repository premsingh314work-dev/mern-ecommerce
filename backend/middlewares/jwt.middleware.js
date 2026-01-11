import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey=process.env.SECRET_KEY;

console.log(secretKey);
const GenreateJWT=(payload)=>{
    const token = jwt.sign(payload,"popli");
    return token;
}

console.log(GenreateJWT({name:'premSingh'}))
const CheckJWT=()=>{

}