import React from "react";
import img1 from "../../assets/amazon_pay.png";
import img2 from "../../assets/amircan_express.png";
import img3 from "../../assets/master_card.png";
import img4 from "../../assets/pay_pal.png";
import img5 from "../../assets/app_store.png";
import img6 from "../../assets/and.png";

export default function Footer() {
  return (
    <>
      <div className="footer bg-[#f0f3f2] py-10 px-3">
        <div className="footer max-w-screen-xl mx-auto px-3">
          <div className="text">
            <h2 className="text-emerald-600 text-2xl mb-3 font-bold">
              Get the FreshCart app
            </h2>
            <p className="text-gray-600 text-lg">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </div>
          <div className="input flex flex-wrap gap-3 justify-between py-5 border-b-2 border-gray-300">
            <input
              type="email"
              placeholder="Email"
              className="block w-full md:w-[73%] text-md text-gray-900 bg-transparent border-2 border-gray-600 rounded-md focus:outline-none focus:ring-0 focus:border-emerald-600 p-3"
            />
            <button className="w-full md:w-1/4 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-md text-md text-center p-3">
              Share App Link
            </button>
          </div>
          <div className="box flex flex-wrap items-center justify-between py-3 border-b-2 border-gray-300">
            <div className="pay flex flex-wrap items-center gap-0 md:gap-3">
              <h3 className="text-gray-600 text-lg">Payment Partners</h3>
              <div className="img flex">
                <img src={img1} className="w-[80px]" alt="Amazon Pay" />
                <img src={img2} className="w-[80px]" alt="American Express" />
                <img src={img3} className="w-[80px]" alt="Master Card" />
                <img src={img4} className="w-[80px]" alt="Pay Pal" />
              </div>
            </div>
            <div className="download flex flex-wrap items-center gap-3">
              <h3 className="text-gray-600 text-lg">
                Get deliveries with FreshCart
              </h3>
              <div className="img flex">
                <img src={img5} className="w-[80px]" alt="App Store" />
                <img src={img6} className="w-[80px]" alt="Google Plat" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
