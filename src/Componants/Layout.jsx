import React, { useContext } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { userContext } from "../UserContext";

export default function Layout() {
  let { setIsUser } = useContext(userContext);

  if (window.location.href == "http://localhost:3001/") {
    localStorage.removeItem("userToken");
    setIsUser("");
   
  }

  return (
    <div className="parent">
      <Navbar></Navbar>
      <div className="container py-4 mt-5 pt-5">
        <Outlet />
      </div>
      <footer className="bg-main-light py-5 ">
        <div className="container">
          <h4>Get the FreshCart app</h4>
          <p>
            We will send you a link, open it on your phone ton download the app
          </p>
          <form className="row px-4">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control "
                placeholder="Email.."
              />
            </div>
            <div className="col-md-2">
              <button className="btn green-btn text-white d-inline-block w-100">
                Share app link
              </button>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
}
