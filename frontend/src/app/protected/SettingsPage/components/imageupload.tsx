"use client";
import { BiImageAdd } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";
import { useGlobalContext } from "@/app/protected/context/store";
import Cookies from "js-cookie";
import Badge from "@mui/material/Badge";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDataOwner } from "../IpaSettings/fetch-user";
import axios from "axios";

const ImageUpload = () => {
  const { user, setUser } = useGlobalContext();
  const [selectedImage, setSelectedImage] = useState<string>("");

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const token = Cookies.get("access_token");
    const file = e.target.files?.[0];

    if (file && file.size && file.size < 0.5 * 1024 * 1024) {
      //console.log("file.size=", file.size);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK}/user/uploadImage/${user.intra_id}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Image uploaded successfully");
        const tmp = await getDataOwner();
        setUser(tmp);
      } catch (error) {
        //console.log(error);
        toast.error("Error uploading image");
      }
    } else toast.error("Error uploading image");
  };

  return (
    <div className="mt-4">
      <Badge
        badgeContent={
          <label className="rounded-full p-[1.5px]  ">
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={uploadPhoto}
              id="image-upload"
              style={{ display: "none" }}
            />
            <BiImageAdd
              size={18}
              style={{ color: "black" }}
              className="cursor-pointer"
            />
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

      <ToastContainer />
    </div>
  );
};

export default ImageUpload;
