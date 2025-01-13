import { useForm } from 'react-hook-form'
import { CreateUpdateArtworkFields } from 'models/artwork'

export const useCreateUpdateArtwork = () => {
  return useForm<CreateUpdateArtworkFields>()
}
