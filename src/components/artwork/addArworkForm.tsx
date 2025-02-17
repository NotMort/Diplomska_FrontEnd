import React, { FC, useState } from 'react'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { Controller } from 'react-hook-form'

import Select from 'react-select'
import { CreateUpdateArtworkFields } from 'models/artwork'
import * as API from 'api/Artwork'
import authStore from 'stores/auth.store'
import { useNavigate } from 'react-router-dom'
import { useCreateArtworkForm } from 'hooks/react-hook-form/useCreateUpdateArtwork'

const tagOptions = [
  { value: 'nature', label: 'Nature' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'still-life', label: 'Still Life' },
]

const AddArtworkForm: FC = () => {
  const { handleSubmit, control, reset, errors } = useCreateArtworkForm()
  const [error, setError] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<
    { value: string; label: string }[]
  >([])
  const [file, setFile] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data: CreateUpdateArtworkFields) => {
    if (!authStore.user) {
      setError('You must be logged in to submit artwork.')
      return
    }

    try {
      if (!image || !file) {
        setError('You must upload an image and a file.')
        return
      }
      const payload: CreateUpdateArtworkFields = {
        ...data,
        user_id: authStore.user.id,
        tags: selectedTags.map((tag) => tag.value),
      }

      const response = await API.addArtwork(payload)
      if (!response?.data?.id) {
        throw new Error('Failed to create artwork')
      }

      const artworkId = response.data.id

      if (thumbnail) await API.uploadArtworkThumbnail(artworkId, thumbnail)
      if (image) await API.uploadArtworkImage(artworkId, image)
      if (file) await API.uploadArtworkFile(artworkId, file)

      reset()
      setSelectedTags([])
      navigate(`/artworks/${artworkId}`)
    } catch (err) {
      console.error('Error adding artwork:', err)
      setError('Failed to add artwork. Please try again.')
    }
  })

  return (
    <Form onSubmit={onSubmit} className="mt-4">
      <Form.Group className="mb-3">
        <FormLabel htmlFor="title">Title</FormLabel>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="title"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            />
          )}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="description"
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
            />
          )}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <FormLabel htmlFor="file_path">Upload File</FormLabel>
        <input
          type="file"
          id="file_path"
          className="form-control"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <FormLabel htmlFor="image_path">Upload Image</FormLabel>
        <input
          type="file"
          id="image_path"
          className="form-control"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <FormLabel htmlFor="thumbnail_path">
          Upload Thumbnail (Optional)
        </FormLabel>
        <input
          type="file"
          id="thumbnail_path"
          className="form-control"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <FormLabel htmlFor="category">Category</FormLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select {...field} id="category" className="form-select">
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="photo">Photo</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          )}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <FormLabel htmlFor="tags">Tags</FormLabel>
        <Select
          isMulti
          options={tagOptions}
          value={selectedTags}
          onChange={(
            selected: readonly { value: string; label: string }[] | null,
          ) => setSelectedTags(selected ? [...selected] : [])}
        />
      </Form.Group>

      {error && <p className="text-danger mt-2">{error}</p>}

      <Button type="submit" className="btn btn-primary">
        Submit Artwork
      </Button>
    </Form>
  )
}

export default AddArtworkForm
