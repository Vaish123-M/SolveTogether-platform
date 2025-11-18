import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Signup(){
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('learner')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = (e) =>{
    e.preventDefault()
    setError('')
    if(!username) return setError('Please enter a name.')
    if(!emailRegex.test(email)) return setError('Please enter a valid email address.')
    if(password.length < 6) return setError('Password must be at least 6 characters.')
    if(password !== confirmPassword) return setError('Passwords do not match.')

    // load existing users
    let users = []
    try{ users = JSON.parse(localStorage.getItem('eh_users') || '[]') }catch(e){}

    // prevent duplicate email
    if(users.find(u => u.email === email)) return setError('An account with that email already exists.')

    const user = { email, password, username, role, createdAt: new Date().toISOString() }
    users.push(user)
    try{ localStorage.setItem('eh_users', JSON.stringify(users)) }catch(e){ console.error(e) }

    // set current session (do not store password in session object)
    try{ localStorage.setItem('eh_user', JSON.stringify({ email, username, role })) }catch(e){}
    // redirect by role
    if(role === 'learner') navigate('/learner')
    else if(role === 'contributor') navigate('/contributor')
    else navigate('/')
  }

  return (
    <main className="page">
      <div style={{maxWidth:720, margin:'40px auto'}} className="card">
        <h2>Create an account</h2>
        <form onSubmit={submit}>
          <label style={{display:'block', marginTop:8}}>Name</label>
          <input style={{width:'100%', padding:8}} value={username} onChange={(e)=>setUsername(e.target.value)} />

          <label style={{display:'block', marginTop:8}}>Email</label>
          <input type="email" style={{width:'100%', padding:8}} value={email} onChange={(e)=>setEmail(e.target.value)} />

          <label style={{display:'block', marginTop:8}}>Password</label>
          <input type="password" style={{width:'100%', padding:8}} value={password} onChange={(e)=>setPassword(e.target.value)} />

          <label style={{display:'block', marginTop:8}}>Confirm Password</label>
          <input type="password" style={{width:'100%', padding:8}} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />

          <label style={{display:'block', marginTop:8}}>Role</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)} style={{width:'100%', padding:8}}>
            <option value="learner">Learner</option>
            <option value="contributor">Contributor</option>
            <option value="mentor">Mentor</option>
          </select>

          {error && <div style={{color:'var(--danger, #d9534f)', marginTop:12}} role="alert">{error}</div>}

          <div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}>
            <button className="btn btn-primary" type="submit">Create account</button>
          </div>
        </form>
      </div>
    </main>
  )
}
