import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { loginUser, signUpUser, loginAdmin, getUserProfile } from '../services/authService'
import { User, Admin, AuthContextType } from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const userData = localStorage.getItem('user')
    const adminData = localStorage.getItem('admin')
    
    if (userData) {
      setUser(JSON.parse(userData))
    }
    if (adminData) {
      setAdmin(JSON.parse(adminData))
    }
    
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // Use real Supabase authentication
      const user = await loginUser({ email, password })
      
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      toast.success('Login successful!')
      
    } catch (error) {
      toast.error('Invalid credentials')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const adminLogin = async (username: string, password: string) => {
    try {
      setLoading(true)
      
      // Use real Supabase admin authentication
      const admin = await loginAdmin({ username, password })
      
      setAdmin(admin)
      localStorage.setItem('admin', JSON.stringify(admin))
      toast.success('Admin login successful!')
      
    } catch (error) {
      toast.error('Invalid credentials')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, city: string, password: string) => {
    try {
      setLoading(true)
      
      // Use real Supabase signup with email verification
      const newUser = await signUpUser({ name, email, city, password })
      
      // Don't set user in state until email is verified
      // Success message will be shown on the verification waiting page
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account'
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const logout = () => {
    setUser(null)
    setAdmin(null)
    localStorage.removeItem('user')
    localStorage.removeItem('admin')
    toast.success('Logged out successfully')
  }

  const value: AuthContextType = {
    user,
    admin,
    login,
    adminLogin,
    signup,
    updateUser,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
