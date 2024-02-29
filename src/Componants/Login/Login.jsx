import axios from "axios";
import { Formik } from "formik";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../UserContext";
import { useQueryClient } from "react-query";



export default function Login() {
  let { user, setIsUser, isLogin, setLogin } = useContext(userContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");
 

  async function getLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );

      if (data.message == "success") {
        setIsUser(data.token);
        setLogin(data.user.name);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.user.name);
        navigate("/home");
        setMsg("");
        setLoading(false);
        window.location.reload(true);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: getLogin,
  });

  function createAccount() {
    navigate("/register");
  }
  function forgetPass() {
    navigate("/forgetPassword");
  }

  return (
    <>
      <div>
        <form className="w-75  mx-auto my-4" onSubmit={formik.handleSubmit}>
          <h4 className=" ">Login Now: </h4>
          {msg ? <p className="alert alert-danger">{msg + "!"}</p> : ""}

          <label htmlFor="email">email:</label>
          <input
            type="email"
            name=""
            id="email"
            className="form-control mb-2"
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <label htmlFor="password">password:</label>
          <input
            type="password"
            name=""
            id="password"
            className="form-control mb-2"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <button
            disabled={!(formik.isValid && formik.dirty)}
            className="ms-auto btn green-btn text-white d-block "
            type="submit"
          >
            {loading ? (
              <Bars
                height="20"
                width="60"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Login"
            )}
          </button>
          <p className=" cursor-pointer forget" onClick={forgetPass}>
            Forget Password?
          </p>

          <p className=" ">
            Dont't have an account?
            <span
              className=" cursor-pointer create-acc "
              onClick={createAccount}
            >
              {" "}
              Create an account
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
