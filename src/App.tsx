import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import UpazilaPortal from './pages/upazilas/UpazilaLayout';
import Services from './pages/Services';
import Contacts from './pages/Contacts';
import Grievance from './pages/Grievance';
import About from './pages/About';
import UpazilaList from './pages/upazilas/index';
import Notices from './pages/Notices';
import Leaderboard from './pages/Leaderboard';
import Auth from './pages/Auth';
import BloodBank from './pages/BloodBank';
import VolunteerRegistration from './pages/VolunteerRegistration';
import AdminDashboard from './pages/admin/Dashboard';
import Governance from './pages/Governance';
import Weather from './pages/Weather';
import NagorikAI from './pages/NagorikAI';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
        <ScrollToTop />
        <Layout>
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
        </Layout>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}
