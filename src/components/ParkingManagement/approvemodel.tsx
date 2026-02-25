import { useState, useEffect } from "react";
import tick from "../../assets/parking/approved.png";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";
import approve from "../../assets/parking/approveee.png";
import tickk from "../../assets/parking/square.png";
import send from "../../assets/parking/send.png";
import { X } from "lucide-react";
import slot from "../../assets/parking/slot.png";

type VehicleType = "2W" | "4W";

interface SlotInfo {
  id: string;
  basement: string;
  occupied: boolean;
  occupant?: {
    name: string;
    unit: string;
    vehicle: string;
  };
  isPreferred?: boolean;
}

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedSlot: string) => void;

  requesterName: string;
  requesterUnit: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  vehicleNumber: string;
  preferredSlot: string;

  slots: SlotInfo[];
}

function SlotCard({
  slot,
  selected,
  onClick,
}: {
  slot: SlotInfo;
  selected: boolean;
  onClick: () => void;
}) {
  const isPreferred = slot.isPreferred;
  const isOccupied = slot.occupied;

  let bgColor = "bg-[#00C9501A]";
  if (isOccupied) bgColor = "bg-[#FB2C361A]  ";
  if (isPreferred) bgColor = "bg-[#AD46FF33]";
  if (selected) bgColor = "bg-purple-900/40";

  return (
    <button
      onClick={onClick}
      className={`rounded-xl p-3 text-left transition-all w-full border border-gray-700 hover:border-purple-400 ${bgColor}`}
    >
      <p
        className={`text-white font-semibold text-sm ${FONTSIZE[14]}`}
        style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
      >
        {slot.id}
      </p>

      <p
        className={`text-gray-400 text-xs mb-2 ${FONTSIZE[12]}`}
        style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
      >
        {slot.basement}
      </p>

      {isOccupied ? (
        <>
          <span className="inline-flex items-center gap-1 bg-[#FB2C36] text-white text-xs px-2 py-0.5 rounded-full mb-1">
            <X size={12} /> Occupied
          </span>

          {slot.occupant && (
            <div className="mt-1">
              <p
                className={`text-white text-xs font-medium ${FONTSIZE[12]}`}
                style={{ fontWeight: WEIGHT.six, color: COLORS.smalltext }}
              >
                {slot.occupant.name}
              </p>
              <p className="text-[#6A7282] text-xs">{slot.occupant.unit}</p>
              <p className="text-[#6A7282] text-xs">{slot.occupant.vehicle}</p>
            </div>
          )}
        </>
      ) : isPreferred ? (
        <span className="inline-flex items-center gap-1 bg-[#AD46FF] text-white text-xs px-2 py-0.5 rounded-full">
          ⭐ Preferred
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 bg-[#00C950] text-white text-xs px-2 py-0.5 rounded-full">
          <img src={tickk} className="w-3 h-3" />
          Available
        </span>
      )}
    </button>
  );
}

export default function ApproveModal({
  isOpen,
  onClose,
  onConfirm,
  requesterName,
  requesterUnit,
  vehicleType,
  vehicleModel,
  vehicleNumber,
  preferredSlot,
  slots,
}: ApproveModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>(preferredSlot);

  const preferredSlotInfo = slots.find((s) => s.id === preferredSlot);
  const isPreferredOccupied = preferredSlotInfo?.occupied ?? false;

  useEffect(() => {
    if (isOpen) setSelectedSlot(preferredSlot);
  }, [isOpen, preferredSlot]);

  if (!isOpen) return null;

  const slotsWithPreferred = slots.map((s) => ({
    ...s,
    isPreferred: s.id === preferredSlot,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6">
      <div className=" bg-linear-to-br from-[#0F172B] to-[#101828] border border-white/20 shadow-2xl rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <div className="flex flex-col items-center pt-6 sm:pt-8 pb-4 px-5 sm:px-6 text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#00C95033] border-2 border-[#05DF724D] flex items-center justify-center mb-3">
            <img src={tick} className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X size={18} className="text-gray-300" />
          </button>

          <h2
            className={`text-white text-lg sm:text-xl font-bold ${FONTSIZE[30]}`}
            style={{ fontWeight: WEIGHT.seven }}
          >
            Approve Parking Request
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Request from {requesterName} – Unit {requesterUnit}
          </p>
        </div>

        <div className="px-5 sm:px-6 pb-6 space-y-4">
          <div className="bg-[#FFFFFF0D] rounded-xl p-4 border border-[#FFFFFF1A]">
            <p className="text-white font-semibold text-sm mb-3">
              Request Details
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
              <div
                className={`${FONTSIZE[14]}`}
                style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
              >
                Vehicle Type:{" "}
                <span
                  className={`text-white font-medium ${FONTSIZE[14]}`}
                  style={{
                    fontWeight: WEIGHT.six,
                    color: COLORS.primary_white,
                  }}
                >
                  {vehicleType === "2W" ? "2-Wheeler" : "4-Wheeler"}
                </span>
              </div>

              <div
                className={`${FONTSIZE[14]}`}
                style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
              >
                Vehicle Number:{" "}
                <span
                  className={`text-white font-medium  ${FONTSIZE[14]}`}
                  style={{
                    fontWeight: WEIGHT.six,
                    color: COLORS.primary_white,
                  }}
                >
                  {vehicleNumber}
                </span>
              </div>

              <div
                className={`${FONTSIZE[14]}`}
                style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
              >
                Model:{" "}
                <span
                  className={`text-white font-medium  ${FONTSIZE[14]}`}
                  style={{
                    fontWeight: WEIGHT.six,
                    color: COLORS.primary_white,
                  }}
                >
                  {vehicleModel}
                </span>
              </div>

              <div
                className={`${FONTSIZE[14]}`}
                style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
              >
                Preferred Slot:{" "}
                <span
                  className={`text-[#C27AFF] font-medium ${FONTSIZE[14]}`}
                  style={{ fontWeight: WEIGHT.six }}
                >
                  ⭐ {preferredSlot}
                </span>
              </div>
            </div>
          </div>

          {isPreferredOccupied ? (
            <div className="bg-[#FB2C361A] border border-[#FF64674D] rounded-xl p-4 text-sm">
              <div className="flex items-center gap-2 text-[#FF6467] font-semibold mb-2">
                <img src={slot} className="w-4 h-4" />
                SLOT ALREADY OCCUPIED
              </div>

              <p
                className={`${FONTSIZE[14]}`}
                style={{
                  fontWeight: WEIGHT.seven,
                  color: COLORS.primary_white,
                }}
              >
                Currently Assigned To:{" "}
                <span
                  className={`${FONTSIZE[14]}`}
                  style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
                >
                  {preferredSlotInfo?.occupant?.name}
                </span>
              </p>
              <p
                className={`${FONTSIZE[14]}`}
                style={{
                  fontWeight: WEIGHT.seven,
                  color: COLORS.primary_white,
                }}
              >
                Unit:{" "}
                <span
                  className={`${FONTSIZE[14]}`}
                  style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
                >
                  {preferredSlotInfo?.occupant?.unit}
                </span>
              </p>
              <p
                className={`${FONTSIZE[14]}`}
                style={{
                  fontWeight: WEIGHT.seven,
                  color: COLORS.primary_white,
                }}
              >
                Vehicle:{" "}
                <span
                  className={`${FONTSIZE[14]}`}
                  style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
                >
                  {preferredSlotInfo?.occupant?.vehicle}
                </span>
              </p>

              <p
                className={`text-[#FF8904] text-xs mt-2 ${FONTSIZE[14]}`}
                style={{ fontWeight: WEIGHT.four }}
              >
                ⚠ Clicking "Confirm Approval" Will REASSIGN this slot and remove
                the previous assignment.
              </p>
            </div>
          ) : (
            <div className="bg-[#00C9501A] border border-[#05DF724D] rounded-xl p-3 flex items-center gap-2 text-[#05DF72] text-sm">
              <img src={approve} className="w-4 h-4" />
              Preferred slot {preferredSlot} is AVAILABLE
            </div>
          )}

          <div>
            <p className="text-white font-semibold text-sm mb-3">
              All {vehicleType === "2W" ? "2-Wheeler" : "4-Wheeler"} Slots:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slotsWithPreferred.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  selected={selectedSlot === slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={onClose}
              className="py-3 cursor-pointer rounded-xl bg-white/10 border border-white/20 text-white"
            >
              Cancel
            </button>

            <button
              onClick={() => onConfirm(selectedSlot)}
              className="py-3 cursor-pointer rounded-xl bg-linear-to-br from-[#00C950] to-[#009966] text-white flex items-center justify-center gap-2"
            >
              <img src={send} className="w-5 h-5" />
              Confirm Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
