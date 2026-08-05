import img1 from "../../assets/amazon_pay.png";
import img2 from "../../assets/amircan_express.png";
import img3 from "../../assets/master_card.png";
import img4 from "../../assets/pay_pal.png";
import img5 from "../../assets/app_store.png";
import img6 from "../../assets/and.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Mail, Smartphone, CreditCard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-10">
        {/* App Download Section */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-3">
            Get the FreshCart app
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                className="pl-10"
              />
            </div>
            <Button className="w-full sm:w-auto">Share App Link</Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Payment Partners & App Store Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Payment Partners */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-muted-foreground font-medium">
                Payment Partners
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={img1}
                className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                alt="Amazon Pay"
              />
              <img
                src={img2}
                className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                alt="American Express"
              />
              <img
                src={img3}
                className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                alt="Master Card"
              />
              <img
                src={img4}
                className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                alt="Pay Pal"
              />
            </div>
          </div>

          {/* App Store Downloads */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-muted-foreground font-medium">
                Get deliveries with FreshCart
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={img5}
                className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                alt="App Store"
              />
              <img
                src={img6}
                className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                alt="Google Play"
              />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
