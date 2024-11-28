import { getPasswordHash } from "@/utils/password";
import { generateToken } from "@/utils/tokenizer";
import { UserSchema } from "@/utils/validators/user.validator";
import {createUser} from "@/utils/createUser";

export const POST = async (req: Request) => {
    try {
        // Parse and validate request body
        const body = await req.json();
        const validatedData = UserSchema.safeParse(body);

        if (!validatedData.success) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: validatedData.error.issues.map((issue) => issue.message).join(", "),
                }),
                { status: 400 }
            );
        }

        const { email, password } = validatedData.data;


        // Hash the password
        const passwordHash = await getPasswordHash(password);

        // Create new user

        const newUser = await createUser({email, passwordHash})

        // Generate access token
        const accessToken = await generateToken({
            id: newUser.id,
            email: newUser.email,
        });

        // Successful response
        return new Response(
            JSON.stringify({
                success: true,
                accessToken,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                },
                message: "New user created successfully.",
                code: "00",
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in user creation:", error);

        // Internal server error response
        return new Response(
            JSON.stringify({
                success: false,
                message: "Internal server error. Please try again later.",
            }),
            { status: 500 }
        );
    }
};