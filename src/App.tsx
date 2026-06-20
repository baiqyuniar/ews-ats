import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import RiskMapPage from "./pages/risk-map/RiskMapPage";
import SchoolListPage from "./pages/schools/SchoolListPage";
import DashboardSchoolPage from "./pages/dashboardSchool/DashboardSchollPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import StudentListPage from "./pages/students/StudentListPage";
import DropoutListPage from "./pages/dropouts/DropoutListPage";
import SimulationPredictionPage from "./pages/simulasi/SimulasiPredictionPage";
import UploadPredictionPage from "./pages/upload/UploadPredictionPage";
import InterventionPage from "./pages/intervension/IntervensionListPage";
import DropoutDetailPage from "./pages/dropouts/DropoutDetailPage";
import InterventionListPage from "./pages/intervension/IntervensionListPage";
import InterventionDetailPage from "./pages/intervension/InterventionDetailPage";
import OPDMonitoringPage from "./pages/intervension/OPDMonitoringPage";
import EWSReportListPage from "./pages/ews/EWSReportListPage";
import EWSReportCreatePage from "./pages/ews/EWSReportCreatePage";

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="/risk-map" element={<RiskMapPage />} />

      <Route path="/schools" element={<SchoolListPage />} />

      <Route path="/schools/:id" element={<DashboardSchoolPage />} />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <StudentListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dropouts"
        element={
          <ProtectedRoute>
            <DropoutListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dropouts/:id"
        element={
          <ProtectedRoute>
            <DropoutDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="ews-report"
        element={
          <ProtectedRoute>
            <EWSReportListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="ews-report/create"
        element={
          <ProtectedRoute>
            <EWSReportCreatePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interventions"
        element={
          <ProtectedRoute>
            <InterventionListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interventions/:id"
        element={
          <ProtectedRoute>
            <InterventionDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/opd-monitoring"
        element={
          <ProtectedRoute>
            <OPDMonitoringPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/prediction"
        element={
          <ProtectedRoute>
            <SimulationPredictionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-prediction"
        element={
          <ProtectedRoute>
            <UploadPredictionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interventions"
        element={
          <ProtectedRoute>
            <InterventionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interventions"
        element={
          <ProtectedRoute>
            <InterventionPage />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/interventions/:id"
        element={
          <ProtectedRoute>
            <InterventionDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interventions/opd-monitoring"
        element={
          <ProtectedRoute>
            <OPDMonitoringPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interventions/reports"
        element={
          <ProtectedRoute>
            <InterventionReportPage />
          </ProtectedRoute>
        }
      /> */}
      {/* Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
