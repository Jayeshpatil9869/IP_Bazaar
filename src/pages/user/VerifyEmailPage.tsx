import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, CheckCircle, XCircle, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { updateUserVerificationStatus } from '../../services/authService'

const VerifyEmailPage: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Get the hash from URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')

        if (accessToken && refreshToken) {
          // Set the session
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })

          if (error) {
            throw error
          }

          if (data.user && data.user.email_confirmed_at) {
            // Update verification status in our users table
            try {
              await updateUserVerificationStatus(data.user.id, 'verified')
            } catch (error) {
              console.error('Failed to update verification status:', error)
            }
            
            setVerificationStatus('success')
            setMessage('Email verified successfully! You can now log in.')
            
            // Redirect to login page after 3 seconds
            setTimeout(() => {
              navigate('/login')
            }, 3000)
          } else {
            throw new Error('Email verification failed')
          }
        } else {
          throw new Error('Invalid verification link')
        }
      } catch (error) {
        setVerificationStatus('error')
        setMessage(error instanceof Error ? error.message : 'Email verification failed')
      }
    }

    handleEmailVerification()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-lighter-grey to-light-grey flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-primary-blue mr-3" />
            <h1 className="text-3xl font-bold text-primary-blue">IPBazaar</h1>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {verificationStatus === 'loading' && (
            <>
              <Mail className="h-16 w-16 text-secondary-blue mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
              <p className="text-gray-600">Please wait while we verify your email address...</p>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">Redirecting to login page...</p>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Link
                  to="/signup"
                  className="block w-full btn-primary"
                >
                  Try Signing Up Again
                </Link>
                <Link
                  to="/login"
                  className="block w-full text-secondary-blue hover:text-primary-blue font-medium transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-secondary-blue hover:text-primary-blue transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage
