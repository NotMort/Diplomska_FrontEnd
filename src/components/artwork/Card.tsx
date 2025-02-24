import { ArtworkType } from 'models/artwork'
import { FC } from 'react'

const Card: FC<{ artwork: ArtworkType; onClick: () => void }> = ({
  artwork,
  onClick,
}) => {
  const fallbackImage = '/images/fallback.jpg'

  return (
    <div className="card shadow-sm artwork-card" onClick={onClick}>
      <img
        src={
          `http://localhost:8080/${artwork.thumbnail_path}` ||
          `http://localhost:8080/${artwork.image_path}` ||
          fallbackImage
        }
        className="card-img-top"
        alt={artwork.title}
        onError={(e) => (e.currentTarget.src = fallbackImage)}
      />
      <div className="card-body p-2">
        <h6 className="card-title text-center">{artwork.title}</h6>
      </div>
    </div>
  )
}

export default Card
