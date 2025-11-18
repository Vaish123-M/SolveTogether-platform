import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = (e) =>{
    e.preventDefault()
    setError('')
    if(!emailRegex.test(email)) return setError('Please enter a valid email address.')
    if(!password) return setError('Please enter your password.')

    let users = []
    try{ users = JSON.parse(localStorage.getItem('eh_users') || '[]') }catch(e){}

    const found = users.find(u => u.email === email && u.password === password)
    if(!found) return setError('No account found with that email and password.')

    // set session (do not keep password in session)
    try{ localStorage.setItem('eh_user', JSON.stringify({ email: found.email, username: found.username, role: found.role })) }catch(e){}
    // redirect by role
    if(found.role === 'learner') navigate('/learner')
    else if(found.role === 'contributor') navigate('/contributor')
    else navigate('/')
  }

  return (
    <main className="page">
      <div style={{maxWidth:720, margin:'40px auto'}} className="card">
        <h2>Sign in</h2>
        <form onSubmit={submit}>
          <label style={{display:'block', marginTop:8}}>Email</label>
          <input type="email" style={{width:'100%', padding:8}} value={email} onChange={(e)=>setEmail(e.target.value)} />

          <label style={{display:'block', marginTop:8}}>Password</label>
          <input type="password" style={{width:'100%', padding:8}} value={password} onChange={(e)=>setPassword(e.target.value)} />

          {error && <div style={{color:'var(--danger, #d9534f)', marginTop:12}} role="alert">{error}</div>}

          <div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}>
            <button className="btn btn-primary" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </main>
  )
}
