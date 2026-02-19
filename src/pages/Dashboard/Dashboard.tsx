import DashboardCard from "../../components/Dashboard/DashboardCard";
import DashboardGraph from "../../components/Dashboard/DashboardGraph";
import DashboardGraph1 from "../../components/Dashboard/DashboardGraph1";
import DashboardGraph2 from "../../components/Dashboard/DashboardGraph2";
import Card from "../../components/Dashboard/Card";
export default function Dashboard() {
  return (
    <div>
      <DashboardCard />
      <DashboardGraph />
      <DashboardGraph1 />
      <DashboardGraph2 />
      <Card />
    </div>
  )
}
