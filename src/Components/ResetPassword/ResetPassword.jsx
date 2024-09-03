import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [APIError, setAPIError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

    newPassword: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "Password must be between 6 and 10 characters"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPasswordApi,
  });
  async function resetPasswordApi(values) {
    setisLoading(true);
    try {
      let res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      if (res.data.token) {
        navigate("/login");
      }
    } catch (err) {
      setAPIError("Invalid Email or Password");
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
          Change your password
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div
                className="p-4 mt-2 text-red-800 rounded-lg bg-red-50 text-md text-center"
                role="alert"
              >
                {formik.errors.newPassword}
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
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
