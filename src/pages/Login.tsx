import DeshboardLayout from 'components/ui/DashboardLayout'
import Layout from 'components/ui/Layout'
import { LoginForm } from 'components/user/loginForm'
import React, { FC } from 'react'

const Login: FC = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  )
}

export default Login
