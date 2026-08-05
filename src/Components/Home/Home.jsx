import RecentProducts from "./../RecentProducts/RecentProducts";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import FeaturesSection from "../FeaturesSection/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MainSlider />
      <FeaturesSection />
      <CategoriesSlider />
      <RecentProducts />
    </div>
  );
}
