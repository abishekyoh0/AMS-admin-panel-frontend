import { Route, Routes } from "react-router-dom";
import { Mainlayout } from "../layout/Mainlayout";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../components/shared/NotFound";
import { PublicRoute } from "./PublicRoute";
import { SignIn } from "../pages/Auth/Signin";
import Dashboard from "../pages/Dashboard/Dashboard";
import ComplaintManagement from "../pages/complaint/ComplaintManagement";
import BuildingsManagement from "../pages/Buildings/BuildingsManagement";
import ComplaintDetails from "../components/complaint/ComplaintDetails";
import Visitors from "../pages/Visitors/Visitors";
import Invoices from "../pages/Invoices/Invoices";
import EntryReports from "../pages/EntryReports/EntryReports";
import EmergencyControl from "../pages/EmergencyControl/EmergencyControl";
import Users from "../pages/Users/Users";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <Mainlayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/complaint" element={<ComplaintManagement />} />
          <Route path="/building" element={<BuildingsManagement />} />
          <Route path="/complaint-details" element={<ComplaintDetails />} />
          <Route path="/user" element={<Users />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/entry-reports" element={<EntryReports />} />
          <Route path="/emergency-control" element={<EmergencyControl />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
