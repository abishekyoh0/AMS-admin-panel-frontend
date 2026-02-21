import React, { useState } from "react";
import type { Invoice } from "../../pages/Invoices/Invoices";
import invoice from "../../assets/invoice/invoice.png";
import { FONTSIZE as $styles, FONTWEIGHT } from "../../constent/uiconstent";

interface Props {
  onClose: () => void;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

const CreateInvoiceModal: React.FC<Props> = ({
  onClose,
  setInvoices,
}) => {
  const [formData, setFormData] = useState({
    resident: "",
    unit: "",
    type: "",
    amount: "",
    dueDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.resident ||
      !formData.unit ||
      !formData.type ||
      !formData.amount ||
      !formData.dueDate
    ) {
      alert("Please fill all fields");
      return;
    }

    const newInvoice: Invoice = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      resident: formData.resident,
      unit: formData.unit,
      type: formData.type,
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      status: "PENDING",
      issueDate: "",
    };

    setInvoices((prev) => [...prev, newInvoice]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#101828F2] border border-[#FFFFFF33] rounded-2xl p-5 sm:p-6 shadow-2xl">

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src={invoice}
              alt="invoice"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
            <h2
              style={{ ...FONTWEIGHT[700] }}
              className={`text-white ${$styles[28]}`}
            >
              Create New Invoice
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{ ...FONTWEIGHT[500] }}
            className={`text-gray-400 hover:text-white cursor-pointer ${$styles[18]}`}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6">

          <Input
            label="Resident Name *"
            name="resident"
            value={formData.resident}
            onChange={handleChange}
          />

          <Input
            label="Unit *"
            name="unit"
            placeholder="e.g., A-304"
            value={formData.unit}
            onChange={handleChange}
          />

          <Input
            label="Amount ($) *"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />

          <Input
            label="Due Date *"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <Input
              label="Invoice Type *"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

          <button
            onClick={onClose}
            style={{ ...FONTWEIGHT[700] }}
            className={`w-full py-3 rounded-full text-black bg-[#FFFFFF1A] border border-[#FFFFFF33] hover:bg-white/20 transition cursor-pointer ${$styles[16]}`}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            style={{ ...FONTWEIGHT[700] }}
            className={`w-full py-3 rounded-full text-black bg-linear-to-r from-[#00C950] to-[#009966] hover:opacity-90 transition cursor-pointer ${$styles[16]}`}
          >
            Create Invoice
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceModal;



const Input = ({ label, ...props }: any) => (
  <div>
    <label
      style={{ ...FONTWEIGHT[500] }}
      className={`text-[#D1D5DC] ${$styles[14]}`}
    >
      {label}
    </label>

    <input
      {...props}
      style={{ ...FONTWEIGHT[400] }}
      className={`mt-1 w-full px-4 py-2 rounded-lg bg-[#FFFFFF0D] border border-white/20 outline-none text-white ${$styles[14]}`}
    />
  </div>
);