import { getFeaturedArtwork } from 'api/Artwork'
import Layout from 'components/ui/Layout'
import { Artwork } from 'models/artwork'
import { FC, useEffect, useState } from 'react'

const Home: FC = () => {
  const [featuredArtwork, setFeaturedArtwork] = useState<Artwork | null>(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const featuredResponse = await getFeaturedArtwork()
        setFeaturedArtwork(featuredResponse.data)
      } catch (error) {
        console.error('Error fetching artworks:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Layout>
      <p>Hi</p>
    </Layout>
  )
}

export default Home
