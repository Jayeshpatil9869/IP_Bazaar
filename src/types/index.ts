export interface User {
  id: string
  name: string
  email: string
  city: string
  verification_status?: 'verified' | 'unverified'
  created_at: string
}

export interface IPRequest {
  id: string
  user_id: string
  name: string
  ip_request: string
  city: string
  urgency: 'Low' | 'Medium' | 'High'
  created_at: string
  user?: User
}

export interface Admin {
  id: string
  username: string
  email: string
  role: string
  is_active: boolean
  created_at: string
}

export interface AuthContextType {
  user: User | null
  admin: Admin | null
  login: (email: string, password: string) => Promise<void>
  adminLogin: (username: string, password: string) => Promise<void>
  signup: (name: string, email: string, city: string, password: string) => Promise<void>
  updateUser: (updatedUser: User) => void
  logout: () => void
  loading: boolean
}

export interface DashboardStats {
  totalUsers: number
  totalRequests: number
}
