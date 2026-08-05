import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContenxt";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import { Textarea } from "../../Components/ui/textarea";
import { Loader2, MapPin, Phone, FileText } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Checkout() {
  const [isLoading, setisLoading] = useState(false);
  let { checkout, cartId } = useContext(CartContext);

  let validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(10, "Details must be at least 10 characters")
      .required("Details are required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .max(11, "Max length is 11")
      .required("Phone is required"),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .required("City is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: () =>
      handleCheckout(cartId, `https://fresh-cart-route.vercel.app`),
  });

  async function handleCheckout(cartId, url) {
    setisLoading(true);
    try {
      let { data } = await checkout(cartId, url, formik.values);
      window.location.href = data.session.url;
    } catch (error) {
      console.error(error);
    }
    setisLoading(false);
  }

  return (
    <>
      <div className="w-full py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-3xl text-center text-primary mb-2">
            Checkout Now
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Please provide your shipping details to complete your order
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="details" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Address Details
                  </Label>
                  <Textarea
                    id="details"
                    name="details"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your full address details (street, building, floor, etc.)"
                    className={cn(
                      "min-h-[100px]",
                      formik.errors.details &&
                        formik.touched.details &&
                        "border-destructive",
                    )}
                  />
                  {formik.errors.details && formik.touched.details && (
                    <p className="text-sm text-destructive">
                      {formik.errors.details}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="01xxxxxxxxx"
                    className={cn(
                      formik.errors.phone &&
                        formik.touched.phone &&
                        "border-destructive",
                    )}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <p className="text-sm text-destructive">
                      {formik.errors.phone}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Format: 01xxxxxxxxx (Egyptian mobile numbers only)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your city"
                    className={cn(
                      formik.errors.city &&
                        formik.touched.city &&
                        "border-destructive",
                    )}
                  />
                  {formik.errors.city && formik.touched.city && (
                    <p className="text-sm text-destructive">
                      {formik.errors.city}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
