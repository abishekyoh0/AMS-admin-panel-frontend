import { X } from "lucide-react";
import buildingIcon from "../../assets/Dashboard/building.png"
import {  COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddBuildingModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000CC]  z-50 p-4">

<div className="relative w-full max-w-2xl bg-[#101828F2] border border-[#FFFFFF33] rounded-2xl p-6 text-white shadow-xl">         
  <button
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

        <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${FONTSIZE[30]}`} style={{fontWeight:WEIGHT.seven,color:COLORS.primary_white}}>
                  <img src={buildingIcon} alt="building" className="w-7 h-7" />

           Add New Building
           
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className={`text-sm opacity-80 ${FONTSIZE[14]}`}
            style={{fontWeight:WEIGHT.four,color:COLORS.cardsubhead}}>Building Name *</label>
            <input
              placeholder="Tower D"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div>
            <label className={`text-sm opacity-80 ${FONTSIZE[14]}`}
            style={{fontWeight:WEIGHT.four,color:COLORS.cardsubhead}}>Building Code *</label>
            <input
              placeholder="TWR-D"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className={`text-sm opacity-80 ${FONTSIZE[14]}`}
            style={{fontWeight:WEIGHT.four,color:COLORS.cardsubhead}}>Address *</label>
            <input
              placeholder="Enter address"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div>
            <label className={`text-sm opacity-80 ${FONTSIZE[14]}`}
            style={{fontWeight:WEIGHT.four,color:COLORS.cardsubhead}}>Total Floors *</label>
            <input
              placeholder="Enter floors"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div>
            <label className={`text-sm opacity-80 ${FONTSIZE[14]}`}
            style={{fontWeight:WEIGHT.four,color:COLORS.cardsubhead}}>Units per Floor *</label>
            <input
              placeholder="Enter units"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className={`flex-1 py-3 border text-white cursor-pointer border-[#FFFFFF33] rounded-full bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] transition ${FONTSIZE[16]}`}
          style={{fontWeight:WEIGHT.seven}}>
            Cancel
          </button>

          <button className={`flex-1 py-3 text-white  cursor-pointer rounded-full bg-linear-to-r from-[#2B7FFF] to-[#0092B8] font-semibold ${FONTSIZE[16]}`}
           style={{fontWeight:WEIGHT.seven}}>
            Add Building
          </button>
        </div>

      </div>
    </div>
  );
}
