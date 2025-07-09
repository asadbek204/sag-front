import img from "../../assets/sagAbout2.png";

const ProductionSection = () => {
  return (
    <div className=" md:mt-[80px]">
      <div className=" py-8">
        {/* Production Volume Header */}
        <div className="main_color w-full text-white   mb-8 ">
         <div className="container pt-10 pb-16 mx-auto">
             <h1 className="text-3xl font-bold mb-4">Ishlab chiqarish hajmi</h1>
          <div className="md:flex md:gap-56 justify-between">
            <div className="w-full text-lg">
            <div className="flex pt-5 justify-between pb-2 border-b">
                <div>2000-yil</div><div>10 000 000 mln.m²</div>
            </div>
           <div className="flex pt-5 justify-between pb-2 border-b">
                <div>2000-yil</div><div>10 000 000 mln.m²</div>
            </div>
          </div>
          <div className="w-full text-lg">
            <div className="flex pt-5 justify-between pb-2 border-b">
                <div>2000-yil</div><div>10 000 000 mln.m²</div>
            </div>
            <div className="flex pt-5 justify-between pb-2 border-b">
                <div>2000-yil</div><div>10 000 000 mln.m²</div>
            </div>
          </div>
          </div>
         </div>
        </div>

        {/* Main Content */}
        <div className="flex md:mt-[145px] container justify-between mx-auto flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2 text-gray-700 text-base md:text-lg">
            <h2 className="text-2xl font-semibold mb-4">Ishlab chiqarish haqida</h2>
            <p>
              SAG doimo mijozlari uchun sifat nazorati, katta e'tibor qaratadi. Ishlab chiqarish jarayonlari avtomatlashtirish hamda texnologik yutuqlar bilan foydalanib bo'yicha SAG o'z sohasida dunyoda yetakchi hisoblanadi. Germaniya, Belgiya va Shveytsariyaning eng ilg'or uskunalaridan foydalanib bilim ishlab chiqarishda foydalaniladi. Korxona 2017-yildan beri SAP tizimidan foydalanib keladi va ushbu murakkab tizimni muvaffaqiyatli joriy qilgani uchun bir necha bor xalqaro sovrinlar bilan taqdirlangan. Bundan tashqari, ishlab chiqarishda sun'iy intellekt texnologiyalardan foydalanayotgan kam sonli korxonalaridan biri hisoblanadi. Barcha jarayonlar, ishlab chiqarishdan boshlab yakuniy mahsulotni qadoqlashgacha, bevosita korxonada amalga oshiriladi.
            </p>
          </div>
          <div className="">
            <img src={img} alt="Production Facility" className="md:w-[382px] md:h-[382px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionSection;