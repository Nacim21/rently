import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Maintenance from './pages/maintenance/Maintenance'
import Messages from './pages/messages/Messages'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Maintenance />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/dashboard" element={<div>Dashboard Page (Coming Soon)</div>} />
        <Route path="/properties" element={<div>Properties Page (Coming Soon)</div>} />
        <Route path="/payments" element={<div>Payments Page (Coming Soon)</div>} />
        <Route path="/" element={<Messages />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </>
  )
}

export default App
