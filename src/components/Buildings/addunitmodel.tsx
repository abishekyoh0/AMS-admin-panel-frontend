import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddUnitModal({ open, onClose }: Props) {
  const [unitNumber, setUnitNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [rent, setRent] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000CC]  z-50 p-4">
     <div className="relative w-95 max-w-2xl bg-[#101828F2] border border-[#FFFFFF33] rounded-2xl p-6 text-white shadow-xl">         <button
  type="button"
  onClick={onClose}
  className="
    absolute top-4 right-4
    sm:top-6 sm:right-6
    w-8 h-8 sm:w-10 sm:h-10
    flex items-center justify-center
    rounded-full
    hover:opacity-70
   
    text-white font-bold
    cursor-pointer
    transition
    shadow-md
  "
  aria-label="Close"
>
  <X />
</button>
        <h2 className="text-xl font-semibold mb-6">+ Add Unit</h2>

        <label className="text-sm opacity-80">Unit Number *</label>
        <input
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
          placeholder="e.g., A-401"
          className="w-full mt-1 mb-4 px-4 py-2 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none focus:border-[#2B7FFF]"
        />

        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <label className="text-sm opacity-80">Floor *</label>
            <input
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none focus:border-[#2B7FFF]"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm opacity-80">Rent ($) *</label>
            <input
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none focus:border-[#2B7FFF]"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-white  rounded-full border border-[#FFFFFF33] cursor-pointer bg-[#FFFFFF1A] hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            className="flex-1 py-2 rounded-full cursor-pointer bg-linear-to-r from-[#00C950] to-[#009966] text-white  font-semibold hover:opacity-90 transition"
          >

            Add Unit
          </button>
        </div>
      </div>
    </div>
  );
}
