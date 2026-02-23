import { X } from "lucide-react";
import { useState, useEffect } from "react";

type Building = {
  name: string;
  code: string;
  address: string;
  floors: number;
  units: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  building: Building;
};

export default function EditBuildingModal({
  open,
  onClose,
  building,
}: Props) {
  const [form, setForm] = useState<Building>(building);

  useEffect(() => {
    setForm(building);
  }, [building]);

  if (!open) return null;

  const handleChange = (key: keyof Building, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Updated Data:", form);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000CC] z-50 p-4">
      <div className="relative w-full max-w-2xl bg-[#101828F2] border border-[#FFFFFF33] rounded-2xl p-6 text-white shadow-xl">         <button
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
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          ✏️ Edit Building
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="text-sm opacity-80">Building Name *</label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm opacity-80">Building Code *</label>
            <input
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm opacity-80">Address *</label>
            <input
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

         

          

        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-white  border cursor-pointer border-[#FFFFFF33] rounded-full bg-[#FFFFFF1A]"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 py-3 text-white  cursor-pointer rounded-full bg-linear-to-r from-[#2B7FFF] to-[#0092B8] font-semibold"
          >
            Update Building
          </button>
        </div>

      </div>
    </div>
  );
}
