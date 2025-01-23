import { UserType } from './auth'

export interface DownloadType {
  id: string
  user: UserType
  artwork_id: string
  createdAt: string
  updatedAt: string
}

export interface CreateDownloadFields {
  user_id: string
  artwork_id: string
}
