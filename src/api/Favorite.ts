import { apiRequest } from './Api'

export const fetchUserFavorites = async () =>
  apiRequest<undefined, { artwork_id: string }[]>('get', '/auth/favorites')

export const addFavorite = async (data: {
  user_id: string
  artwork_id: string
}) =>
  apiRequest<{ user_id: string; artwork_id: string }, void>(
    'post',
    '/favorites',
    data,
  )

export const removeFavorite = async (userId: string, artworkId: string) =>
  apiRequest<undefined, void>(
    'delete',
    `/favorites/delete-by-user-artwork?user_id=${userId}&artwork_id=${artworkId}`,
  )

export const checkIfFavorited = async (userId: string, artworkId: string) =>
  apiRequest<undefined, { isFavorited: boolean }>(
    'get',
    `/favorites/check/user?user_id=${userId}&artwork_id=${artworkId}`,
  )
