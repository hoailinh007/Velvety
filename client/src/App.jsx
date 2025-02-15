import './App.css'
import { Routes, Route } from "react-router-dom";
import About from './pages/guest/About.jsx';
import LoginPage from './pages/guest/LoginPage.jsx';
import Blog from './pages/guest/Blog.jsx';
import Services from './pages/guest/Services.jsx';
import Forgotpassword from './pages/guest/Forgotpassword.jsx';
import RegisterPage from './pages/guest/RegisterPage.jsx';
import Quiz from './pages/guest/Quiz.jsx';
import axios from 'axios';
import VerifyEmailPage from './pages/guest/VerifyEmailPage.jsx';
import BlogDetail from './pages/guest/BlogDetail.jsx';
import CustomerManagement from './pages/manager/CustomerManagement.jsx';
import ServiceManagement from './pages/manager/ServiceManagement.jsx';
import StaffManagement from './pages/manager/StaffManagement.jsx';
import Dashboard from './pages/manager/Dashboard.jsx';
import BookingPage from './pages/guest/Booking.jsx';
import TherapistManagement from './pages/manager/TherapistManagement.jsx';
import ResetPassword from './pages/guest/ResetPassword.jsx';
import Consultant from './pages/guest/Consultant.jsx';
import BlogManagement from './pages/manager/BlogManagement.jsx';
import QuizManagement from './pages/manager/QuestionManagement.jsx';
import QuestionManagement from './pages/manager/QuestionManagement.jsx';
axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <Routes>
      <Route index element={<About />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/service' element={<Services />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<Forgotpassword/>} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/verify' element={<VerifyEmailPage/>} />
      <Route path='/blog/:id' element={<BlogDetail />} />
      <Route path='/customer-management' element={<CustomerManagement/>} />
      <Route path='/skin-therapist' element={<TherapistManagement/>} />
      <Route path='/service-management' element={<ServiceManagement />} />
      <Route path='/staff-management' element={<StaffManagement />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/booking' element={<BookingPage/>} />
      <Route path='reset-password' element={<ResetPassword/>} />
      <Route path='consultant' element={<Consultant/>} />
      <Route path='blog-management' element={<BlogManagement/>} />
      <Route path='question-management' element={<QuestionManagement/>} />
    </Routes>

  );
}

export default App
