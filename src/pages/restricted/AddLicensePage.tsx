import React, { useEffect, useState } from 'react'
import { Button, Form, FormLabel, Alert } from 'react-bootstrap'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom'
import * as API from 'api/Api'
import { CreateLicenseFields, LicenseType } from 'models/License'
import { CreateUpdateArtworkFields } from 'models/artwork'

const licenseOptions = [
  {
    value: 'CC BY',
    label: 'CC BY',
    commercial_use: true,
    modification_allowed: true,
    attribution_required: true,
  },
  {
    value: 'CC BY-SA',
    label: 'CC BY-SA',
    commercial_use: true,
    modification_allowed: true,
    attribution_required: true,
  },
  {
    value: 'CC BY-NC',
    label: 'CC BY-NC',
    commercial_use: false,
    modification_allowed: true,
    attribution_required: true,
  },
  {
    value: 'CC BY-ND',
    label: 'CC BY-ND',
    commercial_use: true,
    modification_allowed: false,
    attribution_required: true,
  },
  {
    value: 'GPL',
    label: 'GPL',
    commercial_use: true,
    modification_allowed: true,
    attribution_required: true,
  },
  {
    value: 'Copyright',
    label: 'Copyright',
    commercial_use: false,
    modification_allowed: false,
    attribution_required: true,
  },
  {
    value: 'Public Domain',
    label: 'Public Domain',
    commercial_use: true,
    modification_allowed: true,
    attribution_required: false,
  },
]

const AddLicensePage: React.FC = () => {
  const { artworkId } = useParams<{ artworkId?: string }>()
  const navigate = useNavigate()
  const [artwork, setArtwork] = useState<any>(null)
  const [licenseData, setLicenseData] = useState<CreateLicenseFields>({
    license_type: 'CC BY',
    description: '',
    commercial_use: true,
    modification_allowed: true,
    attribution_required: true,
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!artworkId) {
      setError('Invalid artwork ID.')
      return
    }
    API.fetchLicenseById(artworkId)
      .then((response) => {
        if (response?.data) {
          setArtwork(response.data)
        } else {
          setError('Artwork not found.')
        }
      })
      .catch(() => setError('Error fetching artwork.'))
  }, [artworkId])

  const handleLicenseSelection = (
    selected: { value: LicenseType; label: string } | null,
  ) => {
    if (selected) {
      const selectedLicense = licenseOptions.find(
        (license) => license.value === selected.value,
      )
      if (selectedLicense) {
        setLicenseData({
          license_type: selectedLicense.value as LicenseType,
          description: licenseData.description,
          commercial_use: selectedLicense.commercial_use,
          modification_allowed: selectedLicense.modification_allowed,
          attribution_required: selectedLicense.attribution_required,
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!artworkId) {
      setError('Invalid artwork ID.')
      return
    }
    try {
      const response = await API.addLicense(licenseData)
      if (response?.data && response.data.id) {
        const licenseId = response.data.id
        console.log('License created with ID:', licenseId)
        await API.updateArtworkLicense(artworkId, licenseId)
        setSuccess('License created and linked successfully!')
        setTimeout(() => navigate('/'), 2000)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error creating license.')
    }
  }

  return (
    <div className="container mt-4">
      <h2>Create a License for Your Artwork</h2>
      {artwork && <h5>Artwork: {artwork.title}</h5>}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FormLabel htmlFor="license_type">License Type</FormLabel>
          <Select options={licenseOptions} onChange={handleLicenseSelection} />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormLabel htmlFor="description">Description</FormLabel>
          <textarea
            className="form-control"
            value={licenseData.description}
            onChange={(e) =>
              setLicenseData({ ...licenseData, description: e.target.value })
            }
            required
          />
        </Form.Group>
        <Button type="submit" className="btn btn-primary">
          Create License
        </Button>
      </Form>
    </div>
  )
}

export default AddLicensePage
