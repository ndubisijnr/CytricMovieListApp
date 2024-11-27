'use client'
import AddMovieImage from "@/components/form/AddMovieImage";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

const CreateMoviePage = () => {

  return <div className="w-full min-h-screen overflow-scroll p-20">
    <h1 className="header-two">Create a new movie</h1>

    <div className="flex items-start w-full pt-20 gap-20">
      <AddMovieImage/>
      <div className="w-auto">
        <Input type={'text'} inputId={'edit-title'} label={"Title"} classProps="w-[356px] h-[45px]"/>
        <Input type={'text'} inputId={'edit-title'} label={"Publishing year"} classProps="w-[261px] h-[45px]"/>
        <div className="w-auto flex items-center w-full gap-5 mt-10">
          <Button text={'Cancel'} classProps="bg-transparent border-2"/>
          <Button text={'Submit'} classProps=""/>
        </div>
      </div>
    </div>
  </div>

};

export default CreateMoviePage;
