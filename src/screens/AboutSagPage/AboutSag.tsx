import img1 from '../../assets/sag.png';
import img2 from '../../assets/sagAbout.png';

const AboutSagSection = () => {
  return (
    <div className="min-h-screen md:mt-28 mt-24 ">
      <div className="container mx-auto px-4 py-8">
        <div className="">
          <h1 className="md:text-4xl pb-8 text-xl font-semibold mb-4 text-center">SAG haqida</h1>
          <img src={img1} alt="SAG Building" className="w-full lg:h-96  mx-auto mb-6" />
          <p className="md:text-3xl text-gray-700 pt-16 text-center text-xl pb-16 max-w-[900px] mx-auto   font-semibold  mb-6">
            Bizning missiyamiz — bilimlarning inson uchun qimmatini, ahamiyatini va haqiqiy rolini namoyish etish.
          </p>
          <div className="flex flex-col md:flex-row  gap-6">
            <img src={img2} alt="SAG Interior" className="w-full lg:h-[382px] md:w-1/3 " />
            <div className="text-gray-700  text-base md:text-lg">
              <p className='font-semibold md:text-2xl text-xl  pb-4'>SAG haqida qisqacha</p>
              <p className='max-w-[611px]'>
                SAG qamqor kompaniyasi 2000-yilda asoslangan bo'lib, ushbu o'tgan uzog' yillik davrlar bun oy't mijozlar uchun xizmat ko'rsatib kelmoqda. Kompaniyamiz MDH davlatlari ichida bilim ishlab chiqarish quvvati bo'yicha mutlaq yetakchilik qilmoqda. Shuninigdek, xalqaro standartlarga to'liq javob beruvchi bilimlarimiz dunyoning 15 ga yaqin mamlakatlarda ham o'z mijozlariga xizmat ko'rsatmoqda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSagSection;