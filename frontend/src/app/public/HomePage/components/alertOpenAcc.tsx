import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from "@radix-ui/themes";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Backend_URL } from '../../../../../lib/Constants';

export default function AlertOpenAccount({ openAlert, setOpenAlert }:
    { openAlert: boolean, setOpenAlert: any }) {

    const handleLogin = async () => {
        window.location.href = "http://localhost:4000/auth/google";
    };

    return <div>
        <Dialog open={openAlert}
            PaperProps={{
                style: {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                },
            }}
            onClose={() => { setOpenAlert(false) }}>
            <DialogContent className='flex flex-col items-center p-10 justify-around  bg-[#7D7676] bg-opacity-70 rounded-lg'>
                <img className="h-20" src="/PongMaster.svg" alt="PongMaster" />
                <p className='text-white text-xl'>open account using</p>
                <div className='flex'>
                    <Button onClick={handleLogin}>
                        <div className="border-2 shadow-xl bg-white border-[#4069FF] mt-3 rounded-xl
                            flex justify-center mx-auto items-center w-36 h-12">
                            <img className="w-[29px]" src="/google.svg" />
                            <p className="ml-1"> google </p>
                        </div>
                    </Button>
                    <Button onClick={handleLogin}>
                        <div className="ml-2 border-2 shadow-xl bg-white border-[#4069FF] mt-3 rounded-xl
                            flex justify-center mx-auto items-center w-36 h-12">
                            <img className="w-[29px]" src="/42.svg" />
                            <p className="ml-1"> school </p>
                        </div>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
}