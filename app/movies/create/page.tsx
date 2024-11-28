'use client'
import AddMovieImage from "@/components/form/AddMovieImage";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import {useAppSelector} from "@/store/storeHooks";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

const CreateMoviePage = () => {

  const router = useRouter();
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

  return <div className="w-full min-h-screen overflow-scroll lg:p-20 p-5">
    <h1 className="lg:header-two header-four">Create a new movie</h1>

    <div className="flex items-start flex-col lg:flex-row w-full pt-10 gap-20">
      <AddMovieImage/>
      <div className="relative w-full lg:w-1/4">
        <Input type={'text'} value={formData.title} onChange={handleInputChange} inputId={'create-title'} label={"Title"} classProps="lg:w-[356px] h-[45px]" name={'title'}/>
        <Input type={'text'} value={formData.published} onChange={handleInputChange} inputId={'create-publishing'} label={"Publishing year"} classProps="lg:w-[261px] h-[45px]" name={'publishing year'}/>
        <div className="flex items-center w-full lg:w-auto gap-5 mt-15">
          <Button text={'Cancel'} classProps="bg-transparent border-2" clickEvt={() => router.push('/')}/>
          <Button text={'Submit'} classProps="" clickEvt={() => handleSubmit}/>
        </div>
      </div>
    </div>
  </div>

};

export default CreateMoviePage;
