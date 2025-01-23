import { ArtworkType } from 'models/artwork'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as API from 'api/Api'
import Layout from 'components/ui/Layout'

import 'bootstrap/dist/css/bootstrap.min.css'
import { CommentType } from 'models/comment'
import ArtworkDetails from 'components/artwork/Details'
import Comments from 'components/comments/Comments'

const ArtworkPage: FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>()
  const [artwork, setArtwork] = useState<ArtworkType | null>(null)
  const [comments, setComments] = useState<CommentType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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
      } catch (err) {
        console.error('Error fetching artwork or comments:', err)
        setError('Failed to load artwork. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [artworkId])

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
