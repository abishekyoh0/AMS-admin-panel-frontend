import { useState } from "react";
import reject from "../../assets/parking/reject.png";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";
import send from "../../assets/parking/send.png";
import { X } from "lucide-react";

type RejectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  requesterName: string;
  requesterUnit: string;
  vehicleType: string;
  vehicleNumber: string;
  vehicleModel: string;
};

export default function RejectModal({
  isOpen,
  onClose,
  onConfirm,
  requesterName,
  requesterUnit,
  vehicleType,
  vehicleNumber,
  vehicleModel,
}: RejectModalProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError(
        "Please provide a clear reason for rejection to help the resident understand.",
      );
      return;
    }

    onConfirm(reason);
    setReason("");
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 sm:px-4">
      <div className=" bg-linear-to-br from-[#0F172B] to-[#101828] border border-white/20 shadow-2xl rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FB2C3633] border border-[#FF64674D] flex items-center justify-center mb-3">
            <img src={reject} alt="icon" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
           <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X size={18} className="text-gray-300" />
          </button>

          <h2
            className={`text-lg sm:text-xl font-semibold text-white ${FONTSIZE[30]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            Reject Parking Request
          </h2>

          <p
            className={`text-xs sm:text-sm text-gray-400 mt-1 ${FONTSIZE[16]}`}
            style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
          >
            Request from {requesterName} - {requesterUnit}
          </p>
        </div>

        <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg p-3 sm:p-4 text-sm text-gray-300 space-y-2">
          <span
            className={`${FONTSIZE[18]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            Request Details
          </span>

          <div className="flex justify-between mt-2">
            <span
              className={`${FONTSIZE[14]}`}
              style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
            >
              Vehicle Type:
            </span>
            <span
              className={`${FONTSIZE[14]}`}
              style={{ fontWeight: WEIGHT.six, color: COLORS.primary_white }}
            >
              {vehicleType === "4W" ? "4-Wheeler" : "2-Wheeler"}
            </span>
          </div>

          <div className="flex justify-between">
            <span
              className={`${FONTSIZE[14]}`}
              style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
            >
              Vehicle Number:
            </span>
            <span
              className={`${FONTSIZE[14]}`}
              style={{ fontWeight: WEIGHT.six, color: COLORS.primary_white }}
            >
              {vehicleNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span
              className={`${FONTSIZE[14]}`}
              style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
            >
              Model:
            </span>
            <span
              className={`${FONTSIZE[14]}`}
              style={{ fontWeight: WEIGHT.six, color: COLORS.primary_white }}
            >
              {vehicleModel}
            </span>
          </div>
        </div>

        {error && (
          <div
            className={`mt-3 text-xs sm:text-sm text-[#FF6467] bg-[#FB2C361A] border border-[#FF64674D] p-2 rounded-lg ${FONTSIZE[14]}`}
            style={{ fontWeight: WEIGHT.four }}
          >
            {error}
          </div>
        )}

        <div className="mt-4 sm:mt-5">
          <label
            className={`text-sm text-gray-300 mb-2 block ${FONTSIZE[14]}`}
            style={{ fontWeight: WEIGHT.six, color: COLORS.primary_white }}
          >
            Rejection Reason *
          </label>

          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError("");
            }}
            placeholder="Explain why you're rejecting this request..."
            className="w-full h-24 sm:h-28 resize-none rounded-lg bg-white/5 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm text-white p-3 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <button
            onClick={onClose}
            className={`py-2.5 sm:py-3 rounded-xl cursor-pointer bg-[#1a1f2e] text-white text-sm border border-gray-700 hover:bg-[#222836] transition-colors ${FONTSIZE[16]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`py-2.5 sm:py-3 cursor-pointer rounded-xl bg-linear-to-br from-[#FB2C36] to-[#EC003F] shadow-[#FB2C3640] text-white text-sm flex items-center justify-center gap-2 transition-colors ${FONTSIZE[16]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            <img src={send} alt="icon" className="w-5 h-5 sm:w-6 sm:h-6" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
