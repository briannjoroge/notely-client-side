import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import UpdateProfile from "../pages/UpdateProfile";
import UpdatePassword from "../pages/UpdatePassword";
import PrivateRoute from "../components/privateRoute";
import DeletedNotes from "../pages/DeletedNotes";
import MyNotes from "../pages/MyNotes";
import NewNote from "../pages/NewNote";
import SingleNote from "../pages/SingleNote";
import UpdateNote from "../pages/UpdateNote";
import UserProfile from "../pages/UserProfile";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <MyNotes />
          </PrivateRoute>
        }
      />
      <Route
        path="/notes/:noteId"
        element={
          <PrivateRoute>
            <SingleNote />
          </PrivateRoute>
        }
      />
      <Route
        path="/new-note"
        element={
          <PrivateRoute>
            <NewNote />
          </PrivateRoute>
        }
      />
      <Route
        path="/notes/:noteId/update"
        element={
          <PrivateRoute>
            <UpdateNote />
          </PrivateRoute>
        }
      />
      <Route
        path="/deleted-notes"
        element={
          <PrivateRoute>
            <DeletedNotes />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/update-profile"
        element={
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/update-password"
        element={
          <PrivateRoute>
            <UpdatePassword />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
