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
import EmergencyControl from "../pages/EmergencyControl/EmergencyControl";
import Users from "../pages/Users/Users";
import AccessManagement from "../pages/AccessManagement/AccessManagement";
import ResidentEntryReports from "../pages/EntryReports/EntryReports";
import NotificationsPage from "../components/Notifications/Notification";
import NotificationDetails from "../components/Notifications/NotificationDetails";
import AnnouncementManagement from "../components/Notifications/AnnouncementPage";
import ParkingManagement from "../pages/ParkingManagement/parkingmanagement";
import ParkingSlots from "../components/ParkingManagement/parkingslots";


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
          <Route path="/access-management" element={<AccessManagement />} />
          <Route path="/complaint-details" element={<ComplaintDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user" element={<Users />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/entry-reports" element={<ResidentEntryReports />} />
          <Route path="/emergency-control" element={<EmergencyControl />} />
          <Route path="/notification" element={<NotificationsPage />} />
          <Route path="/notification-details" element={<NotificationDetails />} />
          <Route path="/announcement-management" element={<AnnouncementManagement />} />
          <Route path="/parking" element={<ParkingManagement />} />
          <Route path="/parkingslots" element={<ParkingSlots />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
