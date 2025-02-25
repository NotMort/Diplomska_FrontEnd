import { FC, useEffect, useState } from 'react'
import Layout from 'components/ui/Layout'
import List from 'components/artwork/List'
import * as API from 'api/Api'
import { UserType } from 'models/auth'
import { ArtworkType } from 'models/artwork'

const Profile: FC = () => {
  const [user, setUser] = useState<UserType | null>(null)
  const [artworks, setArtworks] = useState<ArtworkType[]>([])
  const [favoriteArtworks, setFavoriteArtworks] = useState<ArtworkType[]>([])
  const [loadingArtworks, setLoadingArtworks] = useState<boolean>(true)
  const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true)
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

    const getUserArtworks = async () => {
      try {
        const response = await API.fetchUserArtworks()
        setArtworks(response.data)
      } catch (err) {
        setError('Failed to load user artworks. Please try again later.')
      } finally {
        setLoadingArtworks(false)
      }
    }

    const getUserFavorites = async () => {
      try {
        const favoriteIdsResponse = await API.fetchUserFavorites()
        const favoriteIds = favoriteIdsResponse.data.map(
          (favorite: { artwork_id: string }) => favorite.artwork_id,
        )

        const favoriteDetails = await Promise.all(
          favoriteIds.map((id: string) =>
            API.fetchArtworkById(id).then((res) => res.data),
          ),
        )
        setFavoriteArtworks(favoriteDetails)
      } catch (err) {
        setError('Failed to load favorite artworks. Please try again later.')
      } finally {
        setLoadingFavorites(false)
      }
    }

    getUserProfile()
    getUserArtworks()
    getUserFavorites()
  }, [])

  // ✅ Handle Artwork Deletion (With Confirmation)
  const handleDeleteArtwork = async (artworkId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this artwork? This action cannot be undone.',
    )
    if (!confirmed) return

    try {
      await API.deleteArtwork(artworkId)
      setArtworks((prev) => prev.filter((artwork) => artwork.id !== artworkId))
    } catch (err) {
      alert('Failed to delete artwork. Please try again.')
    }
  }

  // ✅ Handle Favorite Click (With Confirmation)
  const handleFavoriteClick = async (artworkId: string) => {
    if (!user) return

    const isFavorited = favoriteArtworks.some((art) => art.id === artworkId)
    if (isFavorited) {
      const confirmed = window.confirm(
        'Do you want to remove this artwork from favorites?',
      )
      if (!confirmed) return

      try {
        await API.removeFavorite(user.id, artworkId)
        setFavoriteArtworks((prev) =>
          prev.filter((artwork) => artwork.id !== artworkId),
        )
      } catch (err) {
        alert('Failed to remove from favorites. Please try again.')
      }
    }
  }

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
        <p>Loading profile...</p>
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
            src={`http://localhost:8080/files/avatars/${user.avatar}`}
            alt="User Avatar"
            style={{ width: '100px', borderRadius: '50%' }}
            onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
          />
        </p>
      )}

      <h2>Your Artworks</h2>
      {loadingArtworks && <p>Loading artworks...</p>}
      {!loadingArtworks && artworks.length === 0 && <p>No artworks found.</p>}
      {!loadingArtworks && artworks.length > 0 && (
        <List artworks={artworks} onCardClick={handleDeleteArtwork} />
      )}

      <h2>Favorited Artworks</h2>
      {loadingFavorites && <p>Loading favorite artworks...</p>}
      {!loadingFavorites && favoriteArtworks.length === 0 && (
        <p>No favorite artworks found.</p>
      )}
      {!loadingFavorites && favoriteArtworks.length > 0 && (
        <List artworks={favoriteArtworks} onCardClick={handleFavoriteClick} />
      )}
    </Layout>
  )
}

export default Profile
