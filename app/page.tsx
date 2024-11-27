"use client";

import Button from "@/components/button/Button";
import MovieCard from "@/components/card/MovieCard";
import { fetchMovies } from "@/store/features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import Image from "next/image";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [movieResponse, setMovieResponse] = useState({});

  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (data) {
    console.log(data);
  }

  const EmptyState = () => {
    return (
      <div className="lg:w-[591px] mx-auto text-center lg:p-0 p-5">
        <h1 className="header-three lg:header-two mb-10">
          Your movie list is empty
        </h1>
        <Button text="Add a new movie" classProps="lg:w-[202px]" />
      </div>
    );
  };

  const MovieList = () => {
    return (
      <div className="w-full lg:p-20 p-1">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 justify-center">
            <h2 className="header-five lg:header-three">My movies</h2>
            <Image
              src="/add_icon.png"
              width={24}
              height={24}
              alt="add movie icon"
            />
          </div>
          <div className="flex items-center gap-5 justify-center">
            <h2 className="header-six">Logout</h2>
            <Image
              src="/logout.png"
              width={24}
              height={24}
              alt="add movie icon"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4">
          <MovieCard
            coverImage="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            slug="wdhs"
            title="Hell World"
            published={2025}
          />
          <MovieCard
            coverImage="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            slug="wdhs"
            title="Another Movie"
            published={2024}
          />
          <MovieCard
            coverImage="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            slug="wdhs"
            title="Future Wars"
            published={2024}
          />
          <MovieCard
            coverImage="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            slug="wdhs"
            title="Epic Saga"
            published={2024}
          />
          <MovieCard
            coverImage="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            slug="wdhs"
            title="Sci-Fi Escape"
            published={2024}
          />
          <MovieCard
            coverImage="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            slug="wdhs"
            title="Mystery Journey"
            published={2024}
          />
          <MovieCard
            coverImage="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            slug="wdhs"
            title="Time Travelers"
            published={2024}
          />
          <MovieCard
            coverImage="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            slug="wdhs"
            title="The Last Stand"
            published={2024}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {!movieResponse ? (
        <div className="flex min-h-screen items-center">
          <EmptyState />
        </div>
      ) : (
        <div className="flex min-h-screen">
          <MovieList />
          {/* <AddMovieImage /> */}
        </div>
      )}
    </>
  );
};

export default HomePage;
