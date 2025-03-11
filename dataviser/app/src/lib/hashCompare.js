/* améliorer la fonction */
import bcrypt from "bcryptjs";

export async function hashCompare(password, hash){
    return bcrypt.compare(password, hash);
}