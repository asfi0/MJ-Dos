import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { SessionProvider, useSession } from './session.jsx'
import EnterpriseShell from './EnterpriseShell.jsx'
import Launcher from './Launcher.jsx'

import HR from '../domains/hr/index.jsx'
import Finance from '../domains/finance/index.jsx'
import Operations from '../domains/operations/index.jsx'
import Compliance from '../domains/compliance/index.jsx'
import Reporting from '../domains/reporting/index.jsx'
import Documentation from '../domains/documentation/index.jsx'
import Investor from '../domains/investor/index.jsx'
import Distributor from '../domains/distributor/index.jsx'
import Admin from '../domains/admin/index.jsx'

const DOMAINS = {
  hr: HR, finance: Finance, operations: Operations, compliance: Compliance,
  reporting: Reporting, documentation: Documentation, investor: Investor,
  distributor: Distributor, admin: Admin,
}

// Renders the correct domain based on URL param + enforces isolation
function WorkspaceRouter() {
  const { workspace } = useParams()
  const { user } = useSession()

  // Not logged in → back to launcher
  if (!user) return <Navigate to="/" replace />

  // Domain isolation: logged-in user can only access THEIR workspace
  if (user.workspace !== workspace) {
    return <Navigate to={`/w/${user.workspace}`} replace />
  }

  const Domain = DOMAINS[workspace]
  if (!Domain) return <Navigate to="/" replace />
  return <Domain />
}

function Shell() {
  return (
    <EnterpriseShell>
      <WorkspaceRouter />
    </EnterpriseShell>
  )
}

export default function App() {
  return (
    <SessionProvider>
      <Routes>
        <Route path="/" element={<Launcher />} />
        <Route path="/w/:workspace/*" element={<Shell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SessionProvider>
  )
}
