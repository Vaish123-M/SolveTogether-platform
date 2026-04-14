import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Card, CardContent, LinearProgress, Stack, TextField, Typography } from '@mui/material'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [progressMsg, setProgressMsg] = useState('')
  const navigate = useNavigate()

  const submit = (e) =>{
    e.preventDefault()
    if(loading) return
    setError('')
    setLoading(true)
    setProgressMsg('Validating account...')
    if(!emailRegex.test(email)) return safeSetError('Please enter a valid email address.')
    if(!password) return safeSetError('Please enter your password.')

    let users = []
    try{ users = JSON.parse(localStorage.getItem('eh_users') || '[]') }catch(e){}

    const found = users.find(u => u.email === email && u.password === password)
    if(!found) return safeSetError('No account found with that email and password.')

    // set session (do not keep password in session)
    try{ localStorage.setItem('eh_user', JSON.stringify({ email: found.email, username: found.username, role: found.role })) }catch(e){}
    // notify others
    try{ window.dispatchEvent(new Event('authChanged')) }catch(e){}
    setProgressMsg(`Signed in as ${found.role}. Redirecting...`)
    // redirect by role
    setTimeout(()=>{
      if(found.role === 'learner') navigate('/learner', { replace: true })
      else if(found.role === 'contributor') navigate('/contributor', { replace: true })
      else if(found.role === 'admin') navigate('/admin', { replace: true })
      else navigate('/', { replace: true })
    }, 500)
  }

  const safeSetError = (msg) => {
    setLoading(false)
    setProgressMsg('')
    setError(msg)
  }

  return (
    <main className="page">
      <Card sx={{ maxWidth: 760, m: '40px auto' }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>Sign in</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Access your role dashboard with adaptive accessibility settings.</Typography>
          {loading && (
            <Box sx={{ mb: 2 }} aria-live="polite">
              <LinearProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>{progressMsg}</Typography>
            </Box>
          )}
          <Box component="form" onSubmit={submit}>
            <Stack spacing={2}>
              <TextField label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} inputProps={{ 'aria-label': 'Email address' }} />
              <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} inputProps={{ 'aria-label': 'Password' }} />
              {error && <Alert severity="error" role="alert">{error}</Alert>}
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained" type="submit" disabled={loading}>Sign in</Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </main>
  )
}
