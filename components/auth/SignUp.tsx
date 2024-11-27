"use client";
import { registerUser } from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { setCookies } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../button/Button";
import Input from "../input/Input";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth); // Select loading and error from auth state

  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };

    setErrors(newErrors);

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      // Dispatch the loginUser async action to handle the login
      const res = await dispatch(registerUser(formData)).unwrap();
      await setCookies(res.accessToken);

      router.refresh();
    } catch (err) {
      // Handle error if login fails
      console.error("User creation failed:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-full p-5 lg:p-0 md:p-0">
      <div className="lg:w-[300px] md:w-[300px] w-full">
        <h1 className="header-two lg:header-one font-[600] text-center mb-10">
          Sign up
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            inputId="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email} // Pass error message
          />
          <Input
            type="password"
            inputId="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password} // Pass error message
          />
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}{" "}
          {/* Display error message from Redux store */}
          <div className="flex items-center gap-2 justify-center mb-5">
            <input
              aria-label="Remember me"
              id="remember-me"
              type="checkbox"
              className="w-[18px] h-[17px] bg-[#224957] rounded-[5px]"
            />
            <span className="body-small text-white">Remember me</span>
          </div>
          <Button
            text={loading ? "Loading..." : "Sign up"}
            classProps="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
