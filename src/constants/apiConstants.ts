export enum apiRoutes {
  // Auth endpoints
  REGISTER = '/auth/register',
  LOGIN = '/auth/login',
  SIGNOUT = '/auth/signout',
  FETCH_AUTH_USER = '/auth',

  // Users endpoints
  FETCH_USERS = '/users',
  FETCH_USER_BY_ID = '/users/:id',
  CREATE_USER = '/users',
  UPDATE_USER = '/users/:id',
  DELETE_USER = '/users/:id',
  UPLOAD_USER_AVATAR = '/users/upload/:id',
  FETCH_USER_BY_EMAIL = '/users/email/:email',

  // Licenses endpoints
  FETCH_LICENSES = '/licenses',
  FETCH_LICENSE_BY_ID = '/licenses/:id',
  CREATE_LICENSE = '/licenses',
  UPDATE_LICENSE = '/licenses/:id',
  DELETE_LICENSE = '/licenses/:id',
  FETCH_LICENSE_BY_TYPE = '/licenses/type/:license_type',

  // Favorites endpoints
  FETCH_FAVORITES = '/favorites',
  FETCH_FAVORITE_BY_ID = '/favorites/:id',
  CREATE_FAVORITE = '/favorites',
  DELETE_FAVORITE = '/favorites/:id',

  // Downloads endpoints
  FETCH_DOWNLOADS = '/downloads',
  FETCH_DOWNLOAD_BY_ID = '/downloads/:id',
  CREATE_DOWNLOAD = '/downloads',
  DELETE_DOWNLOAD = '/downloads/:id',

  // Artworks endpoints
  FETCH_ARTWORKS = '/artworks',
  FETCH_ARTWORK_BY_ID = '/artworks/:id',
  CREATE_ARTWORK = '/artworks',
  UPDATE_ARTWORK = '/artworks/:id',
  DELETE_ARTWORK = '/artworks/:id',
  FETCH_ARTWORK_BY_CATEGORY = '/artworks/category/:category',
  FETCH_ARTWORK_BY_TAG = '/artworks/tag/:tag',
}
