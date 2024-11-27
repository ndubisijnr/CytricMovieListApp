import { generateSlug } from "@/utils/createSlug";
import { db } from "@/utils/db";
import { CreateMovieSchema } from "@/utils/validators/movie.validator";
import { NextResponse } from "next/server";
import { authenticateUser } from "../controllers/auth.controller";

export const GET = async (req: Request) => {
  // authenticate user

  const authUser = await authenticateUser(req.headers);

  if (!authUser) {
    return NextResponse.json(
      {
        success: false,
        message: "Unaunthenticated user",
      },
      { status: 401 }
    );
  }

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
        message: "Unaunthenticated user",
      },
      { status: 401 }
    );
  }
  const body = await req.json();

  const validatedData = CreateMovieSchema.safeParse(body);

  if (!validatedData.success) {
    return NextResponse.json(
      {
        success: false,
        message: validatedData.error,
      },
      { status: 403 }
    );
  }
  const { coverImage, published, title } = validatedData.data;

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
      },
      { status: 403 }
    );
  }

  // GenerateSlug
  const slug = generateSlug({ title, year: published.toString() });

  // TODO: Get access token and authenticate user

  // Create Movie
  try {
    const newMovie = await db.movie.create({
      data: {
        coverImage,
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
