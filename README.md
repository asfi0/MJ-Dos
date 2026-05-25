# MJ-DOS ERP — Demo Mode (Workspace Launcher)

A presentation-ready, demo-stable ERP built with **Vite + React + React Router (pure JSX, no TypeScript)**.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## How it works

- **Workspace Launcher** (login page): pick any of 9 workspace cards to enter demo mode as that workspace's user.
- **Domain isolation**: each demo user sees ONLY their own workspace — its own sidebar, dashboard, and screens. No mixed menus.
- **One EnterpriseShell**: the shell dynamically renders the sidebar for the logged-in workspace.
- **Admin = Governance**: the Admin workspace is oversight-only (users, roles, monitoring, security, config) and can *Open Workspace* into any domain.

## Workspaces

| Workspace | Screens |
|---|---|
| HR | Dashboard, Employees, Attendance, Payroll, Leave, Training |
| Finance | Dashboard, Journals, Payables, Vouchers, Bank, Reports |
| Operations | Dashboard, Consignments, Warehouse, FEFO Queue, Inventory, Shipments |
| Compliance | Dashboard, FBR, SECP, Notices, Audit, Red Flags |
| Reporting | Dashboard (charts), Board Reports, KPIs, Exports |
| Documentation | Dashboard, Drafts, Templates, Vault, PDF Exports |
| Investor | Dashboard (cap table), Portfolio, Payouts, Statements |
| Distributor | Dashboard, Stock, Inventory, Sales |
| Admin | Governance Overview, Users, Roles, Monitoring, Security, Config |

## Stack

- Vite 5 · React 18 · React Router 6 · Recharts · lucide-react
- Pure `.jsx` — no TypeScript, no `--jsx` flag issues, no TanStack
- Deterministic demo data (`src/data/`) so screens are always populated

## Structure

```
src/
├── app/
│   ├── App.jsx              # routing + workspace isolation
│   ├── EnterpriseShell.jsx  # single shell, dynamic sidebar
│   ├── Launcher.jsx         # workspace launcher login
│   ├── session.jsx          # demo session provider
│   └── workspace-config.js  # per-domain sidebar definitions
├── domains/                 # 9 isolated domains, each self-routing
├── data/                    # demo users + datasets
└── shared/ui.jsx            # KPI cards, tables, badges, charts helpers
```
