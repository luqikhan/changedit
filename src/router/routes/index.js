// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartsRoutes from './Charts'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import AgreementsRoutes from './Agreements'
import AccountsRoutes from './Accounts'

// ** Document title
const TemplateTitle = '%s - Changedit Dealer Web App'

// ** Default Route
const DefaultRoute = '/dashboard/analytics'

// ** Merge Routes
const Routes = [
  ...AgreementsRoutes,
  ...AccountsRoutes,
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartsRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
