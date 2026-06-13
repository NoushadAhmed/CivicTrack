import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";

import AssignOfficers from "./pages/AssignOfficers";
import AdminUsers from "./pages/AdminUsers";
import AdminCategories from "./pages/AdminCategories";

import Settings from "./pages/Settings";
import OfficerDashboard from "./pages/OfficerDashboard";
import CitizenDashboard from "./pages/CitizenDashboard";


import CreateComplaint from "./pages/CreateComplaint";
import MyComplaints from "./pages/MyComplaints";

import AssignedComplaints from "./pages/AssignedComplaints";
import ManageComplaints from "./pages/ManageComplaints";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Citizen */}

        <Route
          path="/citizen"
          element={
            <ProtectedRoute
              allowedRoles={[
                "citizen",
              ]}
            >
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-complaint"
          element={
            <ProtectedRoute
              allowedRoles={[
                "citizen",
              ]}
            >
              <CreateComplaint />
            </ProtectedRoute>
          }
        />

        {/* Officer */}

        <Route
          path="/officer"
          element={
            <ProtectedRoute
              allowedRoles={[
                "officer",
              ]}
            >
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assigned"
          element={
            <ProtectedRoute
              allowedRoles={[
                "officer",
              ]}
            >
              <AssignedComplaints />
            </ProtectedRoute>
          }
        />

        {/* Admin */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-complaints"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >
              <ManageComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assign-officers"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >
              <AssignOfficers />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin-users"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >
              <AdminCategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"

          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >
              <Settings />
            </ProtectedRoute>
          }
        />


        {/* Shared */}

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "officer",
                "citizen",
              ]}
            >
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-5xl font-bold">
                404 - Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;