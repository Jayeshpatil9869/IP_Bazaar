import { supabase } from '../lib/supabase'
import { IPRequest, User, DashboardStats } from '../types'

// Get dashboard statistics
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Get total users count
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (usersError) {
      throw usersError
    }

    // Get total requests count
    const { count: totalRequests, error: requestsError } = await supabase
      .from('ip_requests')
      .select('*', { count: 'exact', head: true })

    if (requestsError) {
      throw requestsError
    }

    return {
      totalUsers: totalUsers || 0,
      totalRequests: totalRequests || 0
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw error
  }
}

// Get latest IP requests with user details
export const getLatestRequests = async (limit: number = 10): Promise<IPRequest[]> => {
  try {
    const { data: requests, error } = await supabase
      .from('ip_requests')
      .select(`
        *,
        users:user_id (
          id,
          name,
          email,
          city,
          verification_status,
          created_at
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw error
    }

    // Transform the data to match our IPRequest interface
    const transformedRequests: IPRequest[] = requests?.map(request => ({
      id: request.id,
      user_id: request.user_id,
      name: request.name,
      ip_request: request.ip_request,
      city: request.city,
      urgency: request.urgency,
      created_at: request.created_at,
      user: request.users ? {
        id: request.users.id,
        name: request.users.name,
        email: request.users.email,
        city: request.users.city,
        created_at: request.users.created_at
      } : undefined
    })) || []

    return transformedRequests
  } catch (error) {
    console.error('Error fetching latest requests:', error)
    throw error
  }
}

// Get all IP requests with user details
export const getAllRequests = async (): Promise<IPRequest[]> => {
  try {
    const { data: requests, error } = await supabase
      .from('ip_requests')
      .select(`
        *,
        users:user_id (
          id,
          name,
          email,
          city,
          verification_status,
          created_at
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    // Transform the data to match our IPRequest interface
    const transformedRequests: IPRequest[] = requests?.map(request => ({
      id: request.id,
      user_id: request.user_id,
      name: request.name,
      ip_request: request.ip_request,
      city: request.city,
      urgency: request.urgency,
      created_at: request.created_at,
      user: request.users ? {
        id: request.users.id,
        name: request.users.name,
        email: request.users.email,
        city: request.users.city,
        created_at: request.users.created_at
      } : undefined
    })) || []

    return transformedRequests
  } catch (error) {
    console.error('Error fetching all requests:', error)
    throw error
  }
}

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, city, verification_status, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return users || []
  } catch (error) {
    console.error('Error fetching all users:', error)
    throw error
  }
}

// Update request status (if you want to add this feature)
export const updateRequestStatus = async (requestId: string, status: string, adminNotes?: string) => {
  try {
    const { data, error } = await supabase
      .from('ip_requests')
      .update({ 
        status,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error updating request status:', error)
    throw error
  }
}
