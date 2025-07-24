import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import VerificationWaitingPage from './VerificationWaitingPage'

const VerificationWaitingWrapper: React.FC = () => {
  const location = useLocation()
  const email = location.state?.email

  // If no email is provided, redirect to signup
  if (!email) {
    return <Navigate to="/signup" replace />
  }

  return <VerificationWaitingPage email={email} />
}

export default VerificationWaitingWrapper
