import SignIn from "./screens/SignIn";
import Settings from "./screens/Settings";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Main from "./components/Main";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Settings />} />

          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
