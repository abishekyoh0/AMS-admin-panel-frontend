import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";

type LogoutModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({ onCancel, onConfirm }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#0B8DB11A] to-[#2B7FFF1A] border borde-[#00D3F24D] flex flex-col gap-6">
        <div
          className={`text-white text-center text-lg font-semibold ${FONTSIZE[32]}`}
          style={{ fontWeight: WEIGHT.four }}
        >
          Are you sure want to log out?
        </div>

        <div
          className={`w-full flex justify-evenly gap-4 ${FONTSIZE[16]}`}
          style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_black }}
        >
          <div className="">
            <button
              onClick={onCancel}
              className="flex-1 py-2 px-6 rounded-lg bg-gradient-to-br from-[#00B8DB33] to-[#8E51FF33] hover:opacity-80 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 px-6 rounded-lg  bg-gradient-to-br from-[#2B7FFF] to-[#00B8DB] hover:opacity-80 transition  cursor-pointer "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
