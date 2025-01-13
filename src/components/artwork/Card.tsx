import { ArtworkType } from 'models/artwork'
import { FC } from 'react'

const Card: FC<{ artwork: ArtworkType; onClick: () => void }> = ({
  artwork,
  onClick,
}) => {
  return (
    <div
      className="card h-100 shadow-sm"
      style={{ width: '100%' }}
      onClick={onClick}
    >
      <img
        src={artwork.thumbnail_path || artwork.image_path}
        className="card-img-top"
        alt={artwork.title}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{artwork.title}</h5>
      </div>
    </div>
  )
}

export default Card
