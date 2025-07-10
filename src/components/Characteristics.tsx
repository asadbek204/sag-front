const Characteristics = () => {
  return (
    <div className="max-w-3xl  mt-8 p-4 bg-[#eeecd6] shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Xususiyatlari</h2>
      <table className="w-full table-auto border border-gray-300">
        <tbody className="divide-y divide-gray-300">
          <tr className="">
            <td className="px-4 py-3 font-medium text-gray-700">Плотность</td>
            <td className="px-4 py-3 text-gray-800">1м² 2880000 пучков</td>
          </tr>
          <tr className="">
            <td className="px-4 py-3 font-medium text-gray-700">Oснова</td>
            <td className="px-4 py-3 text-gray-800">хлопок</td>
          </tr>
          <tr className="">
            <td className="px-4 py-3 font-medium text-gray-700">Высота ворса</td>
            <td className="px-4 py-3 text-gray-800">5мм</td>
          </tr>
          <tr className="">
            <td className="px-4 py-3 font-medium text-gray-700">Материал нити</td>
            <td className="px-4 py-3 text-gray-800">100% модал</td>
          </tr>
          <tr className="">
            <td className="px-4 py-3 font-medium text-gray-700">Вес</td>
            <td className="px-4 py-3 text-gray-800">2850 гр/м² (+/-7%)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Characteristics;
