import { db } from "@/utils/db";
import { EditMovieSchema } from "@/utils/validators/movie.validator";
import { NextResponse } from "next/server";
import { authenticateUser } from "../../controllers/auth.controller";

type Params = Promise<{ slug: string }>;
export const GET = async (req: Request, segmentData: { params: Params }) => {
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

  const { slug } = await segmentData.params;

  try {
    const movieData = await db.movie.findUnique({
      where: { slug },
    });

    if (movieData === null) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: movieData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: Request, segmentData: { params: Params }) => {
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

  const { slug } = await segmentData.params;

  const body = await req.json();

  const validatedData = EditMovieSchema.safeParse(body);

  if (!validatedData.success) {
    return NextResponse.json(
      {
        success: false,
        message: validatedData.error,
      },
      { status: 403 }
    );
  }
  const { poster, published, title } = validatedData.data;

  try {
    const movieData = await db.movie.findUnique({
      where: { slug, ownerId: authUser.id },
    });

    if (movieData === null) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: {
          title: title ?? movieData.title,
          poster: poster ?? movieData.poster,
          published: published ?? movieData.published,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, segmentData: { params: Params }) => {
  const { slug } = await segmentData.params;

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
    // Find movie to delete
    const movieToDelete = await db.movie.findUnique({
      where: {
        slug,
        ownerId: authUser.id,
      },
    });

    if (!movieToDelete) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie not found",
        },
        { status: 404 }
      );
    }

    const deletedMovie = await db.movie.delete({
      where: {
        id: movieToDelete.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: deletedMovie,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
