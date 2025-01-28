import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as API from 'api/Api'
import Layout from 'components/ui/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ArtworkType } from 'models/artwork'
import { CommentType } from 'models/comment'
import ArtworkDetails from 'components/artwork/Details'
import Comments from 'components/comments/Comments'
import authStore from 'stores/auth.store'

const ArtworkPage: FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>()
  const [artwork, setArtwork] = useState<ArtworkType | null>(null)
  const [comments, setComments] = useState<CommentType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [favoriteError, setFavoriteError] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [favoriteId, setFavoriteId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!artworkId) throw new Error('Artwork ID is missing')

        const [artworkResponse, commentsResponse] = await Promise.all([
          API.fetchArtworkById(artworkId),
          API.fetchCommentsByArtworkId(artworkId),
        ])
        setArtwork(artworkResponse.data)
        setComments(commentsResponse.data)

        if (authStore.user) {
          const response = await API.checkIfFavorited(
            authStore.user.id,
            artworkId,
          )
          if (response && response.data) {
            setIsFavorite(response.data.isFavorited)
            setFavoriteId(response.data.favoriteId)
          } else {
            console.error('Invalid response structure:', response)
          }
        }
      } catch (err) {
        console.error('Error fetching artwork or comments:', err)
        setError('Failed to load artwork. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [artworkId])

  const handleFavorite = async () => {
    setFavoriteError(null)
    if (!authStore.user) {
      setFavoriteError('You must be logged in to favorite an artwork.')
      return
    }
    try {
      if (isFavorite) {
        await API.removeFavorite(authStore.user.id, artworkId!)
        setIsFavorite(false)
      } else {
        await API.addFavorite({
          user_id: authStore.user.id,
          artwork_id: artworkId!,
        })
        setIsFavorite(true)
      }
    } catch (err) {
      console.error('Error updating favorite status:', err)
      setFavoriteError('Failed to update favorite status. Please try again.')
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mt-5">
          <p>Loading artwork...</p>
        </div>
      </Layout>
    )
  }

  if (error || !artwork) {
    return (
      <Layout>
        <div className="container mt-5">
          <p style={{ color: 'red' }}>{error || 'Artwork not found.'}</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mt-5">
        <ArtworkDetails artwork={artwork} />
        <hr className="my-5" />
        {authStore.user && (
          <div className="mb-3">
            <button
              className={`btn ${
                isFavorite ? 'btn-success' : 'btn-outline-primary'
              }`}
              onClick={handleFavorite}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            {favoriteError && (
              <p className="text-danger mt-2">{favoriteError}</p>
            )}
          </div>
        )}
        <Comments
          artworkId={artworkId!}
          comments={comments}
          setComments={setComments}
        />
      </div>
    </Layout>
  )
}

export default ArtworkPage
