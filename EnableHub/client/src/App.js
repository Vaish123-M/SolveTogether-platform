import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Cognitive from './pages/Cognitive'
import Hearing from './pages/Hearing'
import Visual from './pages/Visual'
import Mobility from './pages/Mobility'
import Speech from './pages/Speech'
import Neurodivergent from './pages/Neurodivergent'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cognitive" element={<Cognitive />} />
        <Route path="/hearing" element={<Hearing />} />
        <Route path="/visual" element={<Visual />} />
        <Route path="/mobility" element={<Mobility />} />
        <Route path="/speech" element={<Speech />} />
        <Route path="/neurodivergent" element={<Neurodivergent />} />
      </Routes>
    </BrowserRouter>
  )
}
