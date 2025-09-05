// src/App.js
import SignIn from "./screens/SignIn";
import Settings from "./screens/Settings";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import Main from "./screens/Main";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
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
    </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
