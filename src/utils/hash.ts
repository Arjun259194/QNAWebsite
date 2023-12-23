import { compare, hash } from "bcrypt";

export async function hashPassword(password: string) {
    const SALT_ROUND = 10;
    return await hash(password, SALT_ROUND);
}

export async function checkPassword(password: string, hash: string) {
    return await compare(password, hash);
}
