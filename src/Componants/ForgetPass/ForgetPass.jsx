import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../UserContext";
import { Bars } from "react-loader-spinner";
import { useFormik } from "formik";

export default function ForgetPass() {
  let [msg, setMsg] = useState("");
  let [msgAccept, setMsgAccept] = useState("");
  let [msgCode, setMsgCode] = useState("");
  let [loading, setLoading] = useState(false);
  let [loadingCode, setLoadingCode] = useState(false);
  let { setUserEmail } = useContext(userContext);
  const navigate = useNavigate();

  async function sendCode(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      if (data?.statusMsg == "success") {
        setMsg("");
        setUserEmail(values.email);
        setMsgAccept(data?.message);
        setLoading(false);
      }
    } catch (error) {
      setMsg(error?.response?.data?.message);
      setMsgAccept("");
      setLoading(false);
      console.log(error);
    }
  }

  async function submitCode(values) {
    try {
      setLoadingCode(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      setMsgCode("");
      console.log(data);

      setLoadingCode(false);
      navigate("/resetPassword");
    } catch (error) {
      console.log(error);
      setMsgCode(error?.response?.data?.message);
      setLoadingCode(false);
    }
  }

  //handling email search form
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: sendCode,
  });

  //handling reset code form
  let formikCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: submitCode,
  });

  return (
    <>
      <form className="w-50 m-auto mt-5" onSubmit={formik.handleSubmit}>
        <label htmlFor="emali" className="mb-3 ">
          Please enter your email to search for your account :
        </label>
        <input
          id="email"
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        
        {msg ? <p className="alert alert-danger ">{msg + "!"}</p> : ""}
        {msgAccept ? (
          <>
            <p className="alert alert-success ">{msgAccept}</p>
          </>
        ) : (
          ""
        )}

        <button
          disabled={!(formik.isValid && formik.dirty)}
          className=" btn green-btn mt-4 d-block ms-auto text-white"
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
            "Search"
          )}
        </button>
      </form>
      {msgAccept ? (
        <>
          <form className="w-50 m-auto" onSubmit={formikCode.handleSubmit}>
            <label htmlFor="resetCode" className=" main-color">
              Enter Reset Code :
            </label>
            <input
              id="resetCode"
              type="text"
              className="form-control mb-4"
              placeholder="Reset code"
              value={formikCode.values.resetCode}
              onChange={formikCode.handleChange}
            />
            <button
              className="btn green-btn text-white d-block m-auto"
              type="submit"
              disabled={!(formikCode.isValid && formikCode.dirty)}
            >
              {loadingCode ? (
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
                "Submit code"
              )}
            </button>
          </form>
        </>
      ) : (
        ""
      )}
    </>
  );
}
