import React from "react";
import type { FormData, StatusType } from "../../pages/AccessManagement/AccessManagement";
import greenicon from "../../assets/access/greenicon.png";
import yellowicon from "../../assets/access/yellowicon.png";
import { FONTWEIGHT, FONTSIZE } from "../../constent/uiconstent";

interface Props {
  form: FormData;
  onView: (form: FormData) => void;
}

const FormCard: React.FC<Props> = ({ form, onView }) => {
  const approvedStatuses: StatusType[] = [
    "Approved",
    "Completed",
    "Inspected",
  ];

  const isApproved = approvedStatuses.includes(form.status);

  return (
    <div
      className="border border-gray-700 rounded-xl
                 p-4 sm:p-5 md:p-6
                 space-y-4"
    >
      {/* ================= Top Section ================= */}
      <div
        className="flex flex-col
                   sm:flex-row
                   sm:items-center
                   sm:justify-between
                   gap-4"
      >
        {/* Name + Status */}
        <div className="flex flex-wrap items-center gap-3">
          <h3
            style={{ ...FONTWEIGHT[600] }}
            className={`${FONTSIZE[16]} sm:${FONTSIZE[18]} text-white`}
          >
            {form.name}
          </h3>

          <span
            style={{ ...FONTWEIGHT[500] }}
            className={`
              px-3 py-1
              ${FONTSIZE[12]} sm:${FONTSIZE[14]}
              rounded-full
              flex items-center gap-2
              whitespace-nowrap
              ${
                isApproved
                  ? "bg-[#0D542B33] text-[#05DF72] border border-[#016630]"
                  : "bg-[#733E0A33] text-[#FDC700] border border-[#894B00]"
              }
            `}
          >
            <img
              src={isApproved ? greenicon : yellowicon}
              alt="status"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            {form.status}
          </span>
        </div>

        {/* ================= Buttons ================= */}
        <div
          className="flex flex-col
                     sm:flex-row
                     w-full sm:w-auto
                     gap-2"
        >
          {form.status === "Pending" && (
            <>
              <button
                style={{ ...FONTWEIGHT[500] }}
                className={`w-full sm:w-auto
                  px-4 py-2
                  ${FONTSIZE[14]}
                  rounded-lg
                  bg-linear-to-r from-[#00C950] to-[#009966]
                  hover:opacity-90 transition cursor-pointer`}
              >
                Approve
              </button>

              <button
                style={{ ...FONTWEIGHT[500] }}
                className={`w-full sm:w-auto
                  px-4 py-2
                  ${FONTSIZE[14]}
                  rounded-lg
                  bg-linear-to-r from-[#FB2C36] to-[#E60076]
                  hover:opacity-90 transition cursor-pointer`}
              >
                Reject
              </button>
            </>
          )}

          <button
            onClick={() => onView(form)}
            style={{ ...FONTWEIGHT[500] }}
            className={`w-full sm:w-auto
              px-4 py-2
              ${FONTSIZE[14]}
              rounded-lg
              bg-[#2B7FFF]
              hover:bg-blue-600
              transition cursor-pointer`}
          >
            View
          </button>
        </div>
      </div>

      {/* ================= Details Section ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Property", value: form.property },
          { label: "Move-In Date", value: form.moveInDate },
          { label: "Deposit", value: form.deposit },
          { label: "Submitted", value: form.submitted },
        ].map((item, index) => (
          <div key={index} className="space-y-1">
            <p
              style={{ ...FONTWEIGHT[500] }}
              className={`text-[#99A1AF] ${FONTSIZE[14]}`}
            >
              {item.label}
            </p>

            <p
              style={{ ...FONTWEIGHT[500] }}
              className={`text-white wrap-break-word ${FONTSIZE[14]}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormCard;