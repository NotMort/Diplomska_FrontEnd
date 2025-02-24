import { ArtworkType, CreateUpdateArtworkFields } from 'models/artwork'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'

export const fetchArtworks = async () =>
  apiRequest<undefined, ArtworkType[]>('get', apiRoutes.FETCH_ARTWORKS)

export const fetchArtworkById = async (artworkId: string) =>
  apiRequest<undefined, ArtworkType>(
    'get',
    `${apiRoutes.FETCH_ARTWORK_BY_ID}${artworkId}`,
  )

export const fetchUserArtworks = async () =>
  apiRequest<undefined, ArtworkType[]>('get', '/auth/artworks')

export const addArtwork = async (data: CreateUpdateArtworkFields) =>
  apiRequest<CreateUpdateArtworkFields, ArtworkType>('post', '/artworks', data)

export const updateArtwork = async (
  artworkId: string,
  data: CreateUpdateArtworkFields,
) =>
  apiRequest<CreateUpdateArtworkFields, void>(
    'patch',
    `/artworks/${artworkId}`,
    data,
  )

export const uploadArtworkThumbnail = async (artworkId: string, file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return apiRequest<FormData, void>(
    'patch',
    `/artworks/upload/thumbnail/${artworkId}`,
    formData,
  )
}

export const uploadArtworkImage = async (artworkId: string, file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return apiRequest<FormData, void>(
    'patch',
    `/artworks/upload/image/${artworkId}`,
    formData,
  )
}

export const uploadArtworkFile = async (artworkId: string, file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return apiRequest<FormData, void>(
    'patch',
    `/artworks/upload/file/${artworkId}`,
    formData,
  )
}
export const deleteArtwork = async (artworkId: string) =>
  apiRequest<undefined, void>('delete', `/artworks/${artworkId}`)
