import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders
  } & AxiosRequestConfig,
) {
  try {
    const response = await Axios.request<R>({
      baseURL: process.env.REACT_APP_API_URL,
      url: path,
      method: method,
      data: input,
      headers: options?.headers,
      withCredentials: true,
    })
    return response
  } catch (error: any) {
    if (error.response?.status === 401) {
      handleAutoLogout()
    }
    return error.response
  }
}
function handleAutoLogout() {
  document.cookie = 'access_token=; Max-Age=0; path=/'
  localStorage.removeItem('user')
  window.location.href = '/login'
}
export * from 'api/User'
export * from 'api/Artwork'
export * from 'api/Comment'
export * from 'api/Favorite'
export * from 'api/Download'
