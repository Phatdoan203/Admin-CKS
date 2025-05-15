import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage/AdminPage'
import DigitalSignatureManagement from './pages/AdminPage/DigitalSignature/DigitalSignatureManagement'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/test" element={<DigitalSignatureManagement />} />
      </Routes>
    </Router>
  </StrictMode>,
)
