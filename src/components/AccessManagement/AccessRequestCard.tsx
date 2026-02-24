import React from "react";
import greenicon from "../../assets/access/greenicon.png";
import yellowicon from "../../assets/access/yellowicon.png";
import card from "../../assets/access/card.png";
import finger from "../../assets/access/finger.png";
import phone from "../../assets/access/phone.png";
import key from "../../assets/access/key.png";
import { FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";

export interface AccessRequestData {
  id: number;
  type: string;
  name: string;
  email: string;
  unit: string;
  submitted: string;
  status: "Pending" | "Approved" | "Active";
}

interface Props {
  data: AccessRequestData;
  onView: (data: AccessRequestData) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Pending":
      return yellowicon;
    case "Approved":
    case "Active":
      return greenicon;
    default:
      return "";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-[#733E0A33] text-[#FDC700] border border-[#894B00]";
    case "Approved":
    case "Active":
      return "bg-[#0D542B33] text-[#05DF72] border border-[#016630]";
    default:
      return "";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Access Card":
      return card;
    case "Fingerprint Access":
      return finger;
    case "Phone/Call Access":
      return phone;
    case "Common Access Card":
      return key;
    default:
      return "";
  }
};

const AccessRequestCard: React.FC<Props> = ({ data, onView }) => {
  return (
    <div
      className="
        border border-[#FFFFFF33]
        rounded-xl
        p-4 sm:p-5 md:p-6
        space-y-5
        
        transition hover:border-gray-500
      "
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        {/* Left Section */}
        <div className="flex items-start sm:items-center gap-4">

          {/* Type Icon */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-gray-800 rounded-lg shrink-0">
            <img
              src={getTypeIcon(data.type)}
              alt={data.type}
              className="w-5 h-5 object-contain"
            />
          </div>

          {/* Title + Status */}
          <div className="flex flex-wrap items-center gap-3">
            <h3
              style={{ ...FONTWEIGHT[600] }}
              className={`${FONTSIZE[16]} sm:${FONTSIZE[18]} text-white`}
            >
              {data.type}
            </h3>

            <span
              style={{ ...FONTWEIGHT[500] }}
              className={`
                px-3 py-1
                ${FONTSIZE[12]} sm:${FONTSIZE[14]}
                rounded-full
                flex items-center gap-2
                whitespace-nowrap
                ${getStatusColor(data.status)}
              `}
            >
              <img
                src={getStatusIcon(data.status)}
                alt={data.status}
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
              {data.status}
            </span>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">

          {data.status === "Pending" && (
            <>
              <button
                style={{ ...FONTWEIGHT[500] }}
                className={`
                  w-full sm:w-auto
                  px-4 py-2
                  ${FONTSIZE[14]}
                  rounded-lg
                  bg-linear-to-r from-[#00C950] to-[#009966]
                  hover:opacity-90 transition cursor-pointer
                `}
              >
                Approve
              </button>

              <button
                style={{ ...FONTWEIGHT[500] }}
                className={`
                  w-full sm:w-auto
                  px-4 py-2
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
              bg-[#2B7FFF]
              hover:bg-blue-600
              transition cursor-pointer
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
          lg:grid-cols-4
          gap-4
        "
      >
        {[
          { label: "Name", value: data.name },
          { label: "Email", value: data.email },
          { label: "Unit", value: data.unit },
          { label: "Submitted", value: data.submitted },
        ].map((item, index) => (
          <div key={index} className="space-y-1">
            <p
              style={{ ...FONTWEIGHT[500] }}
              className={`text-[#99A1AF] ${FONTSIZE[12]}`}
            >
              {item.label}
            </p>

            <p
              style={{ ...FONTWEIGHT[500] }}
              className={`text-white ${FONTSIZE[14]} wrap-break-word`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessRequestCard;