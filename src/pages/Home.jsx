import Gallery from "../components/Gallery.jsx";
import Slider from "../components/Slider.jsx";
import FAQ from "../components/FAQ.jsx";
import Prise from "../components/Prise.jsx";

export default function HomePage() {
  return (
    <>
      <Slider />
      <Prise />
      <Gallery />
      <FAQ/>
    </>
  );
}