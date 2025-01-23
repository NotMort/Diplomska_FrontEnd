import { UserType } from './auth'

export interface CommentType {
  id: string
  comment_text: string
  user: UserType
  artwork_id: string
  createdAt: string
  updatedAt: string
}

export interface CreateCommentFields {
  comment_text: string
  user_id: string
  artwork_id: string
}
