import React from "react";
import type { AccessRequestData } from "../../components/AccessManagement/AccessRequestCard";
import card from "../../assets/access/card.png";
import finger from "../../assets/access/finger.png";
import phone from "../../assets/access/phone.png";
import key from "../../assets/access/key.png";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: AccessRequestData | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-600/20 text-green-400";
    case "Pending":
      return "bg-yellow-600/20 text-yellow-400";
    case "Active":
      return "bg-green-600/20 text-green-400";
    default:
      return "bg-gray-600/20 text-gray-400";
  }
};
const getTypeIcon = (type: string) => {
  switch (type) {
    case "Access Card":
      return card;
    case "Fingerprint Access":
      return finger;
    case "Phone/Call Access":
      return phone;
    case "Common Access Card":
      return key;
    default:
      return "";
  }
};
const AccessRequestModal: React.FC<Props> = ({
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
      className="absolute inset-0 bg-[#120F23]/90 backdrop-blur-sm"
      onClick={onClose}
    />

    {/* Modal */}
    <div
      className="
        relative
        w-full
        max-w-5xl
        max-h-[90vh]
        bg-[#180F2B]
        rounded-2xl
        text-white
        shadow-2xl
        overflow-hidden
        flex
        flex-col
        animate-fadeIn
      "
    >
      {/* Scrollable Wrapper */}
      <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

          {/* Left */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFFFFF33] flex items-center justify-center">
              <img
                src={getTypeIcon(data.type)}
                alt={data.type}
                className="w-5 h-5 object-contain"
              />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                {data.type}
              </h2>

              <span
                className={`mt-2 inline-block px-3 py-1 text-xs rounded-full ${getStatusColor(
                  data.status
                )}`}
              >
                {data.status}
              </span>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="self-end sm:self-start text-gray-400 hover:text-white text-xl font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* REQUEST INFO */}
        <div className="bg-[#FFFFFF1A] p-4 sm:p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            Request Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Request ID</p>
              <p>ar-{data.id}</p>
            </div>

            <div>
              <p className="text-gray-400 mb-1">Submitted Date</p>
              <p>{data.submitted}, 5:30 AM</p>
            </div>
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="bg-[#FFFFFF1A] p-4 sm:p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div>
              <p>Full Name</p>
              <p>{data.name}</p>
            </div>

            <div>
              <p>Email</p>
              <p>{data.email}</p>
            </div>

            <div>
              <p>Phone Number</p>
              <p>+1 (555) 111-2222</p>
            </div>

            <div>
              <p>Unit Number</p>
              <p>{data.unit}</p>
            </div>
          </div>
        </div>

        {/* CARD DETAILS */}
        <div className="bg-[#FFFFFF1A] p-4 sm:p-6 rounded-xl">
          <h3 className="font-semibold mb-6 text-sm sm:text-base">
            Card Details
          </h3>

          {data.type === "Fingerprint Access" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
              <div>
                <p>Card Type</p>
                <p>Standard</p>
              </div>
              <div>
                <p>Delivery Method</p>
                <p>Pick-up</p>
              </div>
              <div>
                <p>Urgency</p>
                <p>Standard</p>
              </div>
            </div>
          ) : (
            <>
              {/* Card Type */}
              <div className="mb-6">
                <p className="text-sm mb-3">Card Type</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="h-10 rounded-lg bg-[#00D3F3] text-black cursor-pointer font-medium">
                    Standard
                  </button>
                  <button className="h-10 rounded-lg cursor-pointer bg-[#FFFFFF33] text-white font-medium">
                    Premium
                  </button>
                </div>
              </div>

              {/* Additional Cards */}
              <div className="mb-6">
                <p className="text-sm mb-3">Number of Additional Cards</p>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      className="h-10 rounded-lg cursor-pointer bg-[#FFFFFF33] text-white font-medium"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div className="mb-6">
                <p className="text-sm mb-3">Delivery Method</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="h-10 rounded-lg cursor-pointer bg-[#00D3F3] text-black font-medium">
                    Pick-up
                  </button>
                  <button className="h-10 rounded-lg bg-[#FFFFFF33] cursor-pointer text-white font-medium">
                    Mail
                  </button>
                </div>
              </div>

              {/* Urgency */}
              <div className="mb-6">
                <p className="text-sm mb-3">Urgency</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button className="h-10 rounded-lg cursor-pointer bg-[#00D3F3] text-black font-medium">
                    Standard
                  </button>
                  <button className="h-10 rounded-lg cursor-pointer bg-[#FFFFFF33] text-white font-medium">
                    Rush
                  </button>
                  <button className="h-10 rounded-lg cursor-pointer bg-[#FFFFFF33] text-white font-medium">
                    Emergency
                  </button>
                </div>
              </div>

              {/* Reason */}
              <div className="mb-6">
                <p className="text-sm mb-3">Reason for Request</p>
                <textarea
                  placeholder="Optional: Explain your request"
                  className="w-full h-24 p-4 rounded-lg bg-[#FFFFFF33] cursor-pointer  border border-gray-600 resize-none text-white placeholder-gray-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                <button className="w-full cursor-pointer sm:w-36 h-11 bg-[#00D3F3] text-black font-semibold rounded-lg">
                  Approve
                </button>

                <button
                  onClick={onClose}
                  className="w-full cursor-pointer sm:w-36 h-11 border border-gray-600 text-white rounded-lg hover:bg-[#2a2a45] transition"
                >
                  Reject
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  </div>
);
};

export default AccessRequestModal;