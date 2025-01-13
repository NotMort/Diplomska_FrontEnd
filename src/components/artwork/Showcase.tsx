import { ArtworkType } from 'models/artwork'
import { FC } from 'react'

export const Showcase: FC<{ artwork: ArtworkType }> = ({ artwork }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={artwork.image_path}
            className="img-fluid"
            alt={artwork.title}
          />
        </div>
        <div className="col-md-6">
          <h1>{artwork.title}</h1>
          <p>{artwork.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Showcase
