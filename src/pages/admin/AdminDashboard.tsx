import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, FileText, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { IPRequest, User, DashboardStats } from '../../types'
import Sidebar from '../../components/Sidebar'
import { getDashboardStats, getLatestRequests } from '../../services/adminService'
import toast from 'react-hot-toast'

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({ totalUsers: 0, totalRequests: 0 })
  const [latestRequests, setLatestRequests] = useState<IPRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<IPRequest | null>(null)
  const [showModal, setShowModal] = useState(false)
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login')
      return
    }

    const fetchDashboardData = async () => {
      try {
        // Fetch real data from database
        const [statsData, requestsData] = await Promise.all([
          getDashboardStats(),
          getLatestRequests(10) // Get latest 10 requests for dashboard
        ])

        setStats(statsData)
        setLatestRequests(requestsData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast.error('Failed to load dashboard data')
        
        // Fallback to empty data
        setStats({ totalUsers: 0, totalRequests: 0 })
        setLatestRequests([])
      }
    }

    fetchDashboardData()
  }, [admin, navigate])

  const handleRequestClick = (request: IPRequest) => {
    setSelectedRequest(request)
    setShowModal(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'text-red-600 bg-red-100'
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'Low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (!admin) {
    return null
  }

  return (
    <div className="flex h-screen bg-lighter-grey">
      <Sidebar admin={admin} onLogout={logout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Overview of platform activity and recent requests</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center">
                  <div className="bg-primary-blue bg-opacity-10 rounded-full p-3 mr-4">
                    <Users className="h-8 w-8 text-primary-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                    <p className="text-3xl font-bold text-primary-blue">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center">
                  <div className="bg-secondary-blue bg-opacity-10 rounded-full p-3 mr-4">
                    <FileText className="h-8 w-8 text-secondary-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Total Requests</h3>
                    <p className="text-3xl font-bold text-secondary-blue">{stats.totalRequests.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Requests Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Latest 10 Requests</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Request
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Urgency
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {latestRequests.map((request) => (
                      <tr 
                        key={request.id} 
                        className="table-row cursor-pointer"
                        onClick={() => handleRequestClick(request)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{request.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.user?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.user?.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {request.ip_request}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Request Details Modal */}
      {showModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Request ID</h3>
                    <p className="text-gray-900">#{selectedRequest.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Submitted</h3>
                    <p className="text-gray-900">{formatDate(selectedRequest.created_at)}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">User Name</h3>
                    <p className="text-gray-900">{selectedRequest.user?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email</h3>
                    <p className="text-gray-900">{selectedRequest.user?.email || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">City</h3>
                    <p className="text-gray-900">{selectedRequest.city}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Urgency</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(selectedRequest.urgency)}`}>
                      {selectedRequest.urgency}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Request Name</h3>
                  <p className="text-gray-900">{selectedRequest.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Request Details</h3>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedRequest.ip_request}</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
