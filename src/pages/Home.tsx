import * as API from 'api/Api'
import List from 'components/artwork/List'
import Layout from 'components/ui/Layout'
import { ArtworkType } from 'models/artwork'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const [artworks, setArtworks] = useState<ArtworkType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const response = await API.fetchArtworks()
        setArtworks(response.data)
      } catch (err) {
        console.error('Error fetching artworks:', err)
        setError('Failed to load artworks. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    loadArtworks()
  }, [])

  const handleCardClick = (artwork: ArtworkType) => {
    navigate(`/artwork/${artwork.id}`)
  }

  return (
    <Layout>
      <h1>Artworks</h1>
      {loading && <p>Loading artworks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <List artworks={artworks} onCardClick={handleCardClick} />
      )}
    </Layout>
  )
}

export default Home
