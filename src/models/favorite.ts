import { UserType } from './auth'

export interface FavoriteType {
  id: string
  user: UserType
  artwork_id: string
  createdAt: string
  updatedAt: string
}

export interface CreateFavoriteFields {
  user_id: string
  artwork_id: string
}
