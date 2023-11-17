"use client";
import { Button } from "@mui/material";
import { cache, useState } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import { Backend_URL } from "@/lib/Constants";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function login() {

  const router = useRouter();


  const [keyQrCode, setKeyQrCode] = useState("");




  return (
    <div className="flex justify-center items-center">
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

            const intra_id = Cookies.get('intra_id');

            const response = await fetch(Backend_URL + `/auth/2fa/authenticate/${intra_id}/${keyQrCode}`,
              { method: 'POST' });

            if (response.ok) {
              router.push('/protected/DashboardPage');
            } else {
              toast.error("Wrong authentication codee")
            }
          } else {
            toast.error("Wrong authentication codee")
          }

        }}>Active 2FA</Button>

      </div>
      <ToastContainer />
    </div>
  );
}


