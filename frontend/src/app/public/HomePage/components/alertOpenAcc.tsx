import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AlertOpenAccount({
  openAlert,
  setOpenAlert,
}: {
  openAlert: boolean;
  setOpenAlert: any;
}) {
  return (
    <div>
      <Dialog
        open={openAlert}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onClose={() => {
          setOpenAlert(false);
        }}
      >
        <DialogContent className="flex flex-col items-center p-10 justify-around  bg-[#7D7676] bg-opacity-70 rounded-lg">
          <img className="h-20" src="/PongMaster.svg" alt="PongMaster" />
          <p className="text-white text-xl">open account using</p>
          <div className="flex">
            <Button
              onClick={() => {
                // window.location.href = process.env.NEXT_PUBLIC_BACK + "/auth/google"
              }}
            >
              <div
                className="border-2 shadow-xl bg-white border-[#4069FF] mt-3 rounded-xl
                            flex justify-center mx-auto items-center w-36 h-12"
              >
                <img className="w-[29px]" src="/google.svg" />
                <p className="ml-1"> google </p>
              </div>
            </Button>
            <Button
              onClick={() => {
                window.location.href = `${process.env.NEXT_PUBLIC_BACK}/auth/login42`;

                // //console.log(
                //   "process.env.NEXT_PUBLIC_BACK=",
                //   process.env.NEXT_PUBLIC_BACK
                // );
              }}
            >
              <div
                className="ml-2 border-2 shadow-xl bg-white border-[#4069FF] mt-3 rounded-xl
                            flex justify-center mx-auto items-center w-36 h-12"
              >
                <img className="w-[29px]" src="/42.svg" />
                <p className="ml-1"> school </p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
