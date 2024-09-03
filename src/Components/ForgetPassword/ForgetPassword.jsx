import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [isLoading, setisLoading] = useState(false);
  let [APIError, setAPIError] = useState("");
  let [formStatus, setformStatus] = useState(true);

  let navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
  });
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: ForgetPasswordApi,
  });

  let validationSchema2 = Yup.object({
    resetCode: Yup.string()
      .matches(/^[0-9]{5,6}$/, "Enter Valid Code")
      .required("Reset Code Required"),
  });
  let formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyResetCode,
    validationSchema: validationSchema2,
  });

  async function ForgetPasswordApi(value) {
    setisLoading(true);
    try {
      let res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        value
      );
      if (res.data.statusMsg == "success") {
        setformStatus(false);
      }
    } catch (err) {
      setAPIError(err.response.data.message);
    }
    setisLoading(false);
  }

  async function verifyResetCode(value) {
    setisLoading(true);
    try {
      let res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        value
      );
      if (res.data.status == "Success") {
        navigate("/resetpassword");
      }
    } catch {
      console.log(err);
      setAPIError(err.response.data.message);
    }
    setisLoading(false);
  }

  return (
    <>
      <div className="w-full mt-40 md:mt-24">
        {APIError ? (
          APIError === "success" ? (
            <div
              className="p-4 mb-4 text-lg text-center text-emerald-800 rounded-lg bg-emerald-50 mx-auto max-w-screen-md"
              role="alert"
            >
              {APIError}
            </div>
          ) : (
            <div
              className="p-4 mb-4 text-lg text-center text-red-800 rounded-lg bg-red-50 mx-auto max-w-screen-md"
              role="alert"
            >
              {APIError}
            </div>
          )
        ) : null}
        <h2 className="font-bold text-3xl text-center text-emerald-600 mb-3">
          Forget Password
        </h2>
        {formStatus ? (
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-2xl mx-auto py-5"
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              />
              <label
                htmlFor="email"
                className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
              {formik.errors.email && formik.touched.email ? (
                <div
                  className="p-4 mt-2 text-red-800 rounded-lg bg-red-50 text-md text-center"
                  role="alert"
                >
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={formik2.handleSubmit}
            className="max-w-2xl mx-auto py-5"
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={formik2.values.resetCode}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                type="text"
                name="resetCode"
                id="resetCode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              />
              <label
                htmlFor="resetCode"
                className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Reset Code
              </label>
              {formik2.errors.resetCode && formik2.touched.resetCode ? (
                <div
                  className="p-4 mt-2 text-red-800 rounded-lg bg-red-50 text-md text-center"
                  role="alert"
                >
                  {formik2.errors.resetCode}
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Verify Code"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
