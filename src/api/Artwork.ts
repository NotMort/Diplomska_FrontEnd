import { ArtworkType, CreateUpdateArtworkFields } from 'models/artwork'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'

export const fetchArtworks = async () =>
  apiRequest<undefined, ArtworkType[]>('get', apiRoutes.FETCH_ARTWORKS)

export const fetchArtworkById = async (artworkId: string) =>
  apiRequest<undefined, ArtworkType>(
    'get',
    apiRoutes.FETCH_ARTWORK_BY_ID + `${artworkId}`,
  )
export const fetchUserArtworks = async () =>
  apiRequest<undefined, ArtworkType[]>('get', '/auth/artworks')
export const addArtwork = async (data: CreateUpdateArtworkFields) =>
  apiRequest<CreateUpdateArtworkFields, void>('post', '/artworks', data)
export const updateArtwork = async (
  artworkId: string,
  data: CreateUpdateArtworkFields,
) =>
  apiRequest<CreateUpdateArtworkFields, void>(
    'patch',
    `/artworks/${artworkId}`,
    data,
  )
