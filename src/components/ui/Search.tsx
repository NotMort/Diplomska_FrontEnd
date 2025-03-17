import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArtworkType } from 'models/artwork'
import Select, { MultiValue } from 'react-select'

const tagOptions = [
  { value: 'nature', label: 'Nature' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'still-life', label: 'Still Life' },
]

const licenseOptions = [
  { value: 'CC BY', label: 'CC BY' },
  { value: 'CC BY-SA', label: 'CC BY-SA' },
  { value: 'CC BY-NC', label: 'CC BY-NC' },
  { value: 'CC BY-ND', label: 'CC BY-ND' },
  { value: 'GPL', label: 'GPL' },
  { value: 'Copyright', label: 'Copyright' },
  { value: 'Public Domain', label: 'Public Domain' },
]

interface SearchArtworkProps {
  artworks: ArtworkType[]
  setFilteredArtworks: (artworks: ArtworkType[]) => void
  setTitle: (title: string) => void
  setLicense: (license: string) => void
}

export default function SearchArtwork({
  artworks,
  setFilteredArtworks,
  setTitle,
  setLicense,
}: SearchArtworkProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState<
    { value: string; label: string }[]
  >([])
  const [selectedLicense, setSelectedLicense] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let filtered = artworks

    if (selectedCategory) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.category.toLowerCase() === selectedCategory.toLowerCase(),
      )
      setTitle(`${selectedCategory}`)
    } else {
      setTitle('Artworks')
    }

    if (selectedTags.length > 0) {
      const selectedTagValues = selectedTags.map((tag) => tag.value)
      filtered = filtered.filter(
        (artwork) =>
          artwork.tags?.length &&
          selectedTagValues.every((tag) => artwork.tags?.includes(tag)),
      )
    }

    if (searchTerm) {
      filtered = filtered.filter((artwork) =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedLicense) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.license?.license_type.toLowerCase() ===
          selectedLicense.toLowerCase(),
      )
    }

    setFilteredArtworks(filtered)
  }, [
    searchTerm,
    selectedCategory,
    selectedTags,
    selectedLicense,
    artworks,
    setFilteredArtworks,
    setTitle,
  ])

  return (
    <div className="p-4">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        <select
          className="w-full p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="2D">2D</option>
          <option value="3D">3D</option>
          <option value="photo">Photo</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>

        <Select
          isMulti
          options={tagOptions}
          value={selectedTags}
          onChange={(selected: MultiValue<{ value: string; label: string }>) =>
            setSelectedTags(selected as { value: string; label: string }[])
          }
          className="mt-2"
        />

        <select
          className="w-full p-2 border rounded mt-2"
          value={selectedLicense}
          onChange={(e) => {
            const license = e.target.value
            setSelectedLicense(license)
            setLicense(license)
          }}
        >
          <option value="">All Licenses</option>
          {licenseOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
