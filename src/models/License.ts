export type LicenseType =
  | 'CC BY'
  | 'CC BY-SA'
  | 'CC BY-NC'
  | 'CC BY-ND'
  | 'GPL'
  | 'Copyright'
  | 'Public Domain'

export interface License {
  id: string
  license_type: LicenseType
  description: string
  commercial_use: boolean
  modification_allowed: boolean
  attribution_required: boolean
  created_at: string
  updated_at: string
}

export interface CreateLicenseFields {
  license_type: LicenseType
  description: string
  commercial_use: boolean
  modification_allowed: boolean
  attribution_required: boolean
}
