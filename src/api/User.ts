import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { UserType } from 'models/auth'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'

export const fetchUser = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USERS)
export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)
export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)
export const register = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, UserType>('post', apiRoutes.REGISTER, data)
export const uploadAvatar = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_USER_AVATAR}/${id}`,
    formData,
  )
export const fetchAuthUser = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_AUTH_USER)
