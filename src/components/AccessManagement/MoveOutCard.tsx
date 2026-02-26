import React from "react";
import greenicon from "../../assets/access/greenicon.png";
import yellowicon from "../../assets/access/yellowicon.png";
import { FONTWEIGHT, FONTSIZE } from "../../constent/uiconstent";

export interface MoveOutData {
  id: number;
  name: string;
  status: "Pending" | "Inspected" | "Completed";
  property: string;
  moveOutDate: string;
  original: string;
  deductions: string;
  refund: string;
}

interface Props {
  data: MoveOutData;
  onView: (data: MoveOutData) => void;
  onApprove?: (data: MoveOutData) => void;
  onReject?: (data: MoveOutData) => void;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-[#733E0A33] text-[#FDC700] border border-[#894B00]";
    case "Inspected":
      return "bg-blue-600/20 text-blue-400 border border-blue-500/40";
    case "Completed":
      return "bg-[#0D542B33] text-[#05DF72] border border-[#016630]";
    default:
      return "";
  }
};

const MoveOutCard: React.FC<Props> = ({
  data,
  onView,
  onApprove,
  onReject,
}) => {
  return (
    <div
      className="
        border border-gray-700 rounded-xl
        p-4 sm:p-5 md:p-6
        space-y-5
        
        transition hover:border-gray-600
      "
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h3
            style={{ ...FONTWEIGHT[600] }}
            className={`${FONTSIZE[16]} sm:${FONTSIZE[18]} text-white`}
          >
            {data.name}
          </h3>

          <span
            style={{ ...FONTWEIGHT[500] }}
            className={`
              px-3 py-1
              ${FONTSIZE[12]} sm:${FONTSIZE[14]}
              rounded-full
              flex items-center gap-2
              whitespace-nowrap
              ${getStatusStyles(data.status)}
            `}
          >
            <img
              src={data.status === "Pending" ? yellowicon : greenicon}
              alt="status"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            {data.status}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          {data.status === "Pending" && (
            <>
              <button
                onClick={() => onApprove?.(data)}
                style={{ ...FONTWEIGHT[500] }}
                className={`
                  w-full sm:w-auto
                  px-4 py-2 cursor-pointer
                  ${FONTSIZE[14]}
                  rounded-lg
                  bg-linear-to-r from-[#00C950] to-[#009966]
                  hover:opacity-90 transition cursor-pointer
                `}
              >
                Approve
              </button>

              <button
                onClick={() => onReject?.(data)}
                style={{ ...FONTWEIGHT[500] }}
                className={`
                  w-full sm:w-auto
                  px-4 py-2 cursor-pointer
                  ${FONTSIZE[14]}
                  rounded-lg
                  bg-linear-to-r from-[#FB2C36] to-[#E60076]
                  hover:opacity-90 transition cursor-pointer
                `}
              >
                Reject
              </button>
            </>
          )}

          <button
            onClick={() => onView(data)}
            style={{ ...FONTWEIGHT[500] }}
            className={`
              w-full sm:w-auto
              px-4 py-2
              ${FONTSIZE[14]}
              rounded-lg
              bg-[#2B7FFF] cursor-pointer
              hover:bg-blue-600
              transition
            `}
          >
            View
          </button>
        </div>
      </div>

      {/* ================= DETAILS SECTION ================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-4
        "
      >
        {[
          { label: "Property", value: data.property, color: "text-white" },
          {
            label: "Move-Out Date",
            value: data.moveOutDate,
            color: "text-white",
          },
          { label: "Original", value: data.original, color: "text-white" },
          {
            label: "Deductions",
            value: data.deductions,
            color: "text-red-400",
          },
          { label: "Refund", value: data.refund, color: "text-[#05DF72]" },
        ].map((item, index) => (
          <div key={index} className="space-y-1">
            <p
              style={{ ...FONTWEIGHT[500] }}
              className={`text-[#99A1AF] ${FONTSIZE[12]}`}
            >
              {item.label}
            </p>

            <p
              style={{
                ...FONTWEIGHT[item.label === "Refund" ? 600 : 500],
              }}
              className={`${item.color} ${FONTSIZE[14]} wrap-break-word`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoveOutCard;
