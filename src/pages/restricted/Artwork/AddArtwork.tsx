import React, { useState } from 'react'
import Layout from 'components/ui/Layout'

import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { apiRequest } from 'api/Api'

const AddArtwork = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_path: '',
    image_path: '',
    thumbnail_path: '',
    category: '2D',
    tags: '', // Tags as a comma-separated string
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: { target: { name: any; files: any } }) => {
    const { name, files } = e.target
    if (files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0].name,
      })
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const {
        title,
        description,
        file_path,
        image_path,
        thumbnail_path,
        category,
        tags,
      } = formData
      const payload = {
        title,
        description,
        file_path,
        image_path,
        thumbnail_path: thumbnail_path || undefined,
        category,
        tags: tags.split(',').map((tag) => tag.trim()), // Convert comma-separated string to array
      }

      await apiRequest('post', '/artworks', payload)
      navigate('/artworks') // Redirect to the artworks list page
    } catch (error) {
      setError('Failed to add artwork. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className="mb-4">Add Artwork</h1>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="file_path" className="form-label">
              File Path
            </label>
            <input
              type="file"
              id="file_path"
              name="file_path"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image_path" className="form-label">
              Image Path
            </label>
            <input
              type="file"
              id="image_path"
              name="image_path"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="thumbnail_path" className="form-label">
              Thumbnail Path (Optional)
            </label>
            <input
              type="file"
              id="thumbnail_path"
              name="thumbnail_path"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="photo">Photo</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tags (Comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="form-control"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default AddArtwork
