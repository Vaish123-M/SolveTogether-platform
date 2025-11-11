import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AccessibilityBar from './components/AccessibilityBar'
import { AccessibilityProvider } from './context/AccessibilityContext'
import Landing from './pages/Landing'
import Cognitive from './pages/Cognitive'
import Hearing from './pages/Hearing'
import Visual from './pages/Visual'
import Mobility from './pages/Mobility'
import Speech from './pages/Speech'
import Neurodivergent from './pages/Neurodivergent'
import Learner from './pages/onboarding/Learner'
import Contributor from './pages/onboarding/Contributor'
import Mentor from './pages/onboarding/Mentor'
import Explore from './pages/onboarding/Explore'

export default function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <AccessibilityBar />
        <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cognitive" element={<Cognitive />} />
        <Route path="/hearing" element={<Hearing />} />
        <Route path="/visual" element={<Visual />} />
        <Route path="/mobility" element={<Mobility />} />
        <Route path="/speech" element={<Speech />} />
        <Route path="/neurodivergent" element={<Neurodivergent />} />
  <Route path="/onboarding/learner" element={<Learner />} />
  <Route path="/onboarding/contributor" element={<Contributor />} />
  <Route path="/onboarding/mentor" element={<Mentor />} />
  <Route path="/onboarding/explore" element={<Explore />} />
      </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  )
}
