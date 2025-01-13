import { ArtworkType } from 'models/artwork'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as API from 'api/Api'
import Layout from 'components/ui/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'

const ArtworkPage: FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>()
  const [artwork, setArtwork] = useState<ArtworkType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        if (!artworkId) throw new Error('Artwork ID is missing')
        const response = await API.fetchArtworkById(artworkId)
        setArtwork(response.data)
      } catch (err) {
        console.error('Error fetching artwork:', err)
        setError('Failed to load artwork. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchArtwork()
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
        <div className="row">
          <div className="col-md-6">
            <img
              src={artwork.image_path}
              alt={artwork.title}
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h1 className="mb-3">{artwork.title}</h1>
            <p className="text-muted">Category: {artwork.category}</p>
            <p>{artwork.description}</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {artwork.tags?.map((tag, index) => (
                <span key={index} className="badge bg-secondary">
                  {tag}
                </span>
              ))}
            </div>
            <a href={artwork.file_path} className="btn btn-primary" download>
              Download Artwork
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ArtworkPage
