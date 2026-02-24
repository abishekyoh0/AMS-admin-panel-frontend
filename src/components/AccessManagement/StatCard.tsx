import React from "react";
import {
  FONTSIZE,
  FONTWEIGHT,
  COLORS,
} from "../../constent/uiconstent";

interface Props {
  title: string;
  value: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const StatCard: React.FC<Props> = ({
  title,
  value,
  bgColor,
  borderColor,
  textColor,
}) => {
  return (
    <div
      className={`rounded-xl p-5 border shadow-lg ${bgColor} ${borderColor}`}
    >
      {/* VALUE */}
      <p
        className={`${FONTSIZE[32]} mt-1`}
        style={{
          ...FONTWEIGHT[700],
          color: textColor,
        }}
      >
        {value}
      </p>

      {/* TITLE */}
      <h1
        className={`${FONTSIZE[14]} mt-2`}
        style={{
          ...FONTWEIGHT[400],
          color: COLORS.cardsubhead,
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default StatCard;