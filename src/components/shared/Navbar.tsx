import { COLORS, FONTSIZE } from "../../constent/uiconstent";
import notification from "../../assets/navbar/notification.png";
import website from "../../assets/navbar/website.png";
// import { useNavigate } from "react-router-dom";
import NotificationPopup from "../../pages/Notifications/Notifications";
import { useState } from "react";
import { Menu } from "lucide-react";

type NavbarProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Navbar({ setIsOpen }: NavbarProps) {
  // const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);

  return (
    <div className="flex justify-between items-center w-full p-2 sm:p-3 md:p-4">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-white text-xl sm:text-2xl p-1"
        >
          <Menu />
        </button>

        <h3
          className={`font-bold bg-clip-text text-transparent text-sm sm:text-lg md:text-xl lg:${FONTSIZE[24]}`}
          style={{
            backgroundImage: "linear-gradient(90deg, #00D3F2 0%, #8E51FF 100%)",
          }}
        >
          SkylineRentals
        </h3>
      </div>

      <div className="flex items-center gap-3 sm:gap-2 md:gap-3 lg:gap-5">
        <div
          className="relative cursor-pointer"
          onClick={() => setOpenNotif((prev) => !prev)}
        >
          <img src={notification} className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
        </div>

        {openNotif && (
          <NotificationPopup
            open={openNotif}
            setOpen={setOpenNotif}
            onClose={() => setIsOpen(false)}
          />
        )}

        <div className="flex items-center bg-white/20  border-white/20  gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-1.5 md:px-2 lg:px-3 py-1 sm:py-1.5 md:py-2 rounded border cursor-pointer">
          <img
            src={website}
            alt="website"
            className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-auto lg:h-auto shrink-0"
          />
          <span
            className="hidden sm:inline text-xs md:text-sm lg:text-base whitespace-nowrap"
            style={{ color: COLORS.primary_white }}
          >
            Website
          </span>
        </div>
      </div>
    </div>
  );
}
