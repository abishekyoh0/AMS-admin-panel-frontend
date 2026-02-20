import { NavLink, useNavigate } from "react-router-dom";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";
import { useState } from "react";
import LogoutModal from "./logout";
import { useAuth } from "../Auth/AuthContext";
import dashboardicon from "../../assets/Sidebar/graph.png";
import accessicon from "../../assets/Sidebar/access.png";
import buildingicon from "../../assets/Sidebar/building.png";
import usericon from "../../assets/Sidebar/user.png";
import complainticon from "../../assets/Sidebar/complaints.png";
import visitorsicon from "../../assets/Sidebar/visitor.png";
import invoicesicon from "../../assets/Sidebar/invoice.png"
import entryicon from "../../assets/Sidebar/entry.png";
import emergencyicon from "../../assets/Sidebar/emergency.png";
import logoicon from "../../assets/Sidebar/settings.png";

const menuItems = [
  { to: "/", label: "Dashboard", icon: dashboardicon, end: true },
  { to: "/access-management", label: "Access Management", icon: accessicon, end: false },
  { to: "/building", label: "Building", icon: buildingicon, end: true },
  { to: "/user", label: "Users", icon: usericon, end: true },
  { to: "/complaint", label: "Complaints", icon: complainticon, end: true },
  { to: "/visitors", label: "Visitors", icon: visitorsicon, end: true },
  { to: "/invoices", label: "Invoices", icon: invoicesicon, end: true},
  { to: "/entry-reports", label: "Entry Reports", icon: entryicon, end: true },
  { to: "/emergency-control", label: "Emergency Control", icon: emergencyicon, end: true },
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
        className={`fixed md:static md:w-1/4 z-50 top-0 h-full left-0 w-50 p-4 bg-[#000000] transform transition-transform duration-300 overflow-x-auto no-scrollbar ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ color: COLORS.primary_white }}
      >
        <div className="flex flex-col items-center gap-2 mb-4 px-5 py-3 rounded-xl bg-linear-to-r from-[#00B8DB] to-[#007595] ">
          <img src={logoicon} alt="Logo" className="w-15 h-15" />
          <h1
            style={{ color: COLORS.primary_white, fontWeight: WEIGHT.seven }}
            className={`${FONTSIZE[20]}`}
          >
            Admin Panel
          </h1>
        </div>
        <div className="flex flex-col justify-between">
          <nav className="space-y-2 ">
            {menuItems.map(({ to, label, icon, end }) => (
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
                <img src={icon} alt={label} className="w-5 h-5" />
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
