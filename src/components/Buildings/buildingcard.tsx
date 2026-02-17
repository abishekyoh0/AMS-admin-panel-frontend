type Props = {
  title: string;
  value: number;
  bgColor: string;
  borderColor: string;
};

export default function SummaryCard({
  title,
  value,
  bgColor,
  borderColor,
}: Props) {
  return (
    <div
      className={`rounded-xl p-5 text-white border ${bgColor} ${borderColor}`}>
         <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-sm opacity-80">{title}</p>
     
    </div>
  );
}
