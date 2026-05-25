// Each workspace defines its OWN isolated sidebar — domain isolation
export const WORKSPACES = {
  hr: {
    label: 'HR Workspace', icon: 'Users', color: '#2563eb',
    nav: [
      { to: '', label: 'Dashboard', icon: 'LayoutDashboard' },
      { to: 'employees', label: 'Employees', icon: 'Users' },
      { to: 'attendance', label: 'Attendance', icon: 'CalendarCheck' },
      { to: 'payroll', label: 'Payroll', icon: 'Wallet' },
      { to: 'leave', label: 'Leave', icon: 'Plane' },
      { to: 'training', label: 'Training', icon: 'GraduationCap' },
    ],
  },
  finance: {
    label: 'Finance Workspace', icon: 'Wallet', color: '#16a34a',
    nav: [
      { to: '', label: 'Dashboard', icon: 'LayoutDashboard' },
      { to: 'journals', label: 'Journals', icon: 'BookOpen' },
      { to: 'payables', label: 'Payables', icon: 'Receipt' },
      { to: 'vouchers', label: 'Vouchers', icon: 'FileCheck' },
      { to: 'bank', label: 'Bank', icon: 'Landmark' },
      { to: 'reports', label: 'Reports', icon: 'BarChart3' },
    ],
  },
  operations: {
    label: 'Operations Workspace', icon: 'Package', color: '#ea580c',
    nav: [
      { to: '', label: 'Dashboard', icon: 'LayoutDashboard' },
      { to: 'consignments', label: 'Consignments', icon: 'Boxes' },
      { to: 'warehouse', label: 'Warehouse', icon: 'Warehouse' },
      { to: 'fefo', label: 'FEFO Queue', icon: 'Clock' },
      { to: 'inventory', label: 'Inventory', icon: 'Package' },
      { to: 'shipments', label: 'Shipments', icon: 'Truck' },
    ],
  },
  compliance: {
    label: 'Compliance Workspace', icon: 'ShieldCheck', color: '#7c3aed',
    nav: [
      { to: '', label: 'Dashboard', icon: 'LayoutDashboard' },
      { to: 'fbr', label: 'FBR', icon: 'Landmark' },
      { to: 'secp', label: 'SECP', icon: 'Building2' },
      { to: 'notices', label: 'Notices', icon: 'Mail' },
      { to: 'audit', label: 'Audit', icon: 'ClipboardCheck' },
      { to: 'redflags', label: 'Red Flags', icon: 'AlertTriangle' },
    ],
  },
  reporting: {
    label: 'Reporting Workspace', icon: 'BarChart3', color: '#0891b2',
    nav: [
      { to: '', label: 'Dashboard', icon: 'LayoutDashboard' },
      { to: 'board', label: 'Board Reports', icon: 'FileBarChart' },
      { to: 'kpis', label: 'KPIs', icon: 'Activity' },
      { to: 'exports', label: 'Exports', icon: 'Download' },
    ],
  },
  documentation: {
    label: 'Documentation Workspace', icon: 'FileText', color: '#db2777',
    nav: [
      { to: '', label: 'Dashboard', icon: 'LayoutDashboard' },
      { to: 'drafts', label: 'Drafts', icon: 'FileEdit' },
      { to: 'templates', label: 'Templates', icon: 'LayoutTemplate' },
      { to: 'vault', label: 'Document Vault', icon: 'Archive' },
      { to: 'exports', label: 'PDF Exports', icon: 'FileDown' },
    ],
  },
  investor: {
    label: 'Investor Workspace', icon: 'TrendingUp', color: '#9333ea',
    nav: [
      { to: '', label: 'Dashboard', icon: 'LayoutDashboard' },
      { to: 'portfolio', label: 'Portfolio', icon: 'PieChart' },
      { to: 'payouts', label: 'Payouts', icon: 'Banknote' },
      { to: 'statements', label: 'Statements', icon: 'FileText' },
    ],
  },
  distributor: {
    label: 'Distributor Workspace', icon: 'Truck', color: '#0f766e',
    nav: [
      { to: '', label: 'Dashboard', icon: 'LayoutDashboard' },
      { to: 'stock', label: 'Stock', icon: 'Boxes' },
      { to: 'inventory', label: 'Inventory', icon: 'Package' },
      { to: 'sales', label: 'Sales', icon: 'ShoppingCart' },
    ],
  },
  admin: {
    label: 'Admin — Governance', icon: 'Settings', color: '#475467',
    nav: [
      { to: '', label: 'Overview', icon: 'LayoutDashboard' },
      { to: 'users', label: 'User Management', icon: 'Users' },
      { to: 'roles', label: 'Role Control', icon: 'KeyRound' },
      { to: 'monitoring', label: 'System Monitoring', icon: 'Activity' },
      { to: 'security', label: 'Security Logs', icon: 'ShieldAlert' },
      { to: 'config', label: 'ERP Configuration', icon: 'Settings' },
    ],
  },
}
