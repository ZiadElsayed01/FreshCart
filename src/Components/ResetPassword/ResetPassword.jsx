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
import { PasswordInput } from "../ui/password-input";
import { Loader2, AlertCircle, Moon, Sun } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import forgotPasswordImage from "../../assets/Forgot password.svg";
import { useTheme } from "../../context/ThemeContext";

export default function Login() {
  const [APIError, setAPIError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

    newPassword: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "Password must be between 6 and 10 characters",
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
        values,
      );
      if (res.data.token) {
        navigate("/login");
      }
    } catch {
      setAPIError("Invalid Email or Password");
    }
    setisLoading(false);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-muted p-12">
        <img
          src={forgotPasswordImage}
          alt="Reset Password"
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
                Reset Password
              </CardTitle>
              <CardDescription>
                Enter your email and new password to reset
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
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="text-sm font-medium">
                    New Password
                  </label>
                  <PasswordInput
                    id="newPassword"
                    name="newPassword"
                    placeholder="••••••••"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.newPassword && formik.touched.newPassword && (
                    <p className="text-sm text-destructive">
                      {formik.errors.newPassword}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
