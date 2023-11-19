"use client";
import { BiImageAdd } from "react-icons/bi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalContext } from "@/app/protected/context/store";

import Cookies from "js-cookie";
import Badge from "@mui/material/Badge";
import { Backend_URL } from "../../../../lib/Constants";

const ImageUpload = () => {
  const intra_id = Cookies.get("intra_id");
  const { user } = useGlobalContext();
  const [selectedImage, setSelectedImage] = useState<string>("");

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(
          Backend_URL + `/user/${intra_id}/uploadImage`,
          {
            method: "POST",
            body: formData,
            headers: {
              // authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="mt-4">
      <Badge
        badgeContent={
          <label className="rounded-full p-[1.5px]  ">
            <input
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              id="image-upload"
              style={{ display: "none" }}
            />
            <BiImageAdd size={18} style={{ color: "black" }} className="cursor-pointer" />
          </label>
        }
        sx={{
          "& .MuiBadge-badge": {
            background: "white",
            width: 25,
            height: 25,
            borderRadius: 50,
          },
        }}
        overlap="circular"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Image
          width={100}
          height={100}
          src={selectedImage || user.profilePic}

          alt="Preview"
          className="w-20 h-20 rounded-full bg-cover object-contain "
        />
      </Badge>
    </div>
  );
};

export default ImageUpload;
