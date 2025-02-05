import { FC, lazy, Suspense } from 'react'
import { Route, RouteProps, Routes as Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import RestrictedRoute from './RestrictedRoute'

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}

type AppRoute = RouteProps & {
  type?: RouteType
}

/* Public routes */
const Home = lazy(() => import('pages/Home'))
const Info = lazy(() => import('pages/Info'))
const About = lazy(() => import('pages/About'))
/* Private routes */
const Profile = lazy(() => import('pages/restricted/Profile'))
const AddArtwork = lazy(() => import('pages/restricted/Artwork/AddArtwork'))
const AddLicense = lazy(() => import('pages/restricted/AddLicensePage'))
const ArtworkPage = lazy(() => import('pages/ArtworkPage'))
/* Restricted routes */
const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))
/* Error routes */
const Page404 = lazy(() => import('pages/Page404'))

export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  {
    type: RouteType.PUBLIC,
    path: '/login',
    children: <Login />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/signup',
    children: <Register />,
  },
  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: '/profile',
    children: <Profile />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/artworks/:artworkId/add-license',
    children: <AddLicense />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/addartwork',
    children: <AddArtwork />,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: '/',
    children: <Home />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/artwork/:artworkId',
    children: <ArtworkPage />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/info',
    children: <Info />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/about',
    children: <About />,
  },
  // 404 Error
  {
    type: RouteType.PUBLIC,
    path: '*',
    children: <Page404 />,
  },
]

const Routes: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {AppRoutes.map((r) => {
          const { type } = r
          if (type === RouteType.PRIVATE) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<PrivateRoute>{r.children}</PrivateRoute>}
              />
            )
          }
          if (type === RouteType.RESTRICTED) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<RestrictedRoute>{r.children}</RestrictedRoute>}
              />
            )
          }

          return (
            <Route key={`${r.path}`} path={`${r.path}`} element={r.children} />
          )
        })}
        <Route path="*" element={<Page404 />} />
      </Switch>
    </Suspense>
  )
}

export default Routes
