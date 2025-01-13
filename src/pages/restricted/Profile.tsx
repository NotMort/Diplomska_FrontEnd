import { FC, useEffect, useState } from 'react'
import Layout from 'components/ui/Layout'
import * as API from 'api/Api'
import { UserType } from 'models/auth'

const Profile: FC = () => {
  const [user, setUser] = useState<UserType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await API.fetchAuthUser()
        if (response?.status === 200) {
          setUser(response.data)
        } else {
          setError('Failed to fetch user profile')
        }
      } catch (err) {
        setError('An error occurred while fetching user profile')
      }
    }

    getUserProfile()
  }, [])

  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1>Profile</h1>
      <p>
        <strong>Name:</strong> {user.first_name} {user.last_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.avatar && (
        <p>
          <strong>Avatar:</strong>
          <img
            src={user.avatar}
            alt="User Avatar"
            style={{ width: '100px', borderRadius: '50%' }}
          />
        </p>
      )}
    </Layout>
  )
}

export default Profile
