import { apiRequest } from './Api'

export const createDownload = async (data: {
  user_id: string
  artwork_id: string
}) =>
  apiRequest<{ user_id: string; artwork_id: string }, void>(
    'post',
    '/downloads',
    data,
  )

export const fetchDownloadCount = async (artworkId: string) =>
  apiRequest<undefined, { count: number }>(
    'get',
    `/downloads/count/${artworkId}`,
  )
