import { db } from "@/utils/db";
import { NextResponse } from "next/server";
import { authenticateUser } from "../../controllers/auth.controller";

type Params = Promise<{ slug: string }>;
export const GET = async (_: Request, segmentData: { params: Params }) => {
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

export const DELETE = async (req: Request, segmentData: { params: Params }) => {
  const { slug } = await segmentData.params;

  // TODO: Get access token and authenticate user
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing access token",
      },
      { status: 401 }
    );
  }

  const authUser = await authenticateUser(token);

  console.log(authUser);

  if (!authUser) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing access token",
      },
      { status: 401 }
    );
  }

  try {
    const deletedMovie = await db.movie.delete({
      where: {
        slug,
        ownerId: authUser.id,
      },
    });

    if (deletedMovie === null) {
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
