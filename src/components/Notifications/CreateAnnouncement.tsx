import React, { useState } from "react";

type Field = {
  id: number;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

const FORM_FIELDS: Field[] = [
  {
    id: 1,
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "e.g., Water Supply Maintenance",
    required: true,
  },
  {
    id: 2,
    label: "Description",
    name: "desc",
    type: "textarea",
    placeholder: "Detailed message content...",
    required: true,
  },
  {
    id: 3,
    label: "Category",
    name: "category",
    type: "text",
    placeholder: "Emergency / General / Maintenance",
  },
  {
    id: 4,
    label: "Priority",
    name: "priority",
    type: "text",
    placeholder: "High / Medium / Low",
  },
  {
    id: 5,
    label: "Audience Type",
    name: "audience",
    type: "text",
    placeholder: "All Residents",
  },
  {
    id: 6,
    label: "Expiry Date (Optional)",
    name: "expiry",
    type: "date",
    placeholder: "",
  },
];

const CreateAnnouncement: React.FC = () => {
  const [form, setForm] = useState<any>({});
  const [sendType, setSendType] = useState("now");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("FORM DATA →", { ...form, sendType });

    alert("Announcement Published 🚀 (connect backend)");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b1026] to-[#050816] text-white flex justify-center items-center p-4">

      <div className="w-full max-w-3xl bg-linear-to-br from-[#111633] to-[#0b0f25] border border-white/10 rounded-2xl p-6 shadow-xl">

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-purple-600/20 flex items-center justify-center text-xl">
            +
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-3">
            Create Announcement
          </h2>
          <p className="text-gray-400 text-sm">
            Broadcast important information to residents
          </p>
        </div>

        <div className="space-y-4">

          {FORM_FIELDS.map((field) => (
            <div key={field.id} className="w-full">

              <label className="text-sm text-gray-300">
                {field.label}
                {field.required && <span className="text-red-400"> *</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                  rows={4}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                />
              )}
            </div>
          ))}

          <div>
            <label className="text-sm text-gray-300">Send Option *</label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => setSendType("now")}
                className={`p-4 rounded-xl border ${
                  sendType === "now"
                    ? "bg-green-600/20 border-green-500"
                    : "bg-white/5 border-white/10"
                }`}
              >
                🚀 Send Now
                <p className="text-xs text-gray-400">Immediate delivery</p>
              </button>

              <button
                onClick={() => setSendType("schedule")}
                className={`p-4 rounded-xl border ${
                  sendType === "schedule"
                    ? "bg-blue-600/20 border-blue-500"
                    : "bg-white/5 border-white/10"
                }`}
              >
                ⏰ Schedule Later
                <p className="text-xs text-gray-400">Set date & time</p>
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Attachment (Optional)
            </label>

            <div className="mt-2 border border-dashed border-white/20 rounded-xl p-6 text-center bg-white/5">
              ⬆ Click to upload or drag & drop
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG or PDF (max 5MB)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="flex-1 bg-white/10 py-3 rounded-xl">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 bg-linear-to-r from-purple-600 to-pink-500 py-3 rounded-xl font-semibold"
            >
              Publish Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;