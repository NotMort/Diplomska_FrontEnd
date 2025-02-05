export interface ArtworkType {
  id: string
  title: string
  description: string
  file_path: string
  image_path: string
  thumbnail_path?: string
  category: '2D' | '3D' | 'photo' | 'audio' | 'video'
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateUpdateArtworkFields {
  title: string
  description: string
  file_path: string
  image_path: string
  thumbnail_path?: string
  category: '2D' | '3D' | 'photo' | 'audio' | 'video'
  tags?: string[]
  user_id: string
  license_id?: string
}
