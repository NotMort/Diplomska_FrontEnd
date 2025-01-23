import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateCommentFields } from 'models/comment'

export const useCommentForm = () => {
  const CommentSchema = Yup.object().shape({
    comment_text: Yup.string()
      .min(2, 'Comment must be at least 2 characters long.')
      .required('Comment is required.'),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateCommentFields>({
    defaultValues: { comment_text: '', user_id: '', artwork_id: '' },
    resolver: yupResolver(CommentSchema),
  })

  return { handleSubmit, control, reset, errors }
}
