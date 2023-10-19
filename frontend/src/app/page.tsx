"use client";
import Image from "next/image";
import AuthPage from "./Auth/page";

export default function App() {
  function loginBtnClicked() {}
  function goToRegister() {}
  return (
    <div className="flex flex-col">
      <div
        id="loginModal"
        className="bg-white w-80  mx-auto mt-20 rounded-md py-6 px-4"
      >
        <div className="modal-content">
          <h1 className="text-color-main text-center my-4 text-2xl">
            Login Now
          </h1>
          <form
            action="#"
            className="flex flex-col justify-center text-color-main"
          >
            <input
              className="border-2 w-[80%] m-2 rounded-md p-2 mx-auto"
              id="userName-input"
              type="text"
              placeholder="Your Username"
              required
            />
            <input
              className="border-2 w-[80%] m-2 mt-0 rounded-md p-2 mx-auto"
              id="password-input"
              type="password"
              placeholder="Your Password"
              required
            />
            <p id="login-error-msg"></p>
            <button
              className="mx-auto mt-4 px-4 py-2 rounded-md bg-color-main-whith text-white "
              type="submit"
              onClick={() => {
                loginBtnClicked();
              }}
            >
              login
            </button>
            <div className="mt-2 text-sm mx-auto">
              Not a member?{" "}
              <a
                className="text-color-main-whith active:text-black cursor-pointer"
                onClick={() => {
                  goToRegister();
                }}
              >
                Register now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
