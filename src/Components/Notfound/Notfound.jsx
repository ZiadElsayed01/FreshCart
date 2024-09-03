import React from "react";
import style from "./Notfound.module.css";
import image from "../../assets/error.svg";

export default function Notfound() {
  return (
    <>
      <div className="max-w-screen-2xl py-20">
        <div className="flex justify-center items-center">
          <img src={image} alt="error" className={style.error} />
        </div>
      </div>
    </>
  );
}
