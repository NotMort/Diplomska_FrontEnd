import { ArtworkType } from 'models/artwork'
import Card from './Card'
import { FC } from 'react'

const List: FC<{
  artworks: ArtworkType[]
  onCardClick: (artwork: ArtworkType) => void
}> = ({ artworks, onCardClick }) => {
  if (!Array.isArray(artworks)) {
    console.error('artworks is not an array:', artworks)
    return null
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-start align-items-start gap-3">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="artwork-item">
            <Card artwork={artwork} onClick={() => onCardClick(artwork)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
