import React from "react";
import Bell from "../../assets/notification/pop-up/bell.png";
import User from "../../assets/notification/pop-up/user.png";
import Parcel from "../../assets/notification/pop-up/parcel.png";
import Car from "../../assets/notification/pop-up/car.png";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
    onClose: () => void;
};

const notificationData = [
  {
    icon: User,
    title: "Visitor Approval Pending",
    desc: "John Doe waiting at Main Gate for Unit A-305",
    time: "5m ago",
    type: "Visitor",
  },
  {
    icon: Parcel,
    title: "Large Delivery Arrived",
    desc: "Furniture delivery for Unit C-108 requires escort",
    time: "20m ago",
    type: "Delivery",
  },
  {
    icon: Car,
    title: "Unregistered Vehicle",
    desc: "Vehicle ABC-1234 registration expired",
    time: "1h ago",
    type: "Vehicle",
  },
];

const Notification: React.FC<Props> = ({ open, setOpen }) => {
    if (!open) return null;
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div
        className="fixed right-4 top-18 z-50 max-w-[95vw] bg-black"
        style={{ color: COLORS.primary_white }}
      >
        <div className="rounded-2xl bg-linear-to-br from-[#00B8DB1A] to-[#8E51FF1A] shadow-2xl border border-white/10 overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b border-white/10">
            <div className="flex gap-2 items-center">
              <img src={Bell} className="w-5 h-5" />
              <h2 className={`${FONTSIZE[20]}`}
              style={{fontWeight: WEIGHT.seven}}>Notifications</h2>
            </div>

            <span className={`bg-pink-500 px-3 py-1 rounded-full ${FONTSIZE[12]}`}
            style={{fontWeight: WEIGHT.seven}}>
              3 New
            </span>
          </div>

          <p className={`px-4 pt-1 pb-3 ${FONTSIZE[12]}`}
          style={{fontWeight: WEIGHT.four, color: COLORS.secoundy_gray}}>
            Stay updated with your latest activities
          </p>

          <div className="divide-y divide-white/5">
            {notificationData.map((item, index) => (
              <div
                key={index}
                className="p-4 hover:bg-white/5 cursor-pointer flex justify-between transition"
              >
                <div className="flex gap-3">
                  <span>
                    <img src={item.icon} className="w-5 h-5" />
                  </span>

                  <div>
                    <p className={`${FONTSIZE[14]}`} style={{fontWeight: WEIGHT.seven}}>{item.title}</p>

                    <p className={`${FONTSIZE[12]}`} style={{fontWeight: WEIGHT.four, color: COLORS.secoundy_gray}}>{item.desc}</p>

                    <p className={`flex gap-2 mt-1 ${FONTSIZE[12]}`}>
                      <p style={{color: COLORS.secoundy_gray}}>{item.time}</p>
                       • <p style={{color: COLORS.blue}}>{item.type}</p>
                    </p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full mt-2" style={{background: COLORS.blue}}></span>
              </div>
            ))}
          </div>

                    <div className="p-4">
                        <button onClick={() => { navigate("/notification"); setOpen(false); }}
                            className={`w-full bg-linear-to-r from-[#00B8DB] to-[#8E51FF] py-3 rounded-xl font-medium cursor-pointer shadow-lg hover:opacity-90 transition ${FONTSIZE[16]}`}
                            style={{ boxShadow:"0px 4px 6px -4px #00B8DB40, 0px 10px 15px -3px #00B8DB40" }}>
                            View All Notifications →
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Notification;
