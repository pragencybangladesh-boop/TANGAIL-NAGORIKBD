import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import { Loader2 } from 'lucide-react';

// Eagerly loaded
import Home from './pages/Home';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy loaded
const About = lazy(() => import('./pages/About'));
const UpazilaPortal = lazy(() => import('./pages/upazilas/UpazilaLayout'));
const UpazilaList = lazy(() => import('./pages/upazilas/index'));
const Services = lazy(() => import('./pages/Services'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Grievance = lazy(() => import('./pages/Grievance'));
const Governance = lazy(() => import('./pages/Governance'));
const Notices = lazy(() => import('./pages/Notices'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const VolunteerRegistration = lazy(() => import('./pages/VolunteerRegistration'));
const BloodBank = lazy(() => import('./pages/BloodBank'));
const NagorikAI = lazy(() => import('./pages/NagorikAI'));
const Auth = lazy(() => import('./pages/Auth'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const Weather = lazy(() => import('./pages/Weather'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <Loader2 className="w-10 h-10 text-primary animate-spin" />
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/upazila/:id" element={<UpazilaPortal />} />
              <Route path="/upazilas" element={<UpazilaList />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/grievance" element={<Grievance />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/volunteers" element={<Leaderboard />} />
              <Route path="/volunteer-registration" element={<VolunteerRegistration />} />
              <Route path="/blood-bank" element={<BloodBank />} />
              <Route path="/nagorik-ai" element={<NagorikAI />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/weather" element={<Weather />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}
