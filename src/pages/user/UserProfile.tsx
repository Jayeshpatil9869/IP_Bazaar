import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit3, Save, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'
import Sidebar from '../../components/Sidebar'

interface ProfileFormData {
  name: string
  email: string
  city: string
}

const UserProfile: React.FC = () => {
  const [editMode, setEditMode] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      city: user?.city || ''
    }
  })

  React.useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    
    reset({
      name: user.name,
      email: user.email,
      city: user.city
    })
  }, [user, navigate, reset])

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Mock update - replace with actual MCP server call
      // TODO: Replace with actual MCP server call
    
      setEditMode(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleCancel = () => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
      city: user?.city || ''
    })
    setEditMode(false)
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account information</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      {editMode ? (
                        <input
                          {...register('name', { 
                            required: 'Name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' }
                          })}
                          type="text"
                          className="input-field"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900">{user.name}</span>
                          <button
                            type="button"
                            onClick={() => setEditMode(true)}
                            className="text-gray-400 hover:text-primary-blue transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
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
                          placeholder="Enter your email"
                        />
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900">{user.email}</span>
                          {!editMode && (
                            <button
                              type="button"
                              onClick={() => setEditMode(true)}
                              className="text-gray-400 hover:text-primary-blue transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <div className="relative">
                      {editMode ? (
                        <input
                          {...register('city', { 
                            required: 'City is required',
                            minLength: { value: 2, message: 'City must be at least 2 characters' }
                          })}
                          type="text"
                          className="input-field"
                          placeholder="Enter your city"
                        />
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900">{user.city}</span>
                          {!editMode && (
                            <button
                              type="button"
                              onClick={() => setEditMode(true)}
                              className="text-gray-400 hover:text-primary-blue transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  {/* Member Since */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {editMode && (
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="btn-outline inline-flex items-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary inline-flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Account Information */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Account ID</h3>
                  <p className="text-gray-900 font-mono text-sm">{user.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Account Status</h3>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserProfile
