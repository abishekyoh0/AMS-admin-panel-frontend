import DashboardCard from "../../components/Dashboard/DashboardCard";
import Card from "../../components/Dashboard/Card";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import Add from "../../assets/Dashboard/add.png"
import Download from "../../assets/Dashboard/download.png"
import Green from "../../assets/Dashboard/green.png"
import AnalyticsDashboard from "../../components/Dashboard/AnalyticsDashboard";
import RevenueComplaintsDashboard from "../../components/Dashboard/RevenueComplaints";
import StaffActivityDashboard from "../../components/Dashboard/StaffActivity";

export default function Dashboard() {
  return (
    <div className="mb-8" style={{ color: COLORS.primary_white, background: COLORS.primary_black }}>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className={`${FONTSIZE[36]} ${FONTWEIGHT[700]}`}>Admin Control Center</h1>
          <p className={`mb-4 ${FONTSIZE[16]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>
            Complete system overview and management dashboard
          </p>
          <div style={{ marginBottom: 20 }}>
            <span className={`flex w-fit gap-1 items-center px-3 py-1 mb-2 rounded-full ${FONTSIZE[12]} ${FONTWEIGHT[700]}`}
              style={{ background: "#00c95122", color: "#22c55e" }}>
             <img src={Green} alt="" className={`w-2 h-2`} /> All Systems Operational
            </span>
            <span style={{ marginLeft: 15, color: "#9ca3af", fontSize: 13 }}>
              Last updated: Jan 28, 2026 at 11:45 AM
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-linear-to-r from-[#00C950] to-[#009966] px-4 py-2 rounded-2xl"
            style={{ boxShadow: "0px 4px 6px -4px #00C95040, 0px 10px 15px -3px #00C95040" }}>
            <img src={Add} alt="" className={`w-5 h-5 ${FONTSIZE[16]} ${FONTWEIGHT[700]}`} /> Quick Add
          </button>
          <button className="flex items-center gap-2 bg-linear-to-r from-[#AD46FF] to-[#E60076] px-4 py-2 rounded-2xl"
            style={{ boxShadow: "0px 4px 6px -4px #AD46FF40, 0px 10px 15px -3px #AD46FF40" }}>
            <img src={Download} alt="" className={`w-5 h-5 ${FONTSIZE[16]} ${FONTWEIGHT[700]}`} /> Reports
          </button>
        </div>
      </div>

      <DashboardCard />
      <AnalyticsDashboard />
      <RevenueComplaintsDashboard />
      <StaffActivityDashboard />
      <Card />
    </div>
  )
}
