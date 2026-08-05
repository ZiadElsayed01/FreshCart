import style from "./Notfound.module.css";
import image from "../../assets/error.svg";

export default function Notfound() {
  return (
    <>
      <div className="flex justify-center">
        <img
          src={image}
          width={1000}
          height={1000}
          alt="error"
          className={style.error}
        />
      </div>
    </>
  );
}
