import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";

type Props = {
  title: string;
  count: number;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  iconBg: string;
  icon: string;
  countColor: string;   
};

export default function StatusCard({
  title,
  count,
  gradientFrom,
  gradientTo,
  borderColor,
  iconBg,
  icon,
  countColor,
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
          <img src={icon} alt="" className="w-5 h-5" />
        </div>

        <span
          className={`text-lg ${FONTSIZE[24]}`}
          style={{
            fontWeight: WEIGHT.seven,
            color: countColor,
          }}
        >
          {count}
        </span>
      </div>

      <p
        className={`text-xs mt-2 ${FONTSIZE[14]}`}
        style={{
          fontWeight: WEIGHT.five,
          color: COLORS.grey,
        }}
      >
        {title}
      </p>
    </div>
  );
}
