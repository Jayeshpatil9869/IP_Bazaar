import { supabase } from '../lib/supabase'
import { IPRequest } from '../types'

export interface CreateRequestData {
  name: string
  ip_request: string
  city: string
  urgency: 'low' | 'medium' | 'high' | 'urgent'
}

export interface UpdateRequestData {
  name?: string
  ip_request?: string
  city?: string
  urgency?: 'low' | 'medium' | 'high' | 'urgent'
  status?: 'pending' | 'under_review' | 'approved' | 'rejected'
  admin_notes?: string
}

// Get user's IP requests
export const getUserRequests = async (userId: string): Promise<IPRequest[]> => {
  try {
    const { data: requests, error } = await supabase
      .from('ip_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error('Failed to fetch requests')
    }

    return requests || []
  } catch (error) {
    throw error
  }
}

// Create new IP request
export const createRequest = async (userId: string, requestData: CreateRequestData): Promise<IPRequest> => {
  try {
    const { data: newRequest, error } = await supabase
      .from('ip_requests')
      .insert([
        {
          user_id: userId,
          ...requestData,
          status: 'pending'
        }
      ])
      .select('*')
      .single()

    if (error) {
      throw new Error('Failed to create request')
    }

    return newRequest
  } catch (error) {
    throw error
  }
}

// Update IP request
export const updateRequest = async (requestId: string, updates: UpdateRequestData): Promise<IPRequest> => {
  try {
    const { data: updatedRequest, error } = await supabase
      .from('ip_requests')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)
      .select('*')
      .single()

    if (error) {
      throw new Error('Failed to update request')
    }

    return updatedRequest
  } catch (error) {
    throw error
  }
}

// Delete IP request
export const deleteRequest = async (requestId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('ip_requests')
      .delete()
      .eq('id', requestId)

    if (error) {
      throw new Error('Failed to delete request')
    }
  } catch (error) {
    throw error
  }
}

// Admin functions
export const getAllRequests = async (): Promise<IPRequest[]> => {
  try {
    const { data: requests, error } = await supabase
      .from('ip_requests')
      .select(`
        *,
        users (
          name,
          email,
          city
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error('Failed to fetch all requests')
    }

    return requests || []
  } catch (error) {
    throw error
  }
}

// Get requests by status
export const getRequestsByStatus = async (status: string): Promise<IPRequest[]> => {
  try {
    const { data: requests, error } = await supabase
      .from('ip_requests')
      .select(`
        *,
        users (
          name,
          email,
          city
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error('Failed to fetch requests by status')
    }

    return requests || []
  } catch (error) {
    throw error
  }
}

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    // Get total requests count
    const { count: totalRequests, error: totalError } = await supabase
      .from('ip_requests')
      .select('*', { count: 'exact', head: true })

    if (totalError) throw totalError

    // Get pending requests count
    const { count: pendingRequests, error: pendingError } = await supabase
      .from('ip_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    if (pendingError) throw pendingError

    // Get approved requests count
    const { count: approvedRequests, error: approvedError } = await supabase
      .from('ip_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')

    if (approvedError) throw approvedError

    // Get total users count
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (usersError) throw usersError

    return {
      totalRequests: totalRequests || 0,
      pendingRequests: pendingRequests || 0,
      approvedRequests: approvedRequests || 0,
      totalUsers: totalUsers || 0
    }
  } catch (error) {
    throw new Error('Failed to fetch dashboard statistics')
  }
}
