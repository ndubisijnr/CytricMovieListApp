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
import Input from "@/components/input/Input";

const HomePage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();


    const { data:movies, loading } = useAppSelector((state) => state.movies);

    // const {} = data || [];  Fallback to an empty array if data is undefined
    console.log(movies)


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Access `movies.data` for slicing
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = movies?.slice(startIndex, startIndex + itemsPerPage) || [];

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
        <div className="w-full lg:p-20">
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
                <div className="flex justify-center items-start gap-5">
                    <Input type={'search'} name={'search'} inputId={'search_id'} onChange={() => {}} value={''} classProps={''} error={''} label={'search for movie'} />
                    <div className="flex gap-5">
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
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5 pb-5">
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
                totalItems={movies?.length || 0}
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
            {!movies?.length ? (
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
