import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Box, Button, Chip, Toolbar } from '@mui/material'
import UserSettingsPanel from './UserSettingsPanel'
import Magnifier from './Magnifier'
import ScreenReaderCheck from './ScreenReaderCheck'
import KeyboardGuide from './KeyboardGuide'
import { HomeIcon, LightbulbIcon } from './icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const [showSettings, setShowSettings] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    function readUser() {
      try {
        const raw = localStorage.getItem('eh_user')
        if (raw) setUser(JSON.parse(raw))
        else setUser(null)
      } catch (e) { setUser(null) }
    }
    readUser()
    function onStorage(e) { if (e.key === 'eh_user') readUser() }
    function onAuth() { readUser() }
    window.addEventListener('storage', onStorage)
    window.addEventListener('authChanged', onAuth)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('authChanged', onAuth)
    }
  }, [])

  const doLogout = () => {
    try { localStorage.removeItem('eh_user') } catch (e) { }
    setUser(null)
    try { window.dispatchEvent(new Event('authChanged')) } catch (e) { }
    navigate('/')
  }
  
  const links = [
    { to: '/', label: 'Home', icon: <HomeIcon size={20} /> },
    { to: '/showcase', label: 'Showcase', icon: <LightbulbIcon size={20} /> },
  ]

  return (
    <AppBar position="sticky" color="inherit" elevation={0} role="banner" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Toolbar sx={{ gap: 2, alignItems: 'center' }}>
        <Button href="/" variant="text" sx={{ fontSize: 20, fontWeight: 900, textTransform: 'none' }} aria-label="EnableHub home">EnableHub</Button>

        <Box component="nav" aria-label="Main navigation" sx={{ display: 'flex', gap: 0.5 }}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              style={{ textDecoration: 'none' }}
              aria-label={`${l.label} page`}
            >
              {({isActive}) => (
                <Chip
                  icon={l.icon}
                  color={isActive ? 'primary' : 'default'}
                  variant={isActive ? 'filled' : 'outlined'}
                  label={l.label}
                  size="small"
                />
              )}
            </NavLink>
          ))}
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button size="small" variant="text" aria-label="Open settings" onClick={()=>setShowSettings(true)}>Settings</Button>
          {!user && (
            <>
              <Button size="small" variant="outlined" onClick={()=>navigate('/login')}>Sign in</Button>
            </>
          )}
          {user && (
            <>
              <Avatar sx={{ width: 32, height: 32 }} aria-hidden>{(user.username||user.email||'U').charAt(0).toUpperCase()}</Avatar>
              <Button size="small" variant="text" aria-label="Logout" onClick={doLogout}>Sign out</Button>
            </>
          )}
        </Box>

        <UserSettingsPanel open={showSettings} onClose={()=>setShowSettings(false)} />
        <Magnifier />
        <ScreenReaderCheck />
        <KeyboardGuide />
      </Toolbar>
    </AppBar>
  )
}
