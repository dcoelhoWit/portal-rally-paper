import { createBrowserRouter, Navigate } from 'react-router'
import { LoginPage, RegisterAccount } from '../features/auth'
import { paths } from '../lib/paths'
import { RedirectIfAuthenticated } from './RedirectIfAuthenticated'
import { RequireRole } from './RequireRole'
import { AdminDashboardRoute } from './routes/AdminDashboardRoute'
import { DashboardRoute } from './routes/DashboardRoute'

export const router = createBrowserRouter([
  {
    element: <RequireRole role="team" />,
    children: [{ path: paths.home, Component: DashboardRoute }],
  },
  {
    element: <RequireRole role="admin" />,
    children: [{ path: paths.admin, Component: AdminDashboardRoute }],
  },
  {
    Component: RedirectIfAuthenticated,
    children: [
      { path: paths.login, Component: LoginPage },
      { path: paths.register, Component: RegisterAccount },
    ],
  },
  { path: '*', element: <Navigate to={paths.home} replace /> },
])
