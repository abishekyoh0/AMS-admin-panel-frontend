import { useState } from "react";
import AddUnitModal from "./addunitmodel";
import plus from "../../assets/building/plus.png"

type Unit = {
  unit: string;
  floor: string;
  resident: string;
  rent: string;
  status: "Occupied" | "Vacant";
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function UnitsModal({ open, onClose }: Props) {
  if (!open) return null;

  const units: Unit[] = [
    { unit: "A-101", floor: "Floor 1", resident: "John Doe", rent: "$1200", status: "Occupied" },
    { unit: "A-102", floor: "Floor 1", resident: "Bob Wilson", rent: "$1200", status: "Occupied" },
    { unit: "A-103", floor: "Floor 1", resident: "-", rent: "$1200", status: "Vacant" },
    { unit: "A-304", floor: "Floor 3", resident: "Sarah Johnson", rent: "$1350", status: "Occupied" },
  ];
  const [openAddUnit, setOpenAddUnit] = useState(false);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000CC]  z-50 p-4">
      
      <div className="w-full max-w-4xl bg-[#101828F2] border border-[#FFFFFF33] rounded-2xl p-6 text-white shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Units in Tower A</h2>
            <p className="text-sm opacity-60">TWR-A</p>
          </div>

       
<button
onClick={() => setOpenAddUnit(true)}
  className="w-32 h-12 flex items-center justify-center rounded-full cursor-pointer bg-linear-to-r from-[#00C950] to-[#009966] text-white font-semibold hover:opacity-90 transition"
>
  <img src={plus} alt="building" className="w-4 h-4" />

    Add Unit
</button>


        </div>

        <div className="overflow-x-auto bg-[#FFFFFF0D] rounded-xl border border-[#FFFFFF33]">
          <table className="w-full text-sm">
            <thead className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-left">
              <tr>
                <th className="p-3">Unit</th>
                <th className="p-3">Floor</th>
                <th className="p-3">Resident</th>
                <th className="p-3">Rent</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {units.map((u, i) => (
                <tr key={i} className="border-t border-[#FFFFFF1A]">
                  <td className="p-3">{u.unit}</td>
                  <td className="p-3 opacity-70">{u.floor}</td>
                  <td className="p-3 opacity-70">{u.resident}</td>
                  <td className="p-3">{u.rent}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${u.status === "Occupied"
                          ? "bg-[#00C95033] text-[#05DF72]"
                          : "bg-[#FF690033] text-[#FF8904]"}
                      `}
                    >
                      {u.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 text-white  cursor-pointer rounded-full border border-[#FFFFFF33] bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] transition"
        >
          Close
        </button>
   


      </div>
           <AddUnitModal
  open={openAddUnit}
  onClose={() => setOpenAddUnit(false)}
/>
    </div>
  );
}
