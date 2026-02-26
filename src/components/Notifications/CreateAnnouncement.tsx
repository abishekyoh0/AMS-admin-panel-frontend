import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import createicon from "../../assets/parking/createicon.png";
import Send from "../../assets/Announcement/Icon (15).png"
import Clock from "../../assets/Announcement/Icon (20).png"

type Props = {
  onClose: () => void;
};

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
    placeholder: "",
    required: true,
  },
  {
    id: 4,
    label: "Priority",
    name: "priority",
    type: "text",
    placeholder: "",
    required: true
  },
  {
    id: 5,
    label: "Audience Type",
    name: "audience",
    type: "text",
    placeholder: "",
    required: true,
  },
  {
    id: 6,
    label: "Expiry Date (Optional)",
    name: "expiry",
    type: "date",
    placeholder: "",
  },
];

const CreateAnnouncement: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState<any>({});
  const [sendType, setSendType] = useState("now");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("FORM DATA →", { ...form, sendType });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-linear-to-br from-[#0F172B] to-[#101828] border border-[#FFFFFF33] rounded-2xl p-6 text-white relative">

        <button onClick={onClose} className="absolute right-5 top-5 text-gray-400 hover:text-white">
          <X />
        </button>

        <div className="text-center mb-6">
          <div className="w-19 h-19 mx-auto mb-3 rounded-full flex items-center justify-center bg-linear-to-br from-[#AD46FF33] to-[#F6339A33] border border-[#C27AFF4D] ">
            <img src={createicon} alt="" />
          </div>

          <h2 className={`mt-3 ${FONTSIZE[30]} ${FONTWEIGHT[700]}`}>
            Create Announcement
          </h2>
          <p className={`${FONTSIZE[16]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>
            Broadcast important information to residents
          </p>
        </div>

        <div className="space-y-4">

          {FORM_FIELDS.map((field) => (
            <div key={field.id}>
              <label className={`${FONTSIZE[14]} ${FONTWEIGHT[700]}`}>
                {field.label}
                {field.required && <span> *</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea name={field.name} onChange={handleChange} placeholder={field.placeholder}
                  className="w-full mt-1 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl px-4 py-2 outline-none focus:border-purple-500"
                  rows={4} />
              ) : (
                <input type={field.type} name={field.name} onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full mt-1 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl px-4 py-2 outline-none focus:border-purple-500" />
              )}
            </div>
          ))}

          <div>
            <label className={`${FONTSIZE[14]} ${FONTWEIGHT[700]}`}>Send Option *</label>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <button onClick={() => setSendType("now")}
                className={`p-4 rounded-xl border 
                  ${sendType === "now" ? "bg-green-600/20 border-green-500" : "bg-[#FFFFFF0D] border-[#FFFFFF1A]"}`} >
                <p className="flex flex-col items-center">
                  <img src={Send} alt="" className="w-5 h-5 mb-2"/> Send Now </p>
                <p className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Immediate delivery</p>
              </button>

              <button onClick={() => setSendType("schedule")}
                className={`p-4 rounded-xl border 
                  ${sendType === "schedule" ? "bg-blue-600/20 border-blue-500" : "bg-[#FFFFFF0D] border-[#FFFFFF1A]"}`}>
               <p className="flex flex-col items-center">
                <img src={Clock} alt="" className="w-5 h-5 mb-2" /> Schedule Later </p> 
                <p className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Set date & time</p>
              </button>
            </div>
          </div>

          {sendType === "schedule" && (
            <div>
              <label className={`${FONTSIZE[14]} ${FONTWEIGHT[700]}`}>
                Schedule Date & Time *
              </label>
              <input type="datetime-local" name="schedule" onChange={handleChange}
                className="w-full mt-1 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
          )}

          <div>
            <label className={`${FONTSIZE[14]} ${FONTWEIGHT[700]}`}>
              Attachment (Optional)
            </label>

            <div className="mt-2 border border-dashed border-white/20 rounded-xl p-6 text-center bg-[#FFFFFF0D]" style={{color: COLORS.secoundy_gray}}>
              <p className="flex flex-col items-center" >
                <Upload /> Click to upload or drag & drop</p>             
              <p className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`}>
                PNG, JPG or PDF (max 5MB)
              </p>
            </div>
          </div>

          <div className={`flex gap-3 pt-4 ${FONTSIZE[16]} ${FONTWEIGHT[700]}`}>
            <button onClick={onClose} className="flex-1 bg-[#FFFFFF1A] py-3 rounded-xl" >
              Cancel
            </button>

            <button onClick={handleSubmit}
              className={`flex-1 bg-linear-to-r from-[#AD46FF] to-[#E60076] py-3 rounded-xl ${FONTSIZE[16]} ${FONTWEIGHT[700]}`}
              style={{ boxShadow: "0px 4px 6px -4px #AD46FF40,0px 10px 15px -3px #AD46FF40" }}>
              Publish Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;