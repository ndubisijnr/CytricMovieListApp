"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Button from "@/components/button/Button";
import MovieCard from "@/components/card/MovieCard";
import Pagination from "@/components/pagination/Pagination";

import { fetchMovies } from "@/store/features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { removeCookies } from "@/utils/cookies";

const HomePage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    interface MoviesState {
        data: Movie[]; // Array of movie objects
        loading: boolean; // Loading state
    }

    interface Movie {
        id: string;
        title: string;
        slug: string;
        poster: string;
        published: string;
    }

    const { data, loading } = useAppSelector((state: { movies: MoviesState }) => state.movies);

    const movies = data || []; // Fallback to an empty array if data is undefined

    console.log("Movies:", movies);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Access `movies.data` for slicing
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = movies?.data?.slice(startIndex, startIndex + itemsPerPage) || [];

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const logout = async () => {
        await removeCookies();
        router.push("/auth/signin");
    };

    const EmptyState = () => (
        <div className="lg:w-[591px] mx-auto text-center lg:p-0 p-5">
            <h1 className="header-three lg:header-two mb-10">Your movie list is empty</h1>
            <Button
                clickEvt={() => router.push("/movies/create")}
                text="Add a new movie"
                classProps="lg:w-[202px]"
            />
        </div>
    );

    const MovieList = () => (
        <div className="w-full lg:p-20 p-1">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                    <h2 className="header-five lg:header-three">My movies</h2>
                    <Image
                        src="/add_icon.png"
                        width={24}
                        height={24}
                        alt="add movie icon"
                        className="cursor-pointer"
                        onClick={() => router.push("/movies/create")}
                    />
                </div>
                <div className="flex items-center gap-5">
                    <h2 className="header-six">Logout</h2>
                    <Image
                        src="/logout.png"
                        width={24}
                        height={24}
                        alt="logout icon"
                        className="cursor-pointer"
                        onClick={logout}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4">
                {currentItems.map((item) => (
                    <MovieCard
                        key={item.id}
                        coverImage={item.poster}
                        slug={item.slug}
                        title={item.title}
                        published={item.published}
                    />
                ))}
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={movies?.data?.length || 0}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-800">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    <p className="text-white text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {!movies?.data?.length ? (
                <div className="flex min-h-screen items-center">
                    <EmptyState />
                </div>
            ) : (
                <div className="flex min-h-screen">
                    <MovieList />
                </div>
            )}
        </>
    );
};

export default HomePage;
