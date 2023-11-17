"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import { Backend_URL } from "@/lib/Constants";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



export default function login() {

  const router = useRouter();


  const [keyQrCode, setKeyQrCode] = useState("");

  const [showErrorCode, setShowErrorCode] = useState(false);


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

            const res = await axios.get(Backend_URL + `/auth/2fa/authenticate/${intra_id}/${keyQrCode}`, {
              method: 'GET',
            });
            const isCodeValide = await res.data;
            if (isCodeValide) {
              console.log("royttetet")
              router.push('/protected/DashboardPage');
            }
            else {
              setShowErrorCode(true);
            }
          } else {
            setShowErrorCode(true);
          }

        }}>Active 2FA</Button>

        <Snackbar open={showErrorCode}
          message="Note archived">
          <Alert severity="error" onClose={() => { setShowErrorCode(false) }} >Error while Activating 2FA</Alert>
        </Snackbar>

      </div>
    </div>
  );
}


