import { ArtworkType } from 'models/artwork'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'

export const fetchArtworks = async () =>
  apiRequest<undefined, ArtworkType[]>('get', apiRoutes.FETCH_ARTWORKS)

export const fetchArtworkById = async (artworkId: string) =>
  apiRequest<undefined, ArtworkType>(
    'get',
    apiRoutes.FETCH_ARTWORK_BY_ID + `${artworkId}`,
  )
