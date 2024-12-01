'use client'
import AddMovieImage from "@/components/form/AddMovieImage";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import {useAppSelector, useAppDispatch} from "@/store/storeHooks";
import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {editMovie} from "@/store/features/movies/moviesSlice";


const EditMoviePage = () => {
  const router = useRouter();
  const query = useSearchParams().get('name');

  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state.movies); // Select loading and error from auth state
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({id: "", title: "", published: "", poster: ""});
  const [errors, setErrors] = useState({title: "", published: "", poster: ""});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({title: "", published: "", poster: ""});

    // Validate form fields
    const newErrors = {title: "", published: "", poster: ""};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.published.trim()) {
      newErrors.published = "Published year is required";
    }

    if (!value.trim()) {
      newErrors.poster = "Poster is required";
    }

    if (newErrors.title || newErrors.published || newErrors.poster) {
      setErrors(newErrors);
      return;
    }

    try {
      // Update poster value in formData
      const updatedFormData = {...formData, poster: value};

      // Dispatch action
      const result = await dispatch(editMovie({slug: "", updates: updatedFormData})).unwrap();

      if (editMovie.fulfilled.match(result)) {
        // Clear form after successful submission
        console.log("Movie created successfully", result.payload);
        setFormData({id: "", title: "", published: "", poster: ""});
        setValue(""); // Clear poster input if applicable
      } else {
        console.error("Movie creation failed", result);
      }
    } catch (err) {
      console.error("An error occurred during submission", err);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({...prevState, [name]: value}));
  };

  return <div className="w-full min-h-screen overflow-scroll lg:p-20 p-5">
    <h1 className="lg:header-two header-four">Edit {query}</h1>
    <div className="flex items-start flex-col lg:flex-row w-full pt-10 gap-20">
      <AddMovieImage setValue={setValue}/>
      <div className="relative w-full lg:w-1/4">
        <Input type={'text'} error={errors.title} value={formData.title} onChange={handleEditInputChange}
               inputId={'edit-title'} label={"Title"} classProps="lg:w-[356px] h-[45px]" name={'title'}/>
        <Input
            type="text"
            error={errors.published}
            value={formData.published}
            onChange={handleEditInputChange}
            inputId="create-publishing"
            label="Publishing year"
            classProps="lg:w-[261px] h-[45px]"
            name="published"
        />
        <div className="flex items-center w-full lg:w-auto gap-5 mt-15">
          <Button text={'Cancel'} classProps="bg-transparent border-2" clickEvt={() => router.push('/')}/>
          <Button text={'Submit'} classProps="" clickEvt={() => handleSubmit}/>
        </div>

      </div>
    </div>
  </div>


};

export default EditMoviePage;
