import green from "../../assets/resident/green.png";
import white from "../../assets/resident/White.png";
import graph from "../../assets/resident/graph.png";
import mark from "../../assets/resident/mark.png";
import { FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";

interface Props {
  title: string;
  value: string | number;
  type?: "inside" | "exited" | "entries" | "gate";
}

const StatCard: React.FC<Props> = ({ title, value, type = "inside" }) => {
  const styles = {
    inside: {
      bg: "bg-gradient-to-br from-[#00C95033] to-[#00BC7D33]",
      border: "border-[#05DF724D]",
      image: green,
      titleColor: "text-[#05DF72]",
    },
    exited: {
      bg: "bg-gradient-to-br from-[#6A728233] to-[#62748E33]",
      border: "border-[#99A1AF4D]",
      image: white,
      titleColor: "text-white",
    },
    entries: {
      bg: "bg-gradient-to-br from-[#2B7FFF33] to-[#00B8DB33]",
      border: "border-[#51A2FF4D]",
      image: graph,
      titleColor: "text-[#2B7FFF]",
    },
    gate: {
      bg: "bg-gradient-to-br from-[#AD46FF33] to-[#F6339A33]",
      border: "border-[#C27AFF4D]",
      image: mark,
      titleColor: "text-[#AD46FF]",
    },
  };

  const current = styles[type];

  return (
    <div
      className={`relative rounded-2xl p-5 border ${current.border} ${current.bg} backdrop-blur-md shadow-lg transition `}
    >
      <div className="mb-4">
        <img
          src={current.image}
          alt={title}
          className="w-8 h-8 object-contain"
        />
      </div>

      <h2
        style={{ ...FONTWEIGHT[600] }}
        className={`${FONTSIZE[24]} text-white`}
      >
        {value}
      </h2>

      <p
        style={{ ...FONTWEIGHT[500] }}
        className={`${FONTSIZE[14]} mt-1 ${current.titleColor}`}
      >
        {title}
      </p>
    </div>
  );
};

export default StatCard;
