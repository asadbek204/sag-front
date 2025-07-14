interface CharacterDetail {
  id: number;
  character: string;
  detail: string;
}

interface CharacteristicsProps {
  details: CharacterDetail[];
  title?: string;

}

const Characteristics = ({ details, title }: CharacteristicsProps) => {
  return (
    <div className="max-w-3xl mt-8 p-4 bg-[#eeecd6] shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{title}</h2>
      <table className="w-full table-auto border border-gray-300">
        <tbody className="divide-y divide-gray-300">
          {details.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3 font-medium text-gray-700">{item.character}</td>
              <td className="px-4 py-3 text-gray-800">{item.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Characteristics;
