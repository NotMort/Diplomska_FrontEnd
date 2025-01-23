import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { CommentType, CreateCommentFields } from 'models/comment'

export const fetchCommentsByArtworkId = async (artworkId: string) =>
  apiRequest<undefined, { user: string; text: string }[]>(
    'get',
    `/comments/artwork/${artworkId}`,
  )

export const addComment = async (data: CreateCommentFields) =>
  apiRequest<CreateCommentFields, CommentType>(
    'post',
    apiRoutes.CREATE_COMMENT,
    data,
  )
