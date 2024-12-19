import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
export interface LoginUserFields {
  email: string
  password: string
}
export const useLoginForm = () => {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required('Plase enter a valid email'),
    password: Yup.string(),
  })
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
  })
  return {
    handleSubmit,
    errors,
    reset,
    control,
  }
}
export type LoginForm = ReturnType<typeof useLoginForm>
