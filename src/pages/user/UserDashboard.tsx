import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'
import { IPRequest } from '../../types'
import Sidebar from '../../components/Sidebar'
import { getUserRequests, submitIPRequest } from '../../services/userService'

interface NewRequestFormData {
  name: string
  ip_request: string
  city: string
  urgency: 'Low' | 'Medium' | 'High'
}

const UserDashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [requests, setRequests] = useState<IPRequest[]>([])
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NewRequestFormData>()

  useEffect(() => {
    // Don't redirect if still loading
    if (loading) return
    
    if (!user) {
      navigate('/login')
      return
    }

    const fetchUserRequests = async () => {
      try {
        const userRequests = await getUserRequests(user.id)
        setRequests(userRequests)
      } catch (error) {
        console.error('Error fetching user requests:', error)
        toast.error('Failed to load your requests')
        setRequests([])
      }
    }

    fetchUserRequests()
  }, [user, navigate, loading])

  const onSubmit = async (data: NewRequestFormData) => {
    try {
      const newRequest = await submitIPRequest({
        user_id: user!.id,
        name: data.name,
        ip_request: data.ip_request,
        city: data.city,
        urgency: data.urgency
      })

      setRequests(prev => [newRequest, ...prev])
      setShowModal(false)
      reset()
      toast.success('Request submitted successfully!')
    } catch (error) {
      console.error('Error submitting request:', error)
      toast.error('Failed to submit request')
    }
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

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-lighter-grey">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-lighter-grey">
      <Sidebar user={user} onLogout={logout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Your IP Requests</h1>
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Request
              </button>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sr.No.
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
                        Date and Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request, index) => (
                      <tr key={request.id} className="table-row">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
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
                    {requests.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          No requests found. Create your first request to get started!
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

      {/* New Request Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Submit New IP Request</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Name
                  </label>
                  <input
                    {...register('name', { required: 'Request name is required' })}
                    type="text"
                    className="input-field"
                    placeholder="Enter request name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* IP Request */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IP Request Details
                  </label>
                  <textarea
                    {...register('ip_request', { required: 'Request details are required' })}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Describe your IP request in detail..."
                  />
                  {errors.ip_request && (
                    <p className="mt-1 text-sm text-red-600">{errors.ip_request.message}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    {...register('city', { required: 'City is required' })}
                    type="text"
                    className="input-field"
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    {...register('urgency', { required: 'Urgency level is required' })}
                    className="input-field"
                  >
                    <option value="">Select urgency level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  {errors.urgency && (
                    <p className="mt-1 text-sm text-red-600">{errors.urgency.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
