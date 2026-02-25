import activeFourWheel from "../../../assets/parking/fourwheeling.png";
import inactiveTwoWheel from "../../../assets/parking/twowheeling.png";
import activeTwoWheel from "../../../assets/parking/Active2w.png";
import inactiveFourWheel from "../../../assets/parking/inActive4w.png";
import createicon from "../../../assets/parking/createicon.png";
import createbutton from "../../../assets/parking/createbutton.png";
import { useState } from "react";
import { FONTSIZE, FONTWEIGHT } from "../../../constent/uiconstent";
import { X } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
};

export default function AddParkingSlot({ onClose }: Props) {
  const [vehicleType, setVehicleType] = useState<"2W" | "4W">("4W");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full sm:w-[90%] md:w-[600px] lg:w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0F172B] to-[#101828] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl relative ">
        <div className="text-center mb-6">
          <div className="w-19 h-19 mx-auto mb-3 rounded-full flex items-center justify-center bg-gradient-to-br from-[#AD46FF33] to-[#F6339A33] border border-[#C27AFF4D] ">
            <img src={createicon} alt="" />
          </div>
          <h2 className={`${FONTSIZE[30]} ${FONTWEIGHT[700]}`}>
            Create New Parking Slot
          </h2>
          <p className={`${FONTSIZE[16]} ${FONTWEIGHT[400]} text-[#99A1AF]`}>
            Add a new parking slot to the system
          </p>
        </div>
        <div
          className="absolute top-4 right-4 p-2 rounded-full cursor-pointer hover:bg-[#2a2c30]"
          onClick={onClose}
        >
          <X />
        </div>
        <div className="space-y-4">
          <div>
            <label
              className={`${FONTSIZE[14]} ${FONTWEIGHT[600]} text-[#FFFFFF] `}
            >
              Slot Number *
            </label>
            <input
              placeholder="e.g., B2-A-120"
              className="w-full mt-1 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label
              className={`${FONTSIZE[14]} ${FONTWEIGHT[600]} text-[#FFFFFF] `}
            >
              Floor / Location *
            </label>
            <input className="w-full mt-1 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg px-4 py-2 text-sm" />
          </div>
          <div>
            <label
              className={`${FONTSIZE[14]} ${FONTWEIGHT[600]} text-[#FFFFFF] `}
            >
              Vehicle Type *
            </label>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setVehicleType("2W")}
                className={`flex-1 py-3 rounded-xl border cursor-pointer transition-all ${
                  vehicleType === "2W"
                    ? "border-[#05DF7280] bg-[#00C95033]"
                    : "border-[#FFFFFF1A] bg-[#FFFFFF0D]"
                }`}
              >
                <img
                  src={vehicleType === "2W" ? activeTwoWheel : inactiveTwoWheel}
                  className="w-6 mx-auto mb-1"
                  alt="2 wheeler"
                />
                <p
                  className={`${FONTSIZE[16]} ${FONTWEIGHT[700]} ${
                    vehicleType === "2W" ? "text-white" : "text-[#99A1AF]"
                  }`}
                >
                  2-Wheeler
                </p>
              </button>
              <button
                type="button"
                onClick={() => setVehicleType("4W")}
                className={`flex-1 py-3 rounded-xl border cursor-pointer transition-all ${
                  vehicleType === "4W"
                    ? "border-[#51A2FF80] bg-[#2B7FFF33]"
                    : "border-[#FFFFFF1A] bg-[#FFFFFF0D]"
                }`}
              >
                <img
                  src={
                    vehicleType === "4W" ? activeFourWheel : inactiveFourWheel
                  }
                  className="w-6 mx-auto mb-1"
                  alt="4 wheeler"
                />
                <p
                  className={`${FONTSIZE[16]} ${FONTWEIGHT[700]} ${
                    vehicleType === "4W" ? "text-white" : "text-[#99A1AF]"
                  }`}
                >
                  4-Wheeler
                </p>
              </button>
            </div>
          </div>
          <div>
            <label
              className={`${FONTSIZE[14]} ${FONTWEIGHT[600]} text-[#FFFFFF] `}
            >
              Initial Status *
            </label>
            <select className="w-full mt-1 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg px-4 py-2 text-sm">
              <option value="Available" className="bg-[#0F172B]">
                Available
              </option>
              <option value="Occupied" className="bg-[#0F172B]">
                Occupied
              </option>
              <option value="Maintenance" className="bg-[#0F172B]">
                Maintenance
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-6 gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-[#FFFFFF33] text-sm bg-[#FFFFFF0D] cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onClose();
              toast.success("Parking slot Updated successfully!");
            }}
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#AD46FF] to-[#E60076] text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <img src={createbutton} alt="" />
            Create Slot
          </button>
        </div>
      </div>
    </div>
  );
}
