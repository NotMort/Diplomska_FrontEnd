import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'

import { ArtworkType } from 'models/artwork'
import { CreateLicenseFields, License } from 'models/License'

export const fetchLicenses = async () =>
  apiRequest<undefined, License[]>('get', apiRoutes.FETCH_LICENSES)

export const fetchLicenseById = async (licenseId: string) =>
  apiRequest<undefined, License>(
    'get',
    apiRoutes.FETCH_LICENSE_BY_ID + `${licenseId}`,
  )

export const addLicense = async (data: CreateLicenseFields) =>
  apiRequest<CreateLicenseFields, License>('post', apiRoutes.ADD_LICENSE, data)

export const updateLicense = async (licenseId: string, data: License) =>
  apiRequest<License, void>(
    'patch',
    apiRoutes.UPDATE_LICENSE + `${licenseId}`,
    data,
  )

export const deleteLicense = async (licenseId: string) =>
  apiRequest<undefined, void>(
    'delete',
    apiRoutes.DELETE_LICENSE + `${licenseId}`,
  )

export const fetchArtworksByLicense = async (licenseId: string) =>
  apiRequest<undefined, ArtworkType[]>('get', `/licenses/${licenseId}/artworks`)
export const updateArtworkLicense = async (
  artworkId: string,
  licenseId: string,
) =>
  apiRequest<{ license_id: string }, void>(
    'patch',
    `/artworks/${artworkId}/license`,
    { license_id: licenseId },
  )
