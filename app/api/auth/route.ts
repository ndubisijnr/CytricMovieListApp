import {getPasswordHash, validatePassword} from "@/utils/password";
import { generateToken } from "@/utils/tokenizer";
import { AuthSchema } from "@/utils/validators/user.validator";
import { getUserByEmail } from "../controllers/user.controllers";
import {createUser} from "@/utils/createUser";

export const POST = async (req: Request) => {
  const body = await req.json();

  const validatedData = AuthSchema.safeParse(body);

  if (!validatedData.success) {
    return Response.json(
      {
        success: false,
        message: validatedData.error,
        code:"01"
      },
      { status: 200 }
    );
  }

  const { email, password } = validatedData.data;

  try {
      // Check if user with email exist
    const userExist = await getUserByEmail(email) || undefined;

    if(userExist) {
        const isValidPassword = await validatePassword({
            password,
            hashPassword: userExist.password,
        });

        if (!isValidPassword) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid Password",
                    code:"01"
                },
                { status: 200 }
            );
        }

        const accessToken = await generateToken({
            id: userExist.id,
            email: userExist.email,
        });

        return Response.json(
            {
                success: true,
                accessToken,
                user: {
                    id: userExist.id,
                    email: userExist.email,
                },
                message: "User logged in successfully",
                code:"00"
            },
            { status: 200 }
        );
    }

    else{
        // Hash the password
        const passwordHash = await getPasswordHash(password);
        const newUser = await createUser({email, passwordHash});

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
            { status: 200 }
        );
    }

  } catch (err) {
    console.log(err);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
        code:"500"
      },
      { status: 200 }
    );
  }
};
