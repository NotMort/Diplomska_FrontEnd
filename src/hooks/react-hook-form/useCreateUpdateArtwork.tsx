import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateUpdateArtworkFields } from 'models/artwork'

export const useCreateArtworkForm = () => {
  const ArtworkSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    description: Yup.string().required('Description is required.'),
    file_path: Yup.mixed().required('File path is required.'),
    image_path: Yup.mixed().required('Image path is required.'),
    thumbnail_path: Yup.mixed(),
    category: Yup.string().required('Category is required.'),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateUpdateArtworkFields>({
    defaultValues: {
      title: '',
      description: '',
      file_path: '',
      image_path: '',
      thumbnail_path: '',
      category: '2D',
      tags: [],
      user_id: '',
    },
    resolver: yupResolver(ArtworkSchema),
  })

  return { handleSubmit, control, reset, errors }
}
