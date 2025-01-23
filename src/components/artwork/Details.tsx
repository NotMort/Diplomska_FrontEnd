import { FC } from 'react'
import { ArtworkType } from 'models/artwork'

interface ArtworkDetailsProps {
  artwork: ArtworkType
}

const ArtworkDetails: FC<ArtworkDetailsProps> = ({ artwork }) => {
  return (
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
  )
}

export default ArtworkDetails
