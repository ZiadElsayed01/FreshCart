import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
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
import { Loader2, LogIn, AlertCircle, Moon, Sun } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import loginImage from "../../assets/login.svg";
import { useTheme } from "../../Context/ThemeContext";

export default function Login() {
  const [APIError, setAPIError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  function handleLogin(values) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);
        setAPIError(res.data.message);
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          window.location.href = "/";
        }
      })
      .catch((res) => {
        setisLoading(false);
        setAPIError(res.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "Password must be between 6 and 10 characters",
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center">
        <img
          src={loginImage}
          alt="Login"
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
                Welcome Back
              </CardTitle>
              <CardDescription>
                Sign in to your account to continue shopping
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
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Link
                      to="/forgetpassword"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-sm text-destructive">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">
                  Don&apos;t have an account?{" "}
                </span>
                <Link
                  to="/register"
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
