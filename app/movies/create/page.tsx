'use client'
import AddMovieImage from "@/components/form/AddMovieImage";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import {useAppDispatch, useAppSelector} from "@/store/storeHooks";
import {useState} from "react";
import {registerUser} from "@/store/features/auth/authSlice";
import {setCookies} from "@/utils/cookies";
import {createMovie} from "@/store/features/movies/moviesSlice";


const CreateMoviePage = () => {
  const dispatch = useAppDispatch();
  const {loading, error, data } = useAppSelector((state) => state.movies); // Select loading and error from auth state

  const [formData, setFormData] = useState();
  const [errors, setErrors] = useState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { title: "", published: "",coverImage:"" };

    setErrors(newErrors);

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
      setErrors(newErrors);
      return;
    }

    try {
      // Dispatch the loginUser async action to handle the login
      const res = await dispatch(createMovie(formData)).unwrap();
      await setCookies(res.accessToken);

      // Handle successful login (e.g., redirect to a dashboard or home page)
      console.log(res.message);
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
        <Input type={'text'} value={formData.title} onChange={handleInputChange} inputId={'edit-title'} label={"Title"} classProps="w-[356px] h-[45px]"/>
        <Input type={'text'} value={formData.published} onChange={handleInputChange} inputId={'edit-title'} label={"Publishing year"} classProps="w-[261px] h-[45px]"/>
        <div className="w-auto flex items-center w-full gap-5 mt-10">
          <Button text={'Cancel'} classProps="bg-transparent border-2"/>
          <Button text={'Submit'} classProps="" clickEvt={() => handleSubmit}/>
        </div>
      </div>
    </div>
  </div>

};

export default CreateMoviePage;
