import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./components/Auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
