import React from "react";
import type { MoveOutData } from "../../components/AccessManagement/MoveOutCard";
import documents from "../../assets/access/document.png"
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: MoveOutData | null;
}

const MoveOutDetailsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  data,
}) => {
  // if (!isOpen || !data) return null;

 if (!isOpen || !data) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    />

    {/* Modal */}
    <div
      className="
        relative
        bg-[#180F2B]
        w-full
        max-w-6xl
        max-h-[90vh]
        rounded-2xl
        text-white
        shadow-2xl
        overflow-hidden
        flex
        flex-col
        animate-fadeIn
      "
    >
      {/* Scrollable Content */}
      <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#302741] flex items-center justify-center">
              <img
                src={documents}
                alt="Document"
                className="w-5 h-5 object-contain"
              />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Move-OUT Form Details
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Form ID: mo-{data.id}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="px-4 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-400">
              {data.status}
            </span>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl font-bold transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tenant & Property */}
            <div className="bg-[#FFFFFF1A] p-4 sm:p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-sm sm:text-base">
                Tenant & Property Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Tenant Name</p>
                  <p>{data.name}</p>
                </div>

                <div>
                  <p className="text-gray-400 mb-1">Tower Name</p>
                  <p>{data.property}</p>
                </div>

                <div>
                  <p className="text-gray-400 mb-1">Unit No</p>
                  <p>301</p>
                </div>

                <div>
                  <p className="text-gray-400 mb-1">Move-Out Date</p>
                  <p>{data.moveOutDate}</p>
                </div>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="bg-[#FFFFFF1A] p-4 sm:p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-sm sm:text-base">
                Financial Breakdown
              </h3>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between">
                  <span>Original Deposit</span>
                  <span>{data.original}</span>
                </div>

                <div>
                  <p className="text-gray-400 mb-2">Deductions:</p>

                  <div className="flex justify-between">
                    <span>• Damage Repair</span>
                    <span className="text-[#FF6467]">-450</span>
                  </div>

                  <div className="flex justify-between">
                    <span>• Professional Cleaning</span>
                    <span className="text-[#FF6467]">-200</span>
                  </div>

                  <div className="flex justify-between">
                    <span>• Outstanding Utilities</span>
                    <span className="text-[#FF6467]">-150</span>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-3 flex justify-between">
                  <span>Total Deductions</span>
                  <span className="text-[#FF6467]">{data.deductions}</span>
                </div>

                <div className="border-t border-gray-600 pt-3 flex justify-between font-semibold">
                  <span>Refund Amount</span>
                  <span className="text-[#05DF72]">{data.refund}</span>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#FFFFFF1A] p-4 sm:p-6 rounded-xl space-y-6">

            <h3 className="font-semibold text-sm sm:text-base">
              Form Summary
            </h3>

            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <span className="px-3 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-400">
                {data.status}
              </span>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Submitted Date</p>
              <p className="text-sm">2/28/2024</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Form ID</p>
              <p className="text-sm">mo-{data.id}</p>
            </div>

            {/* Refund Box */}
            <div className="bg-[#0D542B33] border border-[#016630] p-4 rounded-lg">
              <p className="text-xs text-gray-400">
                Refund in Process
              </p>
              <p className="text-xl sm:text-2xl text-[#05DF72] font-semibold">
                {data.refund}
              </p>
              <p className="text-xs text-gray-400">
                Processing: 3–5 business days
              </p>
            </div>

            <button className="w-full py-2 bg-[#2B7FFF] rounded-lg cursor-pointer hover:bg-blue-700 transition">
              Approve
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 border border-gray-600 cursor-pointer rounded-lg hover:bg-white/5 transition"
            >
              Back to List
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default MoveOutDetailsModal;