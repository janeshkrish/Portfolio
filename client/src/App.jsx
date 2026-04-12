import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AdminProvider } from './context/AdminContext'
import HomePage from './pages/HomePage'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              border: '3px solid #0D0D0D',
              boxShadow: '4px 4px 0px #0D0D0D',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '600',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  )
}
