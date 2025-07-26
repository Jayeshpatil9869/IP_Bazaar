import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Search, Edit3, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'
import { User } from '../../types'
import Sidebar from '../../components/Sidebar'
import { getAllUsers, updateUser } from '../../services/adminService'

interface EditUserFormData {
  name: string
  email: string
  city: string
}

const AdminRegistrations: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { admin, logout, loading } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditUserFormData>()

  useEffect(() => {
    // Don't redirect if still loading
    if (loading) return
    
    if (!admin) {
      navigate('/admin/login')
      return
    }

    const fetchUsers = async () => {
      try {
        // Fetch real data from database
        const usersData = await getAllUsers()
        setUsers(usersData)
        setFilteredUsers(usersData)
      } catch (error) {
        console.error('Error fetching users:', error)
        toast.error('Failed to load users data')
        
        // Fallback to empty data
        setUsers([])
        setFilteredUsers([])
      }
    }

    fetchUsers()
  }, [admin, navigate, loading])

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [users, searchTerm])

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    setShowModal(true)
    setEditMode(false)
    reset({
      name: user.name,
      email: user.email,
      city: user.city
    })
  }

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
    if (selectedUser) {
      reset({
        name: selectedUser.name,
        email: selectedUser.email,
        city: selectedUser.city
      })
    }
  }

  const onSubmit = async (data: EditUserFormData) => {
    try {
      if (selectedUser) {
        // Call the actual API to update user in database
        const updatedUser = await updateUser(selectedUser.id, {
          name: data.name,
          email: data.email,
          city: data.city
        })
        
        // Update local state with the response from server
        setUsers(prev => prev.map(user => user.id === selectedUser.id ? updatedUser : user))
        setSelectedUser(updatedUser)
        setEditMode(false)
        toast.success('User updated successfully!')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user. Please try again.')
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
              <h1 className="text-3xl font-bold text-gray-900">User Registrations</h1>
              <p className="text-gray-600 mt-2">Manage all registered users and their information</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>

            {/* Users Table */}
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
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registration Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr 
                        key={user.id} 
                        className="table-row cursor-pointer"
                        onClick={() => handleUserClick(user)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(user.created_at)}
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No users found matching your criteria.
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

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* User ID */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">User ID</h3>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">#{selectedUser.id}</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {editMode ? (
                    <input
                      {...register('name', { 
                        required: 'Name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      type="text"
                      className="input-field"
                      placeholder="Enter full name"
                    />
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">{selectedUser.name}</span>
                    </div>
                  )}
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {editMode ? (
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="input-field"
                      placeholder="Enter email address"
                    />
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">{selectedUser.email}</span>
                    </div>
                  )}
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  {editMode ? (
                    <input
                      {...register('city', { 
                        required: 'City is required',
                        minLength: { value: 2, message: 'City must be at least 2 characters' }
                      })}
                      type="text"
                      className="input-field"
                      placeholder="Enter city"
                    />
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">{selectedUser.city}</span>
                    </div>
                  )}
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                {/* Registration Date */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Registration Date</h3>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {formatDate(selectedUser.created_at)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  {editMode ? (
                    <>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="btn-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary inline-flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="btn-primary inline-flex items-center"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit User
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminRegistrations
