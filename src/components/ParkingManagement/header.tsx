import { useNavigate } from "react-router-dom";
import car from "../../assets/parking/car.png";
import clock from "../../assets/parking/clock.png";
import map from "../../assets/parking/map.png";
import { useState } from "react";
import AuditLogModal from "./auditlog";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";

type Props = {
  pending: number;
};

export default function Header({ pending }: Props) {
  const navigate = useNavigate();
  const [openAudit, setOpenAudit] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg
                        bg-linear-to-r from-[#AD46FF33] to-[#F6339A33]
                        border border-[#C27AFF4D]">
          <img src={car} alt="parking" className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>

        <div>
          <h1
            className={`text-lg sm:text-xl md:text-2xl ${FONTSIZE[36]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            Parking Management
          </h1>

          <p
            className={`text-xs sm:text-sm ${FONTSIZE[16]}`}
            style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
          >
            Manage parking requests and slot assignments
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">

        <button
          onClick={() => navigate("/parkingslots")}
          className={`w-full sm:w-auto px-5 h-11
                      bg-[#FFFFFF0D] border border-[#FFFFFF33]
                      text-white rounded-[14px]
                      flex items-center justify-center gap-2
                      hover:bg-white/10 transition cursor-pointer ${FONTSIZE[16]}`}
          style={{ fontWeight: WEIGHT.seven }}
        >
          <img src={map} alt="icon" className="w-4 h-4 sm:w-5 sm:h-5" />
          Manage Slots
        </button>

        <button
          onClick={() => setOpenAudit(true)}
          className={`w-full sm:w-auto px-5 h-11
                      bg-[#FFFFFF0D] border border-[#FFFFFF33]
                      text-white rounded-[14px]
                      flex items-center justify-center gap-2
                      hover:bg-white/10 transition cursor-pointer ${FONTSIZE[16]}`}
          style={{ fontWeight: WEIGHT.seven }}
        >
          <img src={clock} alt="icon" className="w-4 h-4 sm:w-5 sm:h-5" />
          Audit Log
        </button>

        <div
          className="w-full sm:w-auto min-w-30 h-14 px-4
                     rounded-[14px]
                     border border-[#C27AFF4D]
                     bg-linear-to-r from-[#AD46FF1A] to-[#F6339A1A]
                     flex flex-col items-center justify-center text-center"
        >
          <div
            className={`text-xl sm:text-2xl leading-none ${FONTSIZE[30]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            {pending}
          </div>

          <div
            className={`text-[11px] sm:text-xs text-[#C27AFF] ${FONTSIZE[14]}`}
            style={{ fontWeight: WEIGHT.six }}
          >
            Pending Request
          </div>
        </div>

      </div>

      <AuditLogModal
        isOpen={openAudit}
        onClose={() => setOpenAudit(false)}
      />
    </div>
  );
}