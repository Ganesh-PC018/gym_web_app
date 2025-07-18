// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Classes from './components/Classes';
import Pricing from './components/Pricing';
import Join from './components/Join';
import Footer from './components/Footer';
import ManageAdmin from './Admin/ManageAdmin.jsx';
import { Toaster } from 'react-hot-toast'
import FeesManager from './Admin/FeesManager.jsx';
import AdminLogin from './Admin/AdminLogin.jsx';
import InterestedMembersTable from './Admin/InterestedMembersTable.jsx';
// Create a component to hold the main content of your landing page
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
const MainContent = () => (
  <div className='manageContent'>
    <Hero />
    <About />
    <Classes />
    <Pricing />
    
    {/* <Login /> */}
    
    <Join />
  </div>
);


function App() {
  return (
    <>
      <div className="app-wrapper">
        <Toaster />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <ManageAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activity"
              element={
                <ProtectedRoute>
                  <FeesManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interested"
              element={
                <ProtectedRoute>
                  <InterestedMembersTable />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;