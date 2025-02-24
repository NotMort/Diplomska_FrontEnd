import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Footer: FC = () => {
  return (
    <footer className="bg-dark text-light py-4 ">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-primary">About Us</h5>
            <p>
              This platform is dedicated to connecting artists and developers by
              providing access to artistic works with clear copyright
              information. Our mission is to inspire creativity and
              collaboration while respecting intellectual property rights.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="text-primary">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink className="text-light" to="/">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink className="text-light" to="/info">
                  Copyright Information
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="text-primary">Contact</h5>
            <p>
              Email:{' '}
              <a href="mailto:support@artisticworks.com" className="text-light">
                support@artisticworks.com
              </a>
            </p>
            <p>Phone: +1 (800) 123-4567</p>
            <p>
              Follow us:
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light ms-2"
              >
                Facebook
              </a>
              |
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light ms-2"
              >
                Twitter
              </a>
              |
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light ms-2"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>

        <div className="text-center mt-3">
          <small>
            &copy; {new Date().getFullYear()} ArtisticWorks. All rights
            reserved.
          </small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
