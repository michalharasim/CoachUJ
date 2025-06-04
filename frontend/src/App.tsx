import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "@/pages/LoginPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import Layout from "@/components/Layout.tsx";
import LayoutCenter from "@/components/LayoutCenter.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import {ThemeProvider} from "@/contexts/theme-context";
import MainPage from "@/pages/MainPage";

function App() {
  return (
      <Router>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
              <Routes>
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
