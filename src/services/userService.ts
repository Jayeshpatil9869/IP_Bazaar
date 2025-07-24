import { supabase } from '../lib/supabase'
import { IPRequest } from '../types'

// Get user's IP requests
export const getUserRequests = async (userId: string): Promise<IPRequest[]> => {
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
      .eq('user_id', userId)
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
    console.error('Error fetching user requests:', error)
    throw error
  }
}

// Submit a new IP request
export const submitIPRequest = async (requestData: {
  user_id: string
  name: string
  ip_request: string
  city: string
  urgency: 'Low' | 'Medium' | 'High'
}): Promise<IPRequest> => {
  try {
    const { data: request, error } = await supabase
      .from('ip_requests')
      .insert([{
        user_id: requestData.user_id,
        name: requestData.name,
        ip_request: requestData.ip_request,
        city: requestData.city,
        urgency: requestData.urgency,
        created_at: new Date().toISOString()
      }])
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
      .single()

    if (error) {
      throw error
    }

    // Transform the data to match our IPRequest interface
    const transformedRequest: IPRequest = {
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
    }

    return transformedRequest
  } catch (error) {
    console.error('Error submitting IP request:', error)
    throw error
  }
}
