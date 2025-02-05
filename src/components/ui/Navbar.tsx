import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import authStore from 'stores/auth.store'
import { StatusCode } from 'constants/errorConstants'
import * as API from 'api/Api'
import { routes } from 'constants/routesConstants'

const Navbar = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

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

            {/* Mobile Toggle Button */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Links (Desktop) */}
            <div className="collapse navbar-collapse justify-content-end d-none d-lg-flex">
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
                        Add Art
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <Button className="btn mx-2" onClick={signout}>
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
              </ul>
            </div>

            {/* Mobile Dropdown (when toggled) */}
            {isDropdownOpen && (
              <div className="w-100 bg-white shadow p-3 d-lg-none">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-dark"
                      to={routes.HOME}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-dark"
                      to={routes.INFO}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Info
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-dark"
                      to={routes.ABOUT}
                      onClick={() => setDropdownOpen(false)}
                    >
                      About
                    </NavLink>
                  </li>
                  {authStore.user ? (
                    <>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link text-dark"
                          to={routes.PROFILE}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link text-dark"
                          to={routes.ADD_ARTWORK}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Add Art
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <button
                          className="btn btn-link text-dark nav-link"
                          onClick={signout}
                        >
                          Signout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link text-dark"
                          to={routes.LOGIN}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Login
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link text-dark"
                          to={routes.SIGNUP}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Signup
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
                <hr />
                <select
                  id="language-selector"
                  className="form-select form-select-sm bg-light border-0 rounded-pill"
                >
                  <option value="en">English</option>
                  <option value="sl">Slovenian</option>
                </select>
              </div>
            )}
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
