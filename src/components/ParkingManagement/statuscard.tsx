type Props = {
  title: string;
  count: number;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  iconBg: string;
  icon: string;
};

export default function StatusCard({
  title,
  count,
  gradientFrom,
  gradientTo,
  borderColor,
  iconBg,
  icon,
}: Props) {
  return (
    <div
      className="relative flex flex-col justify-between
                 rounded-xl p-4 h-22.5
                 border backdrop-blur-md overflow-hidden"
      style={{
        borderColor: borderColor,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `0 0 18px ${borderColor}33`,
      }}
    >
      <div className="flex justify-between items-start">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: iconBg }}
        >
          <img src={icon} alt="" className="w-4 h-4" />
        </div>

        <span className="text-lg font-bold">{count}</span>
      </div>

      <p className="text-xs text-gray-300">{title}</p>
    </div>
  );
}
