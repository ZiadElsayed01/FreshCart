import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2, AlertCircle, Moon, Sun } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import forgotPasswordImage from "../../assets/Forgot password.svg";
import { useTheme } from "../../context/ThemeContext";

export default function ForgetPassword() {
  const [isLoading, setisLoading] = useState(false);
  let [APIError, setAPIError] = useState("");
  let [formStatus, setformStatus] = useState(true);
  const { theme, setTheme } = useTheme();

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
        value,
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
        value,
      );
      if (res.data.status == "Success") {
        navigate("/resetpassword");
      }
    } catch (err) {
      console.log(err);
      setAPIError(err.response.data.message);
    }
    setisLoading(false);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center">
        <img
          src={forgotPasswordImage}
          alt="Forgot Password"
          className="max-w-full max-h-[600px] object-contain"
        />
      </div>
      <div className="flex items-center justify-center p-4 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold text-primary">
                Forget Password
              </CardTitle>
              <CardDescription>
                {formStatus
                  ? "Enter your email to reset your password"
                  : "Enter the reset code sent to your email"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {APIError && (
                <Alert
                  className="mb-4"
                  variant={APIError === "success" ? "default" : "destructive"}
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{APIError}</AlertDescription>
                </Alert>
              )}
              {formStatus ? (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="text-sm text-destructive">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={formik2.handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="resetCode" className="text-sm font-medium">
                      Reset Code
                    </label>
                    <Input
                      id="resetCode"
                      name="resetCode"
                      type="text"
                      placeholder="Enter 5-6 digit code"
                      value={formik2.values.resetCode}
                      onChange={formik2.handleChange}
                      onBlur={formik2.handleBlur}
                    />
                    {formik2.errors.resetCode && formik2.touched.resetCode && (
                      <p className="text-sm text-destructive">
                        {formik2.errors.resetCode}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
