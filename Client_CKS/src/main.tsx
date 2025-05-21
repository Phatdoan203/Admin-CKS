import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import DigitalSignatureManagement from './pages/AdminPage/DigitalSignature/DigitalSignatureManagement'
import LoginPage from './pages/AuthPage/LoginPage'
import RegisterPage from './pages/AuthPage/RegisterPage'
import AdminLayout from './layouts/AdminLayout'
import FileManagement from './pages/AdminPage/DigitalSignature/FileManagement'
import CancelManagement from './pages/AdminPage/DigitalSignature/CancelManagement'
import ProfileReport from './pages/AdminPage/report/ProfileReport'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        
        <Route path='/' element={<AdminLayout />}>
          <Route path='/signature-management' element={<DigitalSignatureManagement />} />
          <Route path='/file-management' element={<FileManagement />} />
          <Route path='/cancel-management' element={<CancelManagement />} />
          <Route path='/profile-report' element={<ProfileReport />} />
        </Route>
        
        <Route path="/login-page" element={<LoginPage />}/>
        <Route path="/register-page" element={<RegisterPage />}/>
      </Routes>
    </Router>
  </StrictMode>,
)
