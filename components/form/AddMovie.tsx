"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";

const AddMovie = () => {
  const [image, setImage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const url = "https://api.cloudinary.com/v1_1/druinyjw4/image/upload";
  const upload_preset = "movieslist";

  const handleDrop = (files: File[]) => {
    const localImageUrl = URL.createObjectURL(files[0]);
    setImage(localImageUrl);

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", upload_preset);
    formData.append("asset_folder", "loan-application");

    setIsLoading(true);
    axios
      .post(url, formData)
      .then((response) => {
        setImage(response.data.secure_url); // Ensure HTTPS
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Upload failed", error);
        setIsLoading(false);
      });
  };

  const handleRemoveImg = () => setImage(undefined);

  return (
    <div className="p-20">
      {image ? (
        <div className="relative w-64 h-72 border rounded-md border-neutral-500 group overflow-hidden">
          <Image src={image} fill alt="Cover Image" className="object-cover" />
          <button
            type="button"
            aria-label="Remove image"
            className="bg-red-500 absolute w-6 h-6 rounded-full flex items-center justify-center top-2 right-2 opacity-0 group-hover:opacity-100"
            onClick={handleRemoveImg}
          >
            <p className="text-sm font-medium">X</p>
          </button>
        </div>
      ) : (
        <Dropzone
          onDrop={handleDrop}
          maxFiles={1}
          maxSize={3145728} // 3MB
          accept={{ "image/*": [] }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="border border-dashed rounded-md w-64 h-72">
              <div
                {...getRootProps()}
                className="p-5 cursor-pointer flex items-center justify-center h-full w-full"
              >
                <input {...getInputProps()} multiple={false} />
                <p className="text-neutral-400 text-3xl">
                  {isLoading ? "Uploading..." : "+"}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      )}
    </div>
  );
};

export default AddMovie;
