import { FONTSIZE, FONTWEIGHT } from "../../../constent/uiconstent";
import deleteicon from "../../../assets/parking/deleteiconsparking.png";
import { X } from "lucide-react";

type DeleteParkingSlotProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteParkingSlot({
  onConfirm,
  onCancel,
}: DeleteParkingSlotProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full sm:w-[90%] md:w-[500px]  bg-gradient-to-br from-[#0F172B] to-[#101828] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <X size={18} className="text-gray-300" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-500/20 border border-red-500/40">
            <img src={deleteicon} alt="delete icon" className="w-7 h-7" />
          </div>
          <h2 className={`${FONTSIZE[30]} ${FONTWEIGHT[700]} text-white`}>
            Delete Parking Slot
          </h2>
          <p
            className={`${FONTSIZE[16]} ${FONTWEIGHT[400]} text-[#99A1AF] mt-2`}
          >
            Are you sure you want to delete this parking slot? This action
            cannot be undone.
          </p>
        </div>
        <div className="flex gap-4 justify-center mt-8 ">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-[#FFFFFF0D]  hover:opacity-90 transition cursor-pointer flex items-center"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#FB2C36] to-[#EC003F] hover:opacity-90 transition cursor-pointer flex items-center"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
