"use client";
import Switch from '@mui/material/Switch';
import Cookies from 'js-cookie';
import Avatar from "public/DefaultAvatar.png";
import Image from "next/image";
import Input from '@mui/joy/Input';
import ImageUpload from "./imageupload";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Backend_URL } from '@/lib/Constants';
import { useGlobalContext } from '@/app/protected/context/store';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SettingsPage() {
  const token = Cookies.get('access_token');
  const router = useRouter();

  const { user } = useGlobalContext();

  const [checked, setChecked] = useState(false);
  const [urlImage, setUrlImage] = useState("");
  const [newNickName, setNickName] = useState("");
  const [keyQrCode, setKeyQrCode] = useState("");


  const getUrlQr = async () => {
    const token = Cookies.get('access_token');
    const res = await axios.get(Backend_URL + `/auth/2fa/generate`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const qrcode = await res.data;
    if (qrcode)
      setUrlImage(qrcode);
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(user);
    if (user && event.target.checked == false && user.id !== '-1' && checked) {
      const res = await fetch(`${Backend_URL}/auth/2fa/turn-off/${user.intra_id}`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      setChecked(false);
      toast.success("2fa authentication turned off successfully")
    } else if (event.target.checked == true) {
      getUrlQr();
    }
  };

  useEffect(() => {
    if (user.id != "-1" && user.isTwoFactorAuthEnabled) {
      setChecked(true);
    }

    setNickName(user.nickname);
  }, [user.id])


  return (
    <div className="h-screen flex items-center justify-center">
      <form className="flex bg-slate-400 border border-green-500 flex-col justify-center gap-6 w-[500px]">
        <div className="border border-red-500 min-w-[400px] h-40 rounded-2xl flex flex-col items-center w-full pt-10 gap-14">

        </div>

        <ImageUpload />
        <div className="flex flex-col w-full border">
          <input
            type="text"
            placeholder="Nickname"
            className="px-[4px] border border-black rounded mx-auto my-3 w-[90%] h-10 text-black"
            value={newNickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          ></input>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <Switch checked={checked}
                onChange={handleChange} />
              <label className="text-white">Two-factor Authentification</label>
            </div>

            {urlImage === "" ? <></> :
              <Image
                width={200}
                height={200}
                src={urlImage}
                alt="Preview"
                className="w-40 h-40"
              />}
            {urlImage === "" ? <></> :
              <div className='flex my-3'>
                <input type="text" className="
              bg-[#f1f3f8] text-black placeholder-gray-300 text-sm outline-none rounded border-2 border-blue-600"
                  value={keyQrCode}
                  onChange={(e) => {
                    setKeyQrCode(e.target.value);
                  }}
                >

                </input>

                <Button variant="contained" className='ml-2 bg-blue-600' onClick={async () => {

                  if (keyQrCode !== "") {

                    const response = await fetch(Backend_URL + `/auth/2fa/turn-on/${user.intra_id}/${keyQrCode}`,
                      {
                        method: 'POST', headers: {
                          authorization: `Bearer ${token}`,
                          'Content-Type': 'application/json',
                        },
                      });
                    if (response.ok) {
                      setChecked(true);
                      setUrlImage("");
                      toast.success("2fa authentication turned on successfully")
                    } else {
                      toast.error("Wrong authentication code")
                    }
                  } else {
                    toast.error("Wrong authentication code")
                  }

                }}>Active 2FA</Button>
              </div>
            }
          </div>




        </div>
        <button className="border text-white text-center border-black bg-[#4069FF] 
          rounded-xl justify-center mx-auto item-center w-[50%] h-14 font-bold"
          onClick={async () => {
            const token = Cookies.get('access_token');
            const res = await axios.get(Backend_URL + `/user/updatUserdata/${user.intra_id}/${newNickName}/tmp`, {
              method: 'GET',
              headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
          }}>
          SAVE
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
