type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddBuildingModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000CC]  z-50 p-4">

      <div className="w-full max-w-2xl bg-[#101828F2] border border-[#FFFFFF33] rounded-2xl p-6 text-white shadow-xl">

        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          🏢 Add New Building
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="text-sm opacity-80">Building Name *</label>
            <input
              placeholder="Tower D"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm opacity-80">Building Code *</label>
            <input
              placeholder="TWR-D"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm opacity-80">Address *</label>
            <input
              placeholder="Enter address"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm opacity-80">Total Floors *</label>
            <input
              placeholder="Enter floors"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm opacity-80">Units per Floor *</label>
            <input
              placeholder="Enter units"
              className="w-full mt-1 p-3 rounded-lg bg-[#FFFFFF0D] border border-[#FFFFFF33] focus:outline-none"
            />
          </div>

        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 border cursor-pointer border-[#FFFFFF33] rounded-full bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] transition"
          >
            Cancel
          </button>

          <button className="flex-1 py-3 cursor-pointer rounded-full bg-linear-to-r from-[#2B7FFF] to-[#0092B8] font-semibold">
            Add Building
          </button>
        </div>

      </div>
    </div>
  );
}
