import React, { useState } from "react";
import type { Invoice } from "../../pages/Invoices/Invoices";
import { FONTSIZE as $styles, FONTWEIGHT } from "../../constent/uiconstent";

interface Props {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  onView: (invoice: Invoice) => void;
}

const InvoiceTable: React.FC<Props> = ({
  invoices,
  setInvoices,
  onView,
}) => {

  const [confirmType, setConfirmType] = useState<"PAID" | "CANCEL" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
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
    setInvoices((prev) =>
      prev.map((i) =>
        i.id === selectedId
          ? {
              ...i,
              status: confirmType === "PAID" ? "PAID" : "CANCELLED",
            }
          : i
      )
    );

    setConfirmType(null);
    setSelectedId(null);
  };

  return (
    <>
      <div className="overflow-x-auto bg-[#FFFFFF0D] border-[#FFFFFF33] rounded-xl">
        <table className="min-w-full">

          <thead className="bg-[#FFFFFF0D] border-[#FFFFFF1A]">
            <tr>
              {[
                "INVOICE ID",
                "RESIDENT",
                "TYPE",
                "AMOUNT",
                "DUE DATE",
                "STATUS",
                "ACTIONS",
              ].map((head) => (
               <th
  key={head}
  style={{ ...FONTWEIGHT[700] }}
  className={`px-4 py-3 text-left whitespace-nowrap ${$styles[12]}`}
>
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t border-[#FFFFFF1A]">

                <td
                  style={{ ...FONTWEIGHT[400] }}
                  className={`px-4 py-3 whitespace-nowrap text-[#00D3F3] ${$styles[14]}`}
                >
                  {invoice.id}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <div
                    style={{ ...FONTWEIGHT[400] }}
                    className={`${$styles[14]}`}
                  >
                    {invoice.resident}
                  </div>
                  <div
                    style={{ ...FONTWEIGHT[400] }}
                    className={`text-[#99A1AF] whitespace-nowrap ${$styles[12]}`}
                  >
                    {invoice.unit}
                  </div>
                </td>

                <td
                  style={{ ...FONTWEIGHT[400] }}
                  className={`px-4 py-3 text-[#D1D5DC] whitespace-nowrap ${$styles[14]}`}
                >
                  {invoice.type}
                </td>

                <td
                  style={{ ...FONTWEIGHT[700] }}
                  className={`px-4 py-3 text-[#FFFFFF] whitespace-nowrap ${$styles[14]}`}
                >
                  ${invoice.amount}
                </td>

                <td
                  style={{ ...FONTWEIGHT[400] }}
                  className={`px-4 py-3 text-[#D1D5DC] whitespace-nowrap ${$styles[14]}`}
                >
                  {invoice.dueDate}
                </td>

                <td className="px-4 py-3">
                  <span
                    style={{ ...FONTWEIGHT[700] }}
                    className={`px-3 py-1 whitespace-nowrap rounded-full ${$styles[12]} ${getStatusColor(
                      invoice.status
                    )}`}
                  >
                    {invoice.status}
                  </span>
                </td>

                <td className="px-4 py-3 flex gap-2 flex-wrap whitespace-nowrap">

                  <button
                    onClick={() => onView(invoice)}
                    style={{ ...FONTWEIGHT[400] }}
                    className={`px-3 py-1 bg-[#2B7FFF33] text-[#51A2FF] whitespace-nowrap rounded-full cursor-pointer ${$styles[12]}`}
                  >
                    View
                  </button>

                  {(invoice.status === "PENDING" ||
                    invoice.status === "OVERDUE") && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedId(invoice.id);
                          setConfirmType("PAID");
                        }}
                        style={{ ...FONTWEIGHT[400] }}
                        className={`px-3 py-1 bg-[#00C95033] text-[#05DF72] whitespace-nowrap hover:bg-green-700 rounded-full cursor-pointer ${$styles[12]}`}
                      >
                        Mark Paid
                      </button>

                      <button
                        onClick={() => {
                          setSelectedId(invoice.id);
                          setConfirmType("CANCEL");
                        }}
                        style={{ ...FONTWEIGHT[400] }}
                        className={`px-3 py-1 bg-[#FB2C3633] whitespace-nowrap text-[#FF6467] hover:bg-red-700 rounded-full cursor-pointer ${$styles[12]}`}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmType && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

          <div className="w-full max-w-md bg-[#1e293b] border border-white/20 rounded-xl p-6">

            <h3
              style={{ ...FONTWEIGHT[600] }}
              className={`mb-4 ${$styles[18]}`}
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
                onClick={() => {
                  setConfirmType(null);
                  setSelectedId(null);
                }}
                style={{ ...FONTWEIGHT[500] }}
                className={`flex-1 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer ${$styles[14]}`}
              >
                No
              </button>

              <button
                onClick={handleConfirm}
                style={{ ...FONTWEIGHT[500] }}
                className={`flex-1 py-2 rounded-full cursor-pointer ${$styles[14]} ${
                  confirmType === "PAID"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
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

export default InvoiceTable;