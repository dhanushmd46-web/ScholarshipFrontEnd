import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/Login";
import RegisterForm from "./components/Register";
import Header from "./components/Header";
import ProtectedRoute from "./components/protectedroute";         
import ScholarshipList from "./components/ScholarshipList";
import CreateScholarshipPage from "./components/CreateScholarship";
import EditScholarship from "./components/EditScholarship";
import ApplicationList from "./components/ApplicationList";
import CreateApplicationPage from "./components/CreateApplication";
import ScholarshipCard from "./components/ScholarshipCard";
import EditApplication from "./components/EditApplication";

export default function App() {
    return (
        <div className="sam-app">
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/login" element={
                    <div className="sam-auth-layout"><LoginForm /></div>
                } />

                <Route path="/register" element={
                    <div className="sam-auth-layout"><RegisterForm /></div>
                } />

                <Route path="/scholarship" element={
                    <ProtectedRoute>
                        <><Header /><main className="sam-main"><ScholarshipList /></main></>
                    </ProtectedRoute>
                } />

                <Route path="/scholarship/new" element={
                    <ProtectedRoute><CreateScholarshipPage /></ProtectedRoute>
                } />

                <Route path="/scholarship/edit/:id" element={
                    <ProtectedRoute><EditScholarship /></ProtectedRoute>
                } />

                <Route path="/application" element={
                    <ProtectedRoute>
                        <><Header /><main className="sam-main"><ApplicationList /></main></>
                    </ProtectedRoute>
                } />

                <Route path="/application/new" element={
                    <ProtectedRoute><CreateApplicationPage /></ProtectedRoute>
                } />

                <Route path="/application/edit/:id" element={
                    <ProtectedRoute><EditApplication /></ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}