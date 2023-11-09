"use client";
// components/ImageUpload.tsx
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from "react";
import Avatar from "public/DefaultAvatar.png";
import Image from "next/image";

const ImageUpload = () => {
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

  return (
    <div className="border ml-4 -mt-16">
<div className='border border-yellow-500'>

      <AddPhotoAlternateIcon style={{ color: 'white' }}>
        </AddPhotoAlternateIcon>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="image-upload"
        style={{ display: "none" }}
        />
        </div>
      <label htmlFor="image-upload">
        <div>
          <Image
            width={100}
            height={100}
            src={selectedImage || Avatar}
            alt="Preview"
            className="w-20 rounded-full"
            />
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
