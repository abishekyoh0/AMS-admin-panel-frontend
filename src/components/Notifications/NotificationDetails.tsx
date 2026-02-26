import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Parcel from "../../assets/notification/parcel.png";
import BackIcon from "../../assets/notification/back-arrow.png";
import Clock from "../../assets/notification/clock.png";
import Location from "../../assets/notification/location.png";
import Home from "../../assets/notification/home.png";
import FileIcon from "../../assets/notification/file.png";
import {
  COLORS,
  FONTSIZE,
  FONTWEIGHT,
  WEIGHT,
} from "../../constent/uiconstent";

const NotificationDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data: any = location.state;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No notification data found
      </div>
    );
  }

  return (
    <div style={{ color: COLORS.primary_white }}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 cursor-pointer"
        style={{ color: COLORS.secoundy_gray }}
      >
        <img src={BackIcon} className="w-4 h-4" />
        Back to Notifications
      </button>

      <div className="flex gap-4 items-start mb-6">
        <div className="bg-purple-600/20 p-3 rounded-xl">
          <img src={data.icon || Parcel} className="w-6 h-6" />
        </div>

        <div>
          <h1 className={`${FONTSIZE[36]}`} style={{ fontWeight: WEIGHT.four }}>
            {data.title}
          </h1>

          <p
            className={`mt-1 ${FONTSIZE[16]}`}
            style={{ color: COLORS.secoundy_gray }}
          >
            {data.desc}
          </p>

          <div className={`flex flex-wrap gap-2 mt-3 ${FONTSIZE[12]}`}>
            <span className="flex items-center gap-1 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">
              <img src={Clock} className="w-3 h-3" />
              {data.time}
            </span>

            <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full">
              {data.priority || "HIGH PRIORITY"}
            </span>

            {data.location && (
              <span className="flex items-center gap-1 bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full">
                <img src={Location} className="w-3 h-3" />
                {data.location}
              </span>
            )}

            <span className="flex items-center gap-1 bg-gray-700/40 text-gray-300 px-3 py-1 rounded-full">
              <img src={Home} className="w-3 h-3" />
              Unit A-305
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-linear-to-br from-[#111633] to-[#0b0f25] p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <img src={FileIcon} className="w-6 h-6" />
          <h3 className={`${FONTSIZE[20]}`} style={{ ...FONTWEIGHT[700] }}>
            Full Details
          </h3>
        </div>

        <p
          className={`${FONTSIZE[16]}`}
          style={{ ...FONTWEIGHT[400], color: COLORS.secoundy_gray }}
        >
          {data.desc}
        </p>

        <div className="mt-6">
          <p
            className={`mb-3 ${FONTSIZE[14]}`}
            style={{ fontWeight: WEIGHT.seven }}
          >
            Attachments (2)
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-[#0f1430] border border-white/10 rounded-xl p-4"
              >
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <img src={Parcel} className="w-5 h-5" />
                </div>

                <div>
                  <p
                    className={`${FONTSIZE[14]}`}
                    style={{ fontWeight: WEIGHT.seven }}
                  >
                    file_{item}.jpg
                  </p>
                  <p
                    className={`${FONTSIZE[12]}`}
                    style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
                  >
                    Image • 2.3 MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
