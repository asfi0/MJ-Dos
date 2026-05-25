// Demo user registry — each maps to exactly ONE workspace
export const DEMO_USERS = [
  { id: 'hr',            workspace: 'hr',            name: 'Hina Raza',    title: 'HR Manager',           email: 'hr@mjdos.demo',          icon: 'Users',       color: '#2563eb', desc: 'Employees, attendance, payroll, leave & training' },
  { id: 'finance',       workspace: 'finance',       name: 'Faisal Karim', title: 'Finance Controller',   email: 'finance@mjdos.demo',     icon: 'Wallet',      color: '#16a34a', desc: 'Journals, payables, vouchers, bank & reports' },
  { id: 'operations',    workspace: 'operations',    name: 'Omar Sheikh',  title: 'Operations Lead',      email: 'ops@mjdos.demo',         icon: 'Package',     color: '#ea580c', desc: 'Consignments, warehouse, FEFO, inventory & shipments' },
  { id: 'compliance',    workspace: 'compliance',    name: 'Sana Iqbal',   title: 'Compliance Officer',   email: 'compliance@mjdos.demo',  icon: 'ShieldCheck', color: '#7c3aed', desc: 'FBR, SECP, notices, audit & red flags' },
  { id: 'reporting',     workspace: 'reporting',     name: 'Bilal Ahmed',  title: 'Reporting Analyst',    email: 'reporting@mjdos.demo',   icon: 'BarChart3',   color: '#0891b2', desc: 'Board reports, KPIs & exports' },
  { id: 'documentation', workspace: 'documentation', name: 'Ayesha Noor',  title: 'Governance Secretary', email: 'docs@mjdos.demo',        icon: 'FileText',    color: '#db2777', desc: 'Drafts, governance templates & PDF exports' },
  { id: 'investor',      workspace: 'investor',      name: 'Imran Malik',  title: 'Investor Relations',   email: 'investor@mjdos.demo',    icon: 'TrendingUp',  color: '#9333ea', desc: 'Portfolio, payouts & statements' },
  { id: 'distributor',   workspace: 'distributor',   name: 'Zainab Tariq', title: 'Distribution Manager', email: 'distributor@mjdos.demo', icon: 'Truck',       color: '#0f766e', desc: 'Stock, inventory & sales' },
  { id: 'admin',         workspace: 'admin',         name: 'System Admin', title: 'ERP Administrator',    email: 'admin@mjdos.demo',       icon: 'Settings',    color: '#475467', desc: 'Governance, users, roles & system monitoring' },
]
export function getUser(workspace) {
  return DEMO_USERS.find(u => u.workspace === workspace) || null
}
