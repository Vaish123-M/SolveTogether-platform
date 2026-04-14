import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Card, CardContent, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Signup(){
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('learner')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [progressMsg, setProgressMsg] = useState('')
  const navigate = useNavigate()

  const submit = (e) =>{
    e.preventDefault()
    if(loading) return
    setError('')
    setLoading(true)
    setProgressMsg('Validating account details...')
    if(!username) return safeSetError('Please enter a name.')
    if(!emailRegex.test(email)) return safeSetError('Please enter a valid email address.')
    if(password.length < 6) return safeSetError('Password must be at least 6 characters.')
    if(password !== confirmPassword) return safeSetError('Passwords do not match.')

    // load existing users
    let users = []
    try{ users = JSON.parse(localStorage.getItem('eh_users') || '[]') }catch(e){}

    // prevent duplicate email
    if(users.find(u => u.email === email)) return safeSetError('An account with that email already exists.')

    const user = { email, password, username, role, createdAt: new Date().toISOString() }
    users.push(user)
    setProgressMsg('Creating account...')
    try{ localStorage.setItem('eh_users', JSON.stringify(users)) }catch(e){ console.error(e) }

    // set current session (do not store password in session object)
    try{ localStorage.setItem('eh_user', JSON.stringify({ email, username, role })) }catch(e){}
    // notify others
    try{ window.dispatchEvent(new Event('authChanged')) }catch(e){}
    setProgressMsg(`Welcome ${username}. Redirecting to ${role} dashboard...`)
    // redirect by role
    setTimeout(()=>{
      if(role === 'learner') navigate('/learner', { replace: true })
      else if(role === 'contributor') navigate('/contributor', { replace: true })
      else if(role === 'admin') navigate('/admin', { replace: true })
      else navigate('/', { replace: true })
    }, 550)
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
          <Typography variant="h4" component="h1" gutterBottom>Create an account</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Step 1: Profile details. Step 2: Role selection. Step 3: Redirect to your workspace.</Typography>
          {loading && (
            <Box sx={{ mb: 2 }} aria-live="polite">
              <LinearProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>{progressMsg}</Typography>
            </Box>
          )}
          <Box component="form" onSubmit={submit}>
            <Stack spacing={2}>
              <TextField label="Name" value={username} onChange={(e)=>setUsername(e.target.value)} inputProps={{ 'aria-label': 'Name' }} />
              <TextField label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} inputProps={{ 'aria-label': 'Email address' }} />
              <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} inputProps={{ 'aria-label': 'Password' }} />
              <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} inputProps={{ 'aria-label': 'Confirm password' }} />
              <TextField
                select
                label="Role"
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                inputProps={{ 'aria-label': 'Select account role' }}
              >
                <MenuItem value="learner">Learner</MenuItem>
                <MenuItem value="contributor">Contributor</MenuItem>
                <MenuItem value="mentor">Mentor</MenuItem>
              </TextField>

              {error && <Alert severity="error" role="alert">{error}</Alert>}
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained" type="submit" disabled={loading}>Create account</Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </main>
  )
}
