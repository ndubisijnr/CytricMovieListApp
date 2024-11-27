'use client'

import {useState} from "react";
import Button from "@/components/button/Button";
import Image from "next/image";
import AddMoreMoviesIcon from "../../public/add_icon.png"
import AddLogoutIcon from "../../public/logout.png"
import MovieCard from "../../components/card/MovieCard"
const MovieListPage = () => {
  const [movieResponse, setMovieResponse] = useState({})

  const EmptyState = () => {
    return <div className="lg:w-[591px] mx-auto text-center lg:p-0 p-5">
      <h1 className="header-three lg:header-two mb-10">Your movie list is empty</h1>
      <Button text="Add a new movie" classProps="lg:w-[202px]"/>

    </div>
  }



  const MovieList = () => {
    return <div className="w-full lg:p-20 p-1">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2 justify-center">
          <h2 className="header-five lg:header-three">My movies</h2>
          <Image src={AddMoreMoviesIcon} width={24} height={24} alt="add movie icon"/>
        </div>
        <div className="flex items-center gap-5 justify-center">
          <h2 className="header-six">Logout</h2>
          <Image src={AddLogoutIcon} width={24} height={24} alt="add movie icon"/>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4">
        <MovieCard
            image="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            title="Hell World"
            published="2028"
        />
        <MovieCard
            image="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            title="Another Movie"
            published="2025"
        />
        <MovieCard
            image="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            title="Future Wars"
            published="2030"
        />
        <MovieCard
            image="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            title="Epic Saga"
            published="2024"
        />
        <MovieCard
            image="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            title="Sci-Fi Escape"
            published="2026"
        />
        <MovieCard
            image="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            title="Mystery Journey"
            published="2027"
        />
        <MovieCard
            image="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            title="Time Travelers"
            published="2029"
        />
        <MovieCard
            image="https://i.pinimg.com/236x/06/3b/a1/063ba1c7d298044275b131531222ba14.jpg"
            title="The Last Stand"
            published="2031"
        />
      </div>


    </div>
  }
  return <>
    {!movieResponse ?
        <div className="flex min-h-screen items-center">
          <EmptyState/></div>
        :
        <div className="flex min-h-screen">
          <MovieList/>
        </div>
    }
  </>
};

export default MovieListPage;

