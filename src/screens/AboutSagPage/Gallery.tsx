import img1 from "../../assets/about1.png";
import img2 from "../../assets/about2.png";
import img3 from "../../assets/about3.png";
import img4 from "../../assets/about4.png";
import img5 from "../../assets/about5.png";

const Gallery = () => {
  return (
    <div className="mb-20 bg-[#C6B3A3]">
      <div className="container mx-auto px-4  py-16 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <img src={img1} alt="Gallery Image 1" className="w-full  lg:h-[372px]" />
          <img src={img2} alt="Gallery Image 2" className="w-full lg:h-[372px]" />
          <img src={img3} alt="Gallery Image 3" className="w-full lg:h-[372px]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <img src={img4} alt="Gallery Image 4" className="w-full lg:h-[372px]" />
          <img src={img5} alt="Gallery Image 5" className="w-full lg:h-[372px]" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
