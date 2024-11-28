'use client'
import AddMovieImage from "@/components/form/AddMovieImage";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import {useAppSelector} from "@/store/storeHooks";
import React, {useState} from "react";

const CreateMoviePage = () => {
  const { } = useAppSelector((state) => state.movies); // Select loading and error from auth state

  const [formData, setFormData] = useState({ title: "", published: "",coverImage:"" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { title: "", published: "",coverImage:"" };

    if (!formData.title) {
      newErrors.title = "title is required";
    }

    if (!formData.published) {
      newErrors.published = "published is required";
    }

    if (!formData.coverImage) {
      newErrors.coverImage = "coverImage is required";
    }

    if (newErrors.title || newErrors.published || newErrors.coverImage) {
      return;
    }

    try {

    } catch (err) {
      // Handle error if login fails
      console.log(err)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return <div className="w-full min-h-screen overflow-scroll p-20">
    <h1 className="header-two">Create a new movie</h1>

    <div className="flex items-start w-full pt-20 gap-20">
      <AddMovieImage/>
      <div className="w-auto">
        <Input type={'text'} value={formData.title} onChange={handleInputChange} inputId={'create-title'} label={"Title"} classProps="w-[356px] h-[45px]" name={'title'}/>
        <Input type={'text'} value={formData.published} onChange={handleInputChange} inputId={'create-publishing'} label={"Publishing year"} classProps="w-[261px] h-[45px]" name={'publishing year'}/>
        <div className="w-auto flex items-center w-full gap-5 mt-10">
          <Button text={'Cancel'} classProps="bg-transparent border-2"/>
          <Button text={'Submit'} classProps="" clickEvt={() => handleSubmit}/>
        </div>
      </div>
    </div>
  </div>

};

export default CreateMoviePage;
