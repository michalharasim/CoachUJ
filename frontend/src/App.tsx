import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "@/pages/LoginPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import Layout from "@/components/Layout.tsx";
import LayoutCenter from "@/components/LayoutCenter.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import {ThemeProvider} from "@/contexts/theme-context";
import MainPage from "@/pages/MainPage";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import CoachPage from "@/pages/CoachPage";
import MessagesPage from "@/pages/MessagesPage";
import WorkoutPage from "@/pages/WorkoutPage";
import WorkoutDetailsPage from "@/pages/WorkoutDetailsPage";
import ClientsPage from "@/pages/ClientsPage";
import InvitesPage from "@/pages/InvitesPage";
import PlansPage from "@/pages/PlansPage";
import ExercisesPage from "@/pages/ExercisesPage";
import {AuthProvider} from "@/contexts/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";


function App() {
  return (
      <Router>
          <AuthProvider>
              <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                  <Routes>
                      {/* ---------------------------------------------------- */}
                      {/* TRASY PUBLICZNE */}
                      {/* Jeżeli valid token i ściezka w wymienionej tablicy -> przekierowanie do /profile */}
                      {/* ---------------------------------------------------- */}
                      <Route element={<LayoutCenter preventLoggedPaths={['/', '/login', '/register']} />}>
                          <Route path="/" element={<MainPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                          <Route path="*" element={<NotFoundPage />} />
                      </Route>
                      {/* ---------------------------------------------------- */}
                      {/* TRASY CHRONIONE */}
                      {/* ---------------------------------------------------- */}
                      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/coaches" element={<CoachPage />} />
                          <Route path="/workouts" element={<WorkoutPage />} />
                          <Route path="/messages" element={<MessagesPage />} />
                          <Route path="/workouts/:workoutId" element={<WorkoutDetailsPage />} />
                          <Route path="/clients" element={<ClientsPage />} />
                          <Route path="/clients/logs/:clientID" element={<WorkoutPage />} />
                          <Route path="/clients/logs/plan/:workoutId/:clientID" element={<WorkoutDetailsPage />} />
                          <Route path="/invites" element={<InvitesPage />} />
                          <Route path="/plans" element={<PlansPage />} />
                          <Route path="/exercises" element={<ExercisesPage />} />
                      </Route>
                  </Routes>
              </ThemeProvider>
          </AuthProvider>
      </Router>
  )
}

export default App
