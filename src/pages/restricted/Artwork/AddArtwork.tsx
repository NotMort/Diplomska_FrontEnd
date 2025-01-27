import { useState } from 'react'
import Layout from 'components/ui/Layout'

import { useNavigate } from 'react-router-dom'

import { apiRequest } from 'api/Api'
import AddArtworkForm from 'components/artwork/addArworkForm'

const AddArtwork = () => {
  return (
    <Layout>
      <AddArtworkForm></AddArtworkForm>
    </Layout>
  )
}

export default AddArtwork
