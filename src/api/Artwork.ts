import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { UserType } from 'models/auth'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'

export async function getFeaturedArtwork() {
  return apiRequest('get', '/artworks/featured')
}
export async function getArtworkById(id: string) {
  return apiRequest('get', `/artworks/${id}`)
}
