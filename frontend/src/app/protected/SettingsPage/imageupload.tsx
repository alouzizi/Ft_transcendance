"use client";
// components/ImageUpload.tsx
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useEffect, useState } from "react";
import Avatar from "public/DefaultAvatar.png";
import Image from "next/image";
import { useGlobalContext } from "@/app/context/store";
import { IconButton } from "@mui/material";

const ImageUpload = () => {
  const { user } = useGlobalContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    console.log("user --> ", user);
  }, [user.id]);
  return (
    <div className="kborder ml-4 -mt-24">
      <IconButton className="z-50 relative top-10 left-11">
        <label htmlFor="image-upload">
          <input
            className="border-4 border-pink-500"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="image-upload"
            style={{ display: "none" }}
          />
          <div className="bg-slate-50 rounded-full h-8 w-8 flex items-center justify-center">
          <AddPhotoAlternateIcon style={{ color: "black" }} />
          </div>
        </label>
      </IconButton>
      <div>
        <Image
          width={100}
          height={100}
          src={selectedImage || Avatar}
          alt="Preview"
          className="w-20 h-20 rounded-full bg-cover object-contain"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
