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
      <div className="row">
        {artworks.map((artwork) => (
          <div className="col-md-4" key={artwork.id}>
            <Card artwork={artwork} onClick={() => onCardClick(artwork)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
