import { db } from "@/utils/db";

interface User {
    email: string;
    passwordHash: string;
}
export const createUser = async ({email,passwordHash}:User) => {
    // Create new user
    const newUser = await db.user.create({
        data: {
            email,
            password: passwordHash,
        },
    });
    return newUser;
};
