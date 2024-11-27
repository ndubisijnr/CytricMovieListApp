import { db } from "@/utils/db";
import { getPasswordHash } from "@/utils/password";
import { generateToken } from "@/utils/tokenizer";
import { UserSchema } from "@/utils/validators/user.validator";
import { getUserByEmail } from "../controllers/user.controllers";

export const POST = async (req: Request) => {
  const body = await req.json();

  const validatedData = UserSchema.safeParse(body);

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
    if (userExist) {
      return Response.json(
        {
          success: false,
          message: "User exist",
        },
        { status: 403 }
      );
    }

    const passwordHash = await getPasswordHash(password);

    const newUser = await db.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });

    const accessToken = await generateToken({
      id: newUser.id,
      email: newUser.email,
    });

    return Response.json(
      {
        success: true,
        accessToken,
        user: {
          id: newUser.id,
          email: newUser.email,
        },
        message: "User created successfully",
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
