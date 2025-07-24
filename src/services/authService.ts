import { supabase } from '../lib/supabase'

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpData {
  name: string
  email: string
  city: string
  password: string
}

export interface AdminLoginCredentials {
  username: string
  password: string
}

// User Authentication with Supabase Auth
export const loginUser = async ({ email, password }: LoginCredentials) => {
  try {
    // Use Supabase Auth for login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError) {
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error('Login failed')
    }

    // Check if email is verified
    if (!authData.user.email_confirmed_at) {
      throw new Error('Please verify your email before logging in')
    }

    // Get user profile from our users table
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('id, name, email, city, verification_status, created_at')
      .eq('email', email)
      .single()

    if (profileError || !userProfile) {
      throw new Error('User profile not found')
    }

    // Check if user is verified in our database
    if (userProfile.verification_status !== 'verified') {
      throw new Error('Please verify your email before logging in. Check your inbox for the verification link.')
    }

    return {
      ...userProfile,
      auth_id: authData.user.id
    }
  } catch (error) {
    throw error
  }
}

export const signUpUser = async ({ name, email, city, password }: SignUpData) => {
  try {
    // First, create user with Supabase Auth (this will send verification email)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`
      }
    })

    if (authError) {
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error('Failed to create account')
    }

    // Create user profile in our users table
    const { data: newUser, error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id, // Use Supabase Auth user ID
          name,
          email,
          city,
          password, // Store password in plain text as requested
          verification_status: 'unverified'
        }
      ])
      .select('id, name, email, city, verification_status, created_at')
      .single()

    if (profileError) {
      console.error('Profile creation error:', profileError)
      throw new Error('Failed to create user profile: ' + profileError.message)
    }

    return {
      ...newUser,
      auth_id: authData.user.id,
      needsVerification: true
    }
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

// Admin Authentication - Hardcoded credentials
export const loginAdmin = async ({ username, password }: AdminLoginCredentials) => {
  try {
    // Hardcoded admin credentials as requested
    const ADMIN_USERNAME = 'admin'
    const ADMIN_PASSWORD = 'admin123'

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      throw new Error('Invalid username or password')
    }

    // Return hardcoded admin object
    const admin = {
      id: 'admin-001',
      username: 'admin',
      email: 'admin@ipbazaar.com',
      role: 'admin',
      is_active: true,
      created_at: new Date().toISOString()
    }

    return admin
  } catch (error) {
    throw error
  }
}

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, city, created_at')
      .eq('id', userId)
      .single()

    if (error) {
      throw new Error('Failed to fetch user profile')
    }

    return user
  } catch (error) {
    throw error
  }
}

// Resend verification email
export const resendVerificationEmail = async (email: string) => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`
      }
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true }
  } catch (error) {
    throw error
  }
}

// Update user verification status
export const updateUserVerificationStatus = async (userId: string, status: 'verified' | 'unverified') => {
  try {
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({
        verification_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select('id, name, email, city, verification_status, created_at, updated_at')
      .single()

    if (error) {
      throw new Error('Failed to update verification status')
    }

    return updatedUser
  } catch (error) {
    throw error
  }
}

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<SignUpData>) => {
  try {
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select('id, name, email, city, created_at, updated_at')
      .single()

    if (error) {
      throw new Error('Failed to update profile')
    }

    return updatedUser
  } catch (error) {
    throw error
  }
}
