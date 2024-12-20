'use client'
import AddMovieImage from "@/components/form/AddMovieImage";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import {useAppSelector, useAppDispatch} from "@/store/storeHooks";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {createMovie} from "@/store/features/movies/moviesSlice";

const CreateMoviePage = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { } = useAppSelector((state) => state.movies); // Select loading and error from auth state
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({ title: "", published: "",poster:"" });
  const [errors, setErrors] = useState({title: "", published: "",poster:"" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({ title: "", published: "", poster: "" });

    // Validate form fields
    const newErrors = { title: "", published: "", poster: "" };

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
      setLoading(true)
      const updatedFormData = { ...formData, poster: value };
      console.log("json obj:", updatedFormData)

      // Dispatch action
      const result = await dispatch(createMovie({updates:updatedFormData})).unwrap();
      setLoading(false)

      if (createMovie.fulfilled.match(result)) {
        // Clear form after successful submission
        console.log("Movie created successfully", result.payload);
        setFormData({ title: "", published: "", poster: "" });
        setValue(""); // Clear poster input if applicable
      } else {
        console.error("Movie creation failed", result);
      }
    } catch (err) {
      console.error("An error occurred during submission", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return <div className="w-full min-h-screen overflow-scroll lg:p-20 p-5">
    <h1 className="lg:header-two header-four">Create a new movie</h1>

    <div className="flex items-start flex-col lg:flex-row w-full pt-10 gap-20">
      <AddMovieImage setValue={setValue}/>
      <div className="relative w-full lg:w-1/4">
        <Input type={'text'} error={errors.title} value={formData.title} onChange={handleInputChange} inputId={'create-title'} label={"Title"} classProps="lg:w-[356px] h-[45px]" name={'title'}/>
        <Input
            type="text"
            error={errors.published}
            value={formData.published}
            onChange={handleInputChange}
            inputId="create-publishing"
            label="Publishing year"
            classProps="lg:w-[261px] h-[45px]"
            name="published"
        />
        <div className="flex items-center w-full lg:w-auto gap-5 mt-15">
          <Button disabled={loading}  text={'Cancel'} classProps="bg-transparent border-2 hover:scale-105" clickEvt={() => router.push('/')}/>
          <Button text={loading ? "Loading..." : "Login"} disabled={loading}  classProps="hover:scale-105 hover:bg-green-400" clickEvt={() => handleSubmit}/>
        </div>

      </div>
    </div>
  </div>

};

export default CreateMoviePage;
