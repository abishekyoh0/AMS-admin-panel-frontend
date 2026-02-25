import React, { useEffect } from "react";
import type { FormData } from "../../pages/AccessManagement/AccessManagement";
import documents from "../../assets/access/document.png";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  form: FormData | null;
}

const MoveInDetailsModal: React.FC<Props> = ({ isOpen, onClose, form }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // if (!isOpen || !form) return null;

  if (!isOpen || !form) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className=" relative bg-[#180F2B] text-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn
      "
      >
        {/* Scrollable Content Wrapper */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Header */}
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
                <h2 className="text-lg sm:text-xl font-bold">
                  Move-IN Form Details
                </h2>
                <p className="text-[#99A1AF] text-xs sm:text-sm">
                  Form ID: {form.id}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="px-3 py-1 text-xs rounded-full bg-[#733E0AE5] border border-[#894B00] text-[#FDC700]">
                {form.status}
              </span>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-xl font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tenant Info */}
              <div className="bg-[#302741] p-4 rounded-xl">
                <h3 className="font-semibold mb-3 text-sm sm:text-base">
                  Tenant Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#99A1AF]">Full Name</p>
                    <p>{form.name}</p>
                  </div>
                  <div>
                    <p className="text-[#99A1AF]">Phone Number</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-[#99A1AF]">Email Address</p>
                    <p>john.smith@email.com</p>
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="bg-[#302741] p-4 rounded-xl">
                <h3 className="font-semibold mb-3 text-sm sm:text-base">
                  Property Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#99A1AF]">Property Address</p>
                    <p>{form.property}</p>
                  </div>
                  <div>
                    <p className="text-[#99A1AF]">Move-In Date</p>
                    <p>{form.moveInDate}</p>
                  </div>
                </div>
              </div>

              {/* Financial Info */}
              <div className="bg-[#302741] p-4 rounded-xl">
                <h3 className="font-semibold mb-3 text-sm sm:text-base">
                  Financial Details
                </h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#99A1AF]">Deposit Amount</span>
                    <span>$3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#99A1AF]">Maintenance</span>
                    <span>$1,250</span>
                  </div>
                  <hr className="border-gray-600 my-2" />
                  <div className="flex justify-between font-semibold text-cyan-400">
                    <span>Total Amount</span>
                    <span>$6,250</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="bg-[#FFFFFF1A] p-4 rounded-xl space-y-4">
              <h3 className="font-semibold text-sm sm:text-base">
                Form Summary
              </h3>

              <div className="text-sm space-y-2">
                <p className="text-[#99A1AF]">Status</p>
                <span className="px-3 py-1 text-xs rounded-full bg-[#733E0AE5] border border-[#894B00] text-[#FDC700]">
                  {form.status}
                </span>
              </div>

              <div>
                <p className="text-[#99A1AF] text-sm">Submitted Date</p>
                <p className="text-sm">{form.submitted}</p>
              </div>

              <div>
                <p className="text-[#99A1AF] text-sm">Form ID</p>
                <p className="text-sm">{form.id}</p>
              </div>

              <button className="w-full cursor-pointer py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition">
                Approve
              </button>

              <button
                onClick={onClose}
                className="w-full cursor-pointer py-2 rounded-lg border border-gray-600 hover:bg-white/5 transition"
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

export default MoveInDetailsModal;
