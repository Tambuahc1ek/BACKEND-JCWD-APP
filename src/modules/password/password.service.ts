import { compare, hash } from "bcrypt";

export class PasswordService {
    hashPassword = async (password: string) =>  {
        const salt = 10; // You can adjust the salt rounds as needed
        return await hash(password, salt);
    }

    comparePasswords = async (plainPassword: string, hashedPassword: string) => {
        return await compare(plainPassword, hashedPassword)
    }
}