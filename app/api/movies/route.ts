import { generateSlug } from "@/utils/createSlug";
import { db } from "@/utils/db";
import { CreateMovieSchema } from "@/utils/validators/movie.validator";
import { NextResponse } from "next/server";
import { authenticateUser } from "../controllers/auth.controller";

export const GET = async () => {
  try {
    const moviesData = await db.movie.findMany({});
    return NextResponse.json(
      {
        success: true,
        data: moviesData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  // authenticate user

  const authUser = await authenticateUser(req.headers);

  if (!authUser) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthenticated user",
        code:"01"
      },
      { status: 200 }
    );
  }
    console.log('body', req)

    const body = await req.json();


  const validatedData = CreateMovieSchema.safeParse(body);

  if (!validatedData.success) {
    return NextResponse.json(
      {
        success: false,
        message: validatedData.error,
        code:"403"
      },
      { status: 200 }
    );
  }
  const { poster, published, title } = validatedData.data;

  // Check if movie exist
  const movieExist = await db.movie.findFirst({
    where: {
      title: {
        equals: title,
        mode: "insensitive",
      },
      published,
    },
  });

  if (movieExist) {
    return NextResponse.json(
      {
        success: false,
        message: "Movie already exist",
        code:"403"
      },
      { status: 200 }
    );
  }

  // GenerateSlug
  const slug = generateSlug({ title});

  // TODO: Get access token and authenticate user

  // Create Movie
  try {
    const newMovie = await db.movie.create({
      data: {
        poster,
        published,
        slug,
        title,
        ownerId: authUser.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: newMovie,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
