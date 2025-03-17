import { FC, useEffect, useState } from 'react'
import { ArtworkType } from 'models/artwork'
import * as API from 'api/Api'
import authStore from 'stores/auth.store'

interface ArtworkDetailsProps {
  artwork: ArtworkType
}

const ArtworkDetails: FC<ArtworkDetailsProps> = ({ artwork }) => {
  const [downloadCount, setDownloadCount] = useState<number>(0)
  const fallbackImage = '/images/fallback.jpg'
  const fetchDownloadCount = async () => {
    try {
      const response = await API.fetchDownloadCount(artwork.id)
      if (response?.data) {
        setDownloadCount(response.data.count)
      }
    } catch (err) {
      console.error('Error fetching download count:', err)
    }
  }

  useEffect(() => {
    fetchDownloadCount()
  }, [artwork.id])

  const handleDownload = async () => {
    if (!authStore.user) {
      alert('You must be logged in to download this artwork.')
      return
    }

    try {
      await API.createDownload({
        user_id: authStore.user.id,
        artwork_id: artwork.id,
      })
      setDownloadCount((prevCount) => prevCount + 1)
      console.log('Download recorded successfully.')
    } catch (err) {
      console.error('Error recording download:', err)
      alert('Failed to record download. Please try again.')
    }
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <img
          src={`http://localhost:8080/${artwork.image_path}`}
          alt={artwork.title}
          className="img-fluid rounded shadow"
          onError={(e) => (e.currentTarget.src = fallbackImage)}
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
        <p>
          <strong>Downloads:</strong> {downloadCount}
        </p>
        <p>
          <strong>License:</strong>{' '}
          {artwork.license
            ? artwork.license.license_type
            : 'No License Available'}
        </p>
        {artwork.license && (
          <div className="mb-3">
            <p>
              <strong>Description:</strong> {artwork.license.description}
            </p>
            <ul>
              <li>
                <strong>Commercial Use:</strong>{' '}
                {artwork.license.commercial_use ? 'Allowed' : 'Not Allowed'}
              </li>
              <li>
                <strong>Modification Allowed:</strong>{' '}
                {artwork.license.modification_allowed ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>Attribution Required:</strong>{' '}
                {artwork.license.attribution_required ? 'Yes' : 'No'}
              </li>
            </ul>
          </div>
        )}
        <a
          href={authStore.user ? artwork.file_path : undefined}
          className={`btn btn-primary ${!authStore.user ? 'disabled' : ''}`}
          download={authStore.user ? true : undefined}
          onClick={authStore.user ? handleDownload : undefined}
          role="button"
          aria-disabled={!authStore.user}
        >
          {authStore.user ? 'Download Artwork' : 'Login to Download'}
        </a>
      </div>
    </div>
  )
}

export default ArtworkDetails
