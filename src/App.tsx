import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import UpazilaPortal from './pages/UpazilaPortal';
import Services from './pages/Services';
import Contacts from './pages/Contacts';
import Grievance from './pages/Grievance';
import About from './pages/About';
import UpazilaList from './pages/UpazilaList';
import Notices from './pages/Notices';
import Volunteers from './pages/Volunteers';
import Auth from './pages/Auth';
import BloodBank from './pages/BloodBank';
import VolunteerRegistration from './pages/VolunteerRegistration';
import AdminDashboard from './pages/AdminDashboard';
import Governance from './pages/Governance';
import Layout from './components/Layout';
import { AuthProvider } from './lib/AuthContext';

export default function App() {
  return (
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
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/volunteer-registration" element={<VolunteerRegistration />} />
            <Route path="/blood-bank" element={<BloodBank />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
