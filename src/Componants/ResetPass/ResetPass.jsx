import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useState } from "react";
import { userContext } from "../../UserContext";
import { Bars } from "react-loader-spinner";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  let { userEmail, setUserEmail } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate= useNavigate('')

  async function resetCode(values) {
    try {
      setLoading(true);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      setMsg("");
      setLoading(false);
      navigate('/')
    } catch (error) {
      setMsg(error?.response?.data?.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is invalid"),
  });

  let formik = useFormik({
    initialValues: {
      email: userEmail,
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetCode,
  });

  return (
    <>
      <form className="w-50 m-auto" onSubmit={formik.handleSubmit}>
        <h5>
          Reset new Password for email{" "}
          <span className="main-color">{userEmail}</span>
        </h5>
        <label htmlFor="newPassword" className="mb-2">
          Input new Password:
        </label>
        <input
          type="password"
          id="newPassword"
          className="form-control mb-2"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <p className="alert alert-danger">{formik.errors.newPassword}</p>
        ) : (
          ""
        )}
        {msg ? <p className="alert alert-danger">{msg + "?"}</p> : ""}
        <button
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
            "Submit"
          )}
        </button>
      </form>
    </>
  );
}
