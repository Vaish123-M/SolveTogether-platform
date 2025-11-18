import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)
// Seed a development user account if none exist (runs only in the browser/local dev).
// WARNING: This stores the password in localStorage for convenience in development only.
// Do NOT use this approach in production. Use a proper backend and hashed passwords.
try{
  const seeds = [
    { email: 'example.gmail.com', password: 'example@1234', username: 'Example User' },
    { email: 'example@gmail.com', password: 'example@1234', username: 'Example User' }
  ]
  const existing = JSON.parse(localStorage.getItem('eh_users') || '[]')
  seeds.forEach(s => {
    if(!existing.find(u => u.email === s.email)){
      existing.push({ email: s.email, password: s.password, username: s.username, role: 'learner', createdAt: new Date().toISOString() })
    }
  })
  localStorage.setItem('eh_users', JSON.stringify(existing))
}catch(e){ console.warn('Could not seed dev user', e) }

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
