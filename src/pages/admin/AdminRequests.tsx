import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Search, Filter } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { IPRequest } from '../../types'
import Sidebar from '../../components/Sidebar'
import { getAllRequests } from '../../services/adminService'
import toast from 'react-hot-toast'

const AdminRequests: React.FC = () => {
  const [requests, setRequests] = useState<IPRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<IPRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<IPRequest | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [urgencyFilter, setUrgencyFilter] = useState('')
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login')
      return
    }

    const fetchRequests = async () => {
      try {
        // Fetch real data from database
        const requestsData = await getAllRequests()
        setRequests(requestsData)
        setFilteredRequests(requestsData)
      } catch (error) {
        console.error('Error fetching requests:', error)
        toast.error('Failed to load requests data')
        
        // Fallback to empty data
        setRequests([])
        setFilteredRequests([])
      }
    }

    fetchRequests()
  }, [admin, navigate])

  useEffect(() => {
    let filtered = requests

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.ip_request.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by urgency
    if (urgencyFilter) {
      filtered = filtered.filter(request => request.urgency === urgencyFilter)
    }

    setFilteredRequests(filtered)
  }, [requests, searchTerm, urgencyFilter])

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
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">All IP Requests</h1>
              <p className="text-gray-600 mt-2">Manage and review all submitted IP requests</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search requests, users, or emails..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={urgencyFilter}
                      onChange={(e) => setUrgencyFilter(e.target.value)}
                      className="input-field pl-10"
                    >
                      <option value="">All Urgencies</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredRequests.length} of {requests.length} requests
              </p>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                        IP Request
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Urgency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRequests.map((request) => (
                      <tr 
                        key={request.id} 
                        className="table-row cursor-pointer"
                        onClick={() => handleRequestClick(request)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{request.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.name}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(request.created_at)}
                        </td>
                      </tr>
                    ))}
                    {filteredRequests.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          No requests found matching your criteria.
                        </td>
                      </tr>
                    )}
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

export default AdminRequests
