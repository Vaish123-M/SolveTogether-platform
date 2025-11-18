import React from 'react'
import { Navigate } from 'react-router-dom'

// ProtectedRoute wraps children and enforces that a user is signed in and optionally
// that their role is included in `allowedRoles`.
export default function ProtectedRoute({ children, allowedRoles }){
  let user = null
  try{ user = JSON.parse(localStorage.getItem('eh_user')) }catch(e){ user = null }

  if(!user){
    // not signed in
    return <Navigate to="/login" replace />
  }

  if(allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0){
    if(!allowedRoles.includes(user.role)){
      // signed in but wrong role
      return <Navigate to="/" replace />
    }
  }

  return children
}
