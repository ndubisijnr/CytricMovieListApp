"use client";

import Button from "@/components/button/Button";
import MovieCard from "@/components/card/MovieCard";
import { fetchMovies } from "@/store/features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import {removeCookies} from "@/utils/cookies";




const HomePage = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.movies);
  const items = Array.from({ length: data.length }, (_, i) => `Item ${i + 1}`); // Example items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Loading Spinner */}
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  }

  async function logout() {
    await removeCookies()
    router.push('/auth/signin');

  }
  const EmptyState = () => {
    return (
        <div className="lg:w-[591px] mx-auto text-center lg:p-0 p-5">
          <h1 className="header-three lg:header-two mb-10">
            Your movie list is empty
          </h1>
          <Button clickEvt={() => router.push('/movies/create',{})} text="Add a new movie" classProps="lg:w-[202px]"/>
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
              className="cursor-pointer"
              onClick={() => router.push('/movies/create')}
            />
          </div>
          <div className="flex items-center gap-5 justify-center">
            <h2 className="header-six">Logout</h2>
            <Image
              src="/logout.png"
              width={24}
              height={24}
              className="cursor-pointer"
              alt="add movie icon"
              onClick={logout}

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
        <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={items.length}
            onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    );
  };

  return (
    <>
      {!data.length ? (
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
