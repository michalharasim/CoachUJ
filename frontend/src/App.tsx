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
                  <Route path="/" element={<Layout><MainPage /></Layout>} />
                  <Route path="/login" element={<LayoutCenter><LoginPage /></LayoutCenter>} />
                  <Route path="/register" element={<LayoutCenter><RegisterPage /></LayoutCenter>} />

                  {/* Trasa dla nieznanych ścieżek (strona 404) */}
                  <Route path="*" element={<LayoutCenter><NotFoundPage /></LayoutCenter>} />
              </Routes>
          </ThemeProvider>
      </Router>
  )
}

export default App
