import React, { FC, useEffect, useState } from 'react'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom'
import * as API from 'api/Api'
import { CreateUpdateArtworkFields, ArtworkType } from 'models/artwork'

const tagOptions = [
  { value: 'nature', label: 'Nature' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'still-life', label: 'Still Life' },
]

const UpdateArtworkForm: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedTags, setSelectedTags] = useState<
    { value: string; label: string }[]
  >([])
  const [error, setError] = useState<string | null>(null)
  const [artwork, setArtwork] = useState<ArtworkType | null>(null)
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateUpdateArtworkFields>()

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        if (!id) {
          setError('Artwork ID is missing.')
          return
        }
        const response = await API.fetchArtworkById(id)
        setArtwork(response.data)
        setSelectedTags(
          response.data.tags.map((tag: string) => ({ value: tag, label: tag })),
        )
        reset(response.data)
      } catch (err: any) {
        console.error('Error fetching artwork:', err)
        setError('Failed to load artwork. Please try again.')
      }
    }
    fetchArtwork()
  }, [id, reset])

  const onSubmit = handleSubmit(async (data: CreateUpdateArtworkFields) => {
    try {
      if (!id) {
        setError('Artwork ID is missing.')
        return
      }
      const payload = {
        ...data,
        tags: selectedTags.map((tag) => tag.value),
      }
      await API.updateArtwork(id, payload)
      navigate(`/artworks/${id}`)
    } catch (err: any) {
      console.error('Error updating artwork:', err)
      setError('Failed to update artwork. Please try again.')
    }
  })

  if (!artwork) {
    return <p>Loading artwork...</p>
  }

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
        <FormLabel htmlFor="file_path">File Path</FormLabel>
        <Controller
          name="file_path"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              {...field}
              id="file_path"
              className={`form-control ${errors.file_path ? 'is-invalid' : ''}`}
            />
          )}
        />
        {errors.file_path && (
          <div className="invalid-feedback">{errors.file_path.message}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <FormLabel htmlFor="image_path">Image Path</FormLabel>
        <Controller
          name="image_path"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              {...field}
              id="image_path"
              className={`form-control ${
                errors.image_path ? 'is-invalid' : ''
              }`}
            />
          )}
        />
        {errors.image_path && (
          <div className="invalid-feedback">{errors.image_path.message}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <FormLabel htmlFor="thumbnail_path">
          Thumbnail Path (Optional)
        </FormLabel>
        <Controller
          name="thumbnail_path"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              {...field}
              id="thumbnail_path"
              className="form-control"
            />
          )}
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
          onChange={(selected: { value: string; label: string }[] | null) =>
            setSelectedTags(selected ?? [])
          }
        />
      </Form.Group>

      {error && <p className="text-danger mt-2">{error}</p>}

      <Button type="submit" className="btn btn-primary">
        Update Artwork
      </Button>
    </Form>
  )
}

export default UpdateArtworkForm
