import { lazy } from 'react'

const AccountRoutes = [
  // Accounts
  {
    path: '/account',
    component: lazy(() => import('../../views/account'))
  }
]

export default AccountRoutes
