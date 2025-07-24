import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Mail, RefreshCw, ArrowLeft } from 'lucide-react'
import { resendVerificationEmail } from '../../services/authService'
import toast from 'react-hot-toast'

interface VerificationWaitingPageProps {
  email: string
}

const VerificationWaitingPage: React.FC<VerificationWaitingPageProps> = ({ email }) => {
  const [isResending, setIsResending] = useState(false)

  const handleResendEmail = async () => {
    try {
      setIsResending(true)
      await resendVerificationEmail(email)
      toast.success('Verification email sent! Please check your inbox.')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend email'
      toast.error(errorMessage)
    } finally {
      setIsResending(false)
    }
  }

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
          <Mail className="h-16 w-16 text-secondary-blue mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-4">
            We've sent a verification link to:
          </p>
          <p className="text-primary-blue font-semibold mb-6">{email}</p>
          <p className="text-gray-600 mb-6">
            Click the link in your email to verify your account and complete your registration.
          </p>

          {/* Resend Email Button */}
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full btn-outline mb-4 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
            {isResending ? 'Sending...' : 'Resend Email'}
          </button>

          <div className="text-sm text-gray-500 mb-4">
            <p>Didn't receive the email? Check your spam folder or try resending.</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center space-y-3">
          <Link
            to="/login"
            className="block w-full btn-primary"
          >
            Go to Login Page
          </Link>
          <Link 
            to="/" 
            className="inline-flex items-center text-secondary-blue hover:text-primary-blue transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerificationWaitingPage
