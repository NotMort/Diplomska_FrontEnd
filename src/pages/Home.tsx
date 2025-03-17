import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'components/artwork/Card'
import { ArtworkType } from 'models/artwork'
import * as API from 'api/Api'
import Layout from 'components/ui/Layout'
import SearchArtwork from 'components/ui/Search'

const Home = () => {
  const [artworks, setArtworks] = useState<ArtworkType[]>([])
  const [filteredArtworks, setFilteredArtworks] = useState<ArtworkType[]>([])
  const [title, setTitle] = useState('Artworks')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [license, setLicense] = useState<string>('')

  const navigate = useNavigate()

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const response = await API.fetchArtworks()
        setArtworks(response.data)
        setFilteredArtworks(response.data)
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

  useEffect(() => {
    if (license) {
      setFilteredArtworks(
        artworks.filter((art) => art.license?.license_type === license),
      )
    } else {
      setFilteredArtworks(artworks)
    }
  }, [license, artworks])

  return (
    <Layout>
      <SearchArtwork
        artworks={artworks}
        setFilteredArtworks={setFilteredArtworks}
        setTitle={setTitle}
        setLicense={setLicense}
      />
      <h1>{title}</h1>
      {loading && <p>Loading artworks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArtworks.map((artwork) => (
            <Card
              key={artwork.id}
              artwork={artwork}
              onClick={() => handleCardClick(artwork)}
            />
          ))}
        </div>
      )}
    </Layout>
  )
}
export default Home
