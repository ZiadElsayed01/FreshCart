import RecentProducts from "./../RecentProducts/RecentProducts";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MainSlider />
      <CategoriesSlider />
      <RecentProducts />
    </div>
  );
}
