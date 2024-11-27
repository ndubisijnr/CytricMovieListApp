import { validatePassword } from "@/utils/password";
import { generateToken } from "@/utils/tokenizer";
import { AuthSchema } from "@/utils/validators/user.validator";
import { getUserByEmail } from "../controllers/user.controllers";

export const POST = async (req: Request) => {
  const body = await req.json();

  const validatedData = AuthSchema.safeParse(body);

  if (!validatedData.success) {
    return Response.json(
      {
        success: false,
        message: validatedData.error,
      },
      { status: 403 }
    );
  }

  const { email, password } = validatedData.data;

  try {
    // Check if user with email exist
    const userExist = await getUserByEmail(email);
    if (!userExist) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const isValidPassword = await validatePassword({
      password,
      hashPassword: userExist.password,
    });

    if (!isValidPassword) {
      return Response.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 403 }
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
        message: "User logged in successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
