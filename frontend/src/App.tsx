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

function App() {
  return (
      <Router>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
              <Routes>
                  <Route element={<Layout/>}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/coaches" element={<CoachPage />} />
                      <Route path="/workouts" element={<WorkoutPage />} />
                      <Route path="/messages" element={<MessagesPage />} />
                      <Route path="/workouts/:workoutId" element={<WorkoutDetailsPage />} />
                      <Route path="/clients" element={<ClientsPage />} />
                      <Route path="/invites" element={<InvitesPage />} />
                      <Route path="/plans" element={<PlansPage />} />
                      <Route path="/exercises" element={<ExercisesPage />} />
                  </Route>
                  <Route element={<LayoutCenter/>}>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                  </Route>
              </Routes>
          </ThemeProvider>
      </Router>
  )
}

export default App
