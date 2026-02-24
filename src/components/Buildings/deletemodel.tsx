import { toast } from "react-toastify";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  buildingName: string | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteModal({
  open,
  buildingName,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000CC] z-50 p-4">
      <div className="relative bg-[#101828F2] border border-[#FFFFFF33] rounded-2xl p-6 shadow-lg w-full max-w-sm text-white">

        <button
          onClick={onCancel}
          className="absolute 
    hover:opacity-70 cursor-pointer text-white font-bold top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full  transition"
          aria-label="Close"
        >
          <X  />
        </button>

        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>

        <p className="mb-6">
          Do you want to delete <strong>{buildingName}</strong>?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-full border border-[#FFFFFF33] bg-[#FFFFFF1A] hover:bg-white/10 transition"
          >
            No
          </button>

          <button
            onClick={() => {
              onConfirm();
              toast.success("Building deleted successfully!");
            }}
            className="flex-1 py-2 rounded-full bg-linear-to-r from-[#00C950] to-[#009966] font-semibold hover:opacity-90 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}