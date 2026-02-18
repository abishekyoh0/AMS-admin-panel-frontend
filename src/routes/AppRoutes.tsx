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
          <Route path="/users" element={<Users/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
