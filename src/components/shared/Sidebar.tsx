import { NavLink, useNavigate } from "react-router-dom";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";
import { useState } from "react";
import LogoutModal from "./logout";
import { useAuth } from "../Auth/AuthContext";

const menuItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/complaint", label: "Complaints", end: true },
  { to: "/building", label: "Building", end: true },
  { to: "/visitors", label: "Visitors", end: true },
];

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 h-full left-0 w-70 p-4 bg-[#000000] transform transition-transform duration-300 overflow-x-auto no-scrollbar ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ color: COLORS.primary_white }}
      >
        <div className="flex flex-col items-center gap-2 mb-4 px-5 py-9 rounded-xl bg-linear-to-r from-[#FF6900] to-[#CA3500] ">
          {/* <img src={logoicon} alt="Logo" className="w-10 h-10" /> */}
          <h1
            style={{ color: COLORS.primary_white, fontWeight: WEIGHT.seven }}
            className={`${FONTSIZE[20]}`}
          >
            Maintenance Panel
          </h1>
        </div>
        <div className="flex-1 flex flex-col justify-between  w-full ">
          <nav className="space-y-2 ">
            {menuItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200  cursor-pointer ${
                    isActive
                      ? "bg-[linear-gradient(90deg,rgba(0,184,219,0.2)_0%,rgba(142,81,255,0.2)_100%)] text-white"
                      : "text-white/80 hover:bg-white/5"
                  }`
                }
              >
                {/* <img src={icon} alt={label} className="w-5 h-5" /> */}
                <span
                  style={{ color: COLORS.secoundy_gray }}
                  className={`${FONTSIZE[16]}`}
                >
                  {label}
                </span>
              </NavLink>
            ))}
          </nav>
          <div className="mt-7 ">
            <div className="mt-7 ">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-[linear-gradient(90deg,rgba(0,184,219,0.2)_0%,rgba(142,81,255,0.2)_100%)] text-white  transition cursor-pointer"
              >
                {/* <img src={logoutIcon} alt="Logout" className="w-5 h-5" /> */}
                <div className="flex justify-center  w-full">
                  <span
                    className={`${FONTSIZE[16]}`}
                    style={{
                      color: COLORS.primary_white,
                      fontWeight: WEIGHT.four,
                    }}
                  >
                    Logout
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={() => {
            logout();
            setShowLogoutModal(false);
            navigate("/signin");
          }}
        />
      )}
    </>
  );
};
