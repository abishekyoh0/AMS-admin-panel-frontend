import React, { useState, useEffect, useRef } from "react";
import tick from "../../assets/complaint/tick.png";
import worker from "../../assets/complaint/worker.png";
import paper from "../../assets/complaint/paper.png";

interface Complaint {
  id: string;
  resident: string;
  block: string;
  category: string;
  title: string;
  priority: string;
  status: string;
  assignedTo: string;
  createdAt: string;
  resolvedAt?: string;
  description?: string;
}

interface Props {
  complaint?: Complaint;
  onClose?: () => void;
  openAssignModal?: boolean;   // 👈 add
}

const ComplaintDetails: React.FC<Props> = ({
  complaint,
  onClose,
  openAssignModal
}) => {

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignTo, setAssignTo] = useState("");
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolvedAt, setResolvedAt] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [complaint]);

  useEffect(() => {
    setAssignTo(complaint?.assignedTo || "");
  }, [complaint]);

  useEffect(() => {
    if (openAssignModal) {
      setAssignTo(complaint?.assignedTo || "");
      setShowAssignModal(true);
    }
  }, [openAssignModal, complaint]);

  if (!complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No Complaint Data Found
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6">
      {/* Main Container */}
      <div className="bg-[#101828] w-full max-w-4xl h-[95vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 text-white scroll-smooth"
        >
          
<div className="flex justify-between items-start sm:items-center mb-6 pb-4 border-b border-white/10">

  {/* Left Section */}
  <div>
    <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
      <img
        src={paper}
        alt="paper"
        className="w-5 h-5 sm:w-6 sm:h-6"
      />
      Complaint Details
    </h2>

    <p className="text-[#00D3F3] font-semibold mt-2">
      {complaint.id}
    </p>
  </div>

  {/* Right Section */}
  <div className="flex items-center gap-3">

    <span className="px-3 py-1 text-xs rounded-full bg-[#FF690033] text-[#FF8904]">
      {complaint.priority}
    </span>

    <span className="px-3 py-1 text-xs rounded-full bg-[#F0B10033] text-[#FDC700]">
      {complaint.status}
    </span>

    <button
      onClick={onClose}
      className="ml-2 p-2 rounded-full hover:bg-white/10 transition"
    >
      ✕
    </button>

  </div>
</div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-[#99A1AF]">Resident</p>
              <p className="mt-1">{complaint.resident}</p>
            </div>

            <div>
              <p className="text-[#99A1AF]">Unit</p>
              <p className="mt-1">{complaint.block}</p>
            </div>

            <div>
              <p className="text-[#99A1AF]">Category</p>
              <p className="mt-1">{complaint.category}</p>
            </div>

            <div>
              <p className="text-[#99A1AF]">Assigned To</p>
              <p className="mt-1">{assignTo || "Not Assigned"}</p>
            </div>

            <div>
              <p className="text-[#99A1AF]">Created</p>
              <p className="mt-1">
                {new Date(complaint.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[#99A1AF]">Resolved</p>
              <p className="mt-1">
                {complaint.resolvedAt
                  ? new Date(complaint.resolvedAt).toLocaleString()
                  : resolvedAt
                    ? new Date(resolvedAt).toLocaleString()
                    : "N/A"}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[#99A1AF]">Title</p>
              <p className="mt-1">{complaint.title}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[#99A1AF]">Description</p>
              <div className="mt-2 p-4 bg-white/10 rounded-xl text-gray-200 whitespace-pre-wrap break-words">
                {complaint.description || "No description provided."}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <h3 className="text-sm text-[#99A1AF] mb-4">Quick Actions</h3>

            <div className="flex flex-col sm:flex-row gap-4">
              {complaint.status !== "RESOLVED" && (
                <button
                  onClick={() => {
                    setAssignTo("");
                    setShowAssignModal(true);
                  }}
                  className="flex-1 py-2 rounded-xl bg-[#AD46FF33] border border-[#C27AFF4D] text-[#C27AFF] hover:bg-purple-700 transition"
                >
                  Reassign
                </button>
              )}

              {complaint.status !== "RESOLVED" && (
                <button
                  onClick={() => {
                    const now = new Date().toISOString();
                    setResolvedAt(now);
                    setShowResolveModal(true);
                  }}
                  className="flex items-center justify-center gap-2 flex-1 py-2 rounded-xl bg-[#00C95033] border border-[#05DF724D] text-[#05DF72] hover:bg-green-700 transition"
                >
                  <img src={tick} alt="tick" className="w-4 h-4" />
                  Mark Resolved
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0B1220]">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#AD46FF] to-[#E60076] font-semibold"
          >
            Close
          </button>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[10000] p-4">
          <div className="w-full max-w-md bg-[#101828] rounded-2xl p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <img src={worker} alt="worker" className="w-5 h-5" />
              Assign Complaint
            </h3>
            Assigned to
            <input
              type="text"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              placeholder=""
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none"
            />
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 py-2 rounded-full bg-gray-400 text-black"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!assignTo.trim()) return;
                  setShowAssignModal(false);
                }}
                className="flex-1 py-2 rounded-full bg-gradient-to-r from-[#AD46FF] to-[#E60076]"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-900 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-green-400">
              Complaint Resolved
            </h3>

            <p className="text-sm text-gray-300 mb-2">
              Complaint ID: {complaint.id}
            </p>

            <p className="text-sm text-gray-300 mb-4">
              Resolved On:
              <span className="block mt-1 text-white">
                {resolvedAt ? new Date(resolvedAt).toLocaleString() : ""}
              </span>
            </p>

            <button
              onClick={() => setShowResolveModal(false)}
              className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintDetails;
