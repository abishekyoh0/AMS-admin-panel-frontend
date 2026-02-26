import { useState } from "react";
import suggest from "../../assets/parking/suggested.png";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";
import send from "../../assets/parking/send.png";
import { X } from "lucide-react";

type Slot = {
  id: string;
  basement: string;
  occupied: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (slot: string, message: string) => void;
  requesterName: string;
  requesterUnit: string;
  vehicleType: string;
  vehicleNumber: string;
  vehicleModel: string;
  preferredSlot: string;
  slots: Slot[];
};

export default function SuggestAlternativeModal({
  isOpen,
  onClose,
  onSubmit,
  requesterName,
  requesterUnit,
  vehicleType,
  vehicleNumber,
  vehicleModel,
  preferredSlot,
  slots,
}: Props) {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const availableSlots = slots.filter((s) => !s.occupied);

  function handleSubmit() {
    if (!selectedSlot || !message) return;
    onSubmit(selectedSlot, message);
    setSelectedSlot("");
    setMessage("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000CC] backdrop-blur-sm p-3 sm:p-6">
    <div className=" bg-linear-to-br from-[#0F172B] to-[#101828] border border-white/20 shadow-2xl rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-[#2B7FFF33] border border-[#51A2FF4D] flex items-center justify-center">
            <img src={suggest} alt="icon" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
           <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X size={18} className="text-gray-300" />
          </button>

          <h2
            className={`text-white text-lg sm:text-xl font-semibold ${FONTSIZE[30]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            Suggest Alternative Slot
          </h2>

          <p
            className={`text-gray-400 text-xs sm:text-sm ${FONTSIZE[16]}`}
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

          <div className="flex justify-between">
            <span
              className={`${FONTSIZE[14]}`}
              style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
            >
              Preferred Slot:
            </span>
            <span
              className={`text-purple-400 ${FONTSIZE[14]}`}
              style={{ fontWeight: WEIGHT.six }}
            >
              ⭐ {preferredSlot}
            </span>
          </div>
        </div>

        <div className="bg-[#2B7FFF1A] border border-[#51A2FF4D] rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-blue-300">
          The preferred slot may be occupied. Suggest an alternative nearby
          slot.
        </div>

        <div className="space-y-2">
          <label
            className={`text-sm ${FONTSIZE[14]}`}
            style={{ fontWeight: WEIGHT.six, color: COLORS.primary_white }}
          >
            Select Alternative Slot *
          </label>

          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a slot</option>
            {availableSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.id} ({slot.basement})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            className={`text-sm ${FONTSIZE[14]}`}
            style={{ fontWeight: WEIGHT.six, color: COLORS.primary_white }}
          >
            Message to Resident *
          </label>

          <textarea
            rows={4}
            placeholder="Explain why you're suggesting an alternative slot..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onClose}
            className={`py-3 rounded-xl cursor-pointer bg-[#1a1f2e] text-white text-sm border border-gray-700 hover:bg-[#222836] transition-colors ${FONTSIZE[16]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`py-3 cursor-pointer rounded-xl bg-linear-to-br from-[#2B7FFF] to-[#0092B8] shadow-[#2B7FFF40] text-white text-sm flex items-center justify-center gap-2 transition-colors ${FONTSIZE[16]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            <img src={send} alt="icon" className="w-5 h-5 sm:w-6 sm:h-6" />
            Send Suggestion
          </button>
        </div>
      </div>
    </div>
  );
}
