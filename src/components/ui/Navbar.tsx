import Toast from 'react-bootstrap/Toast'
import { routes } from 'constants/routesConstants'
import { FC, useState } from 'react'
import Button from 'react-bootstrap/Button'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { NavLink, useNavigate } from 'react-router-dom'

import authStore from 'stores/auth.store'
import { StatusCode } from 'constants/errorConstants'
import * as API from 'api/Api'

const Navbar: FC = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const signout = async () => {
    const response = await API.signout()
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.signout()
      navigate(routes.HOME)
    }
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container-xxl p-3">
            <NavLink
              className="navbar-brand text-primary fw-bold"
              to={routes.HOME}
            >
              ArtisticWorks
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link text-dark mx-2" to={routes.HOME}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark mx-2" to={routes.INFO}>
                    Info
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-dark mx-2"
                    to={routes.ABOUT}
                  >
                    About
                  </NavLink>
                </li>
                {authStore.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link text-dark mx-2"
                        to={routes.PROFILE}
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link text-dark mx-2"
                        to={routes.ADD_ARTWORK}
                      >
                        art+
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <Button className="btn  mx-2" onClick={signout}>
                        Signout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link text-dark mx-2"
                        to={routes.LOGIN}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link text-dark mx-2"
                        to={routes.SIGNUP}
                      >
                        Signup
                      </NavLink>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <select
                    id="language-selector"
                    className="form-select form-select-sm bg-light border-0 rounded-pill mx-2"
                  >
                    <option value="en">English</option>
                    <option value="sl">Slovenian</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast
            onClose={() => setShowError(false)}
            show={showError}
            delay={5000}
            autohide
            animation
          >
            <Toast.Header className="bg-danger text-white">
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default Navbar
