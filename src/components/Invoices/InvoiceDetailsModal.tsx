import React, { useState } from "react";
import type { Invoice } from "../../pages/Invoices/Invoices";
import { X } from "lucide-react";
import tick from "../../assets/invoice/tick.png";
import close from "../../assets/invoice/close.png";
import { FONTSIZE as $styles, FONTWEIGHT } from "../../constent/uiconstent";

interface Props {
  invoice: Invoice;
  onClose: () => void;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

const InvoiceDetailsModal: React.FC<Props> = ({
  invoice,
  onClose,
  setInvoices,
}) => {
  const [confirmType, setConfirmType] = useState<"PAID" | "CANCEL" | null>(null);

  const getStatusColor = () => {
    switch (invoice.status) {
      case "PAID":
        return "bg-[#00C95033] text-[#05DF72]";
      case "PENDING":
        return "bg-[#F0B10033] text-[#FDC700]";
      case "OVERDUE":
        return "bg-[#FB2C3633] text-[#FF6467]";
      case "CANCELLED":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "";
    }
  };

  const handleConfirm = () => {
    if (confirmType === "PAID") {
      const today = new Date().toISOString().split("T")[0];

      setInvoices((prev) =>
        prev.map((i) =>
          i.id === invoice.id
            ? { ...i, status: "PAID", paidDate: today }
            : i
        )
      );
    }

    if (confirmType === "CANCEL") {
      setInvoices((prev) =>
        prev.map((i) =>
          i.id === invoice.id
            ? { ...i, status: "CANCELLED" }
            : i
        )
      );
    }

    setConfirmType(null);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 p-4">

        <div className="w-full max-w-2xl bg-linear-to-br from-[#0f172a] to-[#1e293b]
        border border-white/20 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">

          <div className="flex justify-between items-center p-5 border-b border-white/10">
            <h2
              style={{ ...FONTWEIGHT[700] }}
              className={`${$styles[28]} text-white`}
            >
              💳 Invoice Details
            </h2>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-5 overflow-y-auto">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">

              <Detail label="Invoice ID" value={invoice.id} blue />

              <div className="sm:text-right">
                <span
                  style={{ ...FONTWEIGHT[700] }}
                  className={`px-3 py-1 rounded-full ${$styles[14]} ${getStatusColor()}`}
                >
                  {invoice.status}
                </span>
              </div>

              <Detail label="Resident" value={invoice.resident} />
              <Detail label="Unit" value={invoice.unit} />
              <Detail label="Amount" value={`$${invoice.amount}`} green />
              <Detail label="Type" value={invoice.type} />
              <Detail label="Issue Date" value={invoice.issueDate} />
              <Detail label="Due Date" value={invoice.dueDate} />

              {invoice.status === "PAID" && invoice.paidDate && (
                <Detail label="Paid Date" value={invoice.paidDate} />
              )}
            </div>

            {(invoice.status === "PENDING" ||
              invoice.status === "OVERDUE") && (
              <>
                <div className="border-t border-white/20 my-8" />

                <div className="flex flex-col sm:flex-row gap-4">

                  <button
                    onClick={() => setConfirmType("PAID")}
                    style={{ ...FONTWEIGHT[700] }}
                    className={`flex-1 py-3 rounded-full text-[#0A0A0A]
                    bg-linear-to-r from-[#00C950] to-[#009966]
                    flex items-center justify-center gap-2 cursor-pointer ${$styles[16]}`}
                  >
                    <img src={tick} alt="mark paid" className="w-4 h-4" />
                    Mark as Paid
                  </button>

                  <button
                    onClick={() => setConfirmType("CANCEL")}
                    style={{ ...FONTWEIGHT[700] }}
                    className={`flex-1 py-3 rounded-full bg-[#FF64674D]
                    border border-[#FF64674D] text-[#FF6467]
                    flex items-center justify-center gap-2 cursor-pointer ${$styles[16]}`}
                  >
                    <img src={close} alt="cancel" className="w-4 h-4" />
                    Cancel Invoice
                  </button>

                </div>
              </>
            )}

            <button
              onClick={onClose}
              style={{ ...FONTWEIGHT[500] }}
              className={`w-full mt-8 py-3 rounded-full bg-white/10
              border border-white/20 hover:bg-white/20 text-white cursor-pointer ${$styles[14]}`}
            >
              Close
            </button>

          </div>
        </div>
      </div>

      {confirmType && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-200 p-4">

          <div className="w-full max-w-md bg-[#1e293b] border border-white/20 rounded-2xl p-6 shadow-2xl">

            <h3
              style={{ ...FONTWEIGHT[700] }}
              className={`mb-4 text-white ${$styles[20]}`}
            >
              Confirm Action
            </h3>

            <p
              style={{ ...FONTWEIGHT[400] }}
              className={`text-gray-400 mb-6 ${$styles[14]}`}
            >
              {confirmType === "PAID"
                ? "Are you sure you want to mark this invoice as paid?"
                : "Are you sure you want to cancel this invoice?"}
            </p>

            <div className="flex gap-4">

              <button
                onClick={() => setConfirmType(null)}
                style={{ ...FONTWEIGHT[500] }}
                className={`flex-1 py-2 rounded-full bg-white/10
                border border-white/20 hover:bg-white/20 cursor-pointer ${$styles[14]}`}
              >
                No
              </button>

              <button
                onClick={handleConfirm}
                style={{ ...FONTWEIGHT[600] }}
                className={`flex-1 py-2 rounded-full cursor-pointer ${$styles[14]} ${
                  confirmType === "PAID"
                    ? "bg-linear-to-r from-[#00C950] to-[#009966] text-white"
                    : "bg-[#FF64674D] border border-[#FF64674D] text-white"
                }`}
              >
                Yes, Confirm
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceDetailsModal;



const Detail = ({
  label,
  value,
  blue,
  green,
}: {
  label: string;
  value: string;
  blue?: boolean;
  green?: boolean;
}) => (
  <div>
    <p
      style={{ ...FONTWEIGHT[400] }}
      className={`text-gray-400 ${$styles[12]}`}
    >
      {label}
    </p>

    <p
      style={{ ...FONTWEIGHT[blue || green ? 600 : 400] }}
      className={`mt-1 wrap-break-word ${$styles[14]} ${
        blue
          ? "text-[#00D3F3]"
          : green
          ? "text-[#05DF72]"
          : "text-white"
      }`}
    >
      {value}
    </p>
  </div>
);