import { pick, int, daysAgo, daysAhead, rand } from './seed.js'

const firstNames = ['Aarav','Maya','Liam','Sofia','Noah','Aria','Ethan','Zara','Kai','Mei','Diego','Lina','Omar','Ines','Rohan','Priya','Yara','Jonas','Hana','Adam','Lea','Theo','Mira','Felix','Nora','Iris','Mateo','Ada','Sami','Anya']
const lastNames = ['Chen','Patel','Singh','Garcia','Park','Nakamura','Khan','Costa','Ahmed','Schmidt','Rossi','Dubois','Silva','Kim','Andersen','Oliveira','Martin','Hassan','Romano','Petrov']
const depts = ['Engineering','Finance','People Ops','Sales','Operations','Marketing','Legal','Logistics']
const designations = {
  Engineering: ['Software Engineer','Senior Engineer','Engineering Manager','QA Engineer'],
  Finance: ['Accountant','Finance Analyst','Controller','Finance Manager'],
  'People Ops': ['HR Generalist','HR Business Partner','Recruiter'],
  Sales: ['Account Executive','Sales Manager','Key Account Lead'],
  Operations: ['Operations Analyst','Operations Manager','Logistics Lead'],
  Marketing: ['Content Strategist','Brand Manager','Growth Lead'],
  Legal: ['Counsel','Compliance Officer'],
  Logistics: ['Warehouse Supervisor','Dispatch Coordinator','Fleet Lead'],
}
const colors = ['#2563eb','#0891b2','#7c3aed','#db2777','#ea580c','#16a34a','#0f766e','#9333ea','#dc2626','#65a30d']
const locations = ['HQ - Lahore','Karachi Office','Faisalabad','Remote - GCC','Frankfurt DE','Paris FR']

const initials = (n) => n.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()

// ---------------- HR ----------------
export const employees = Array.from({ length: 48 }, (_, i) => {
  const dept = pick(depts)
  const name = `${pick(firstNames)} ${pick(lastNames)}`
  const status = rand() < 0.84 ? 'active' : pick(['on_leave','active','suspended','resigned'])
  const salary = int(45, 320) * 1000
  return {
    id: `EMP-${1001 + i}`, name, initials: initials(name), color: pick(colors),
    dept, designation: pick(designations[dept]), location: pick(locations),
    type: pick(['full_time','full_time','full_time','contract','part_time']),
    status, salary, email: name.toLowerCase().replace(' ', '.') + '@mjagro.com',
    hireDate: daysAgo(int(60, 2200)),
  }
})
export const leaves = Array.from({ length: 28 }, (_, i) => {
  const e = pick(employees)
  return {
    id: `LV-${2001 + i}`, employee: e.name, color: e.color, initials: e.initials,
    type: pick(['annual','sick','casual','maternity','unpaid']),
    from: daysAgo(int(-20, 40)), days: int(1, 12),
    status: pick(['pending','approved','approved','rejected']),
  }
})
export const payroll = employees.slice(0, 20).map((e) => ({
  id: `PAY-${e.id}`, employee: e.name, initials: e.initials, color: e.color,
  dept: e.dept, gross: e.salary / 12,
  deductions: Math.round((e.salary / 12) * 0.14), net: Math.round((e.salary / 12) * 0.86),
  status: pick(['paid','paid','pending_approval','draft']),
}))

// ---------------- FINANCE ----------------
export const journals = Array.from({ length: 24 }, (_, i) => ({
  id: `JV-${4400 + i}`, date: daysAgo(int(1, 90)),
  description: pick(['Supplier payment — spices','Sales receipt — S&J Foods','Bank charges','Salary accrual','Freight & logistics','VAT settlement','Container clearance','Distributor settlement — Frankfurt']),
  debit: int(2, 180) * 1000, account: pick(['Cash','Bank — Meezan','Accounts Payable','Sales','Inventory','VAT Payable']),
  status: pick(['posted','posted','draft','pending']),
}))
export const payables = Array.from({ length: 16 }, (_, i) => ({
  id: `AP-${7700 + i}`, vendor: pick(['Shan Foods','National Spices','Packaging Co','Maersk Line','DHL Freight','Tetra Pak','Local Mills Ltd']),
  invoice: `INV-${int(10000, 99999)}`, amount: int(5, 240) * 1000, due: daysAhead(int(-10, 45)),
  status: pick(['unpaid','unpaid','paid','overdue']),
}))
export const vouchers = Array.from({ length: 14 }, (_, i) => ({
  id: `VCH-${3300 + i}`, type: pick(['Payment','Receipt','Journal','Contra']),
  party: pick(['S&J Foods SASU','Kassan Supermarket','Shan Foods','MJ Agro Bank','Internal Transfer']),
  amount: int(3, 150) * 1000, date: daysAgo(int(1, 60)), status: pick(['approved','approved','pending']),
}))

// ---------------- OPERATIONS ----------------
const skus = ['Biryani Masala','Karahi Mix','Chaat Masala','Turmeric Powder','Red Chilli','Garam Masala','Basmati Rice 5kg','Mango Pickle','Tamarind Paste','Ginger Garlic Paste']
export const consignments = Array.from({ length: 18 }, (_, i) => ({
  id: `CONS-${5500 + i}`, sku: pick(skus), batch: `B${int(2400, 2499)}`,
  qty: int(200, 5000), warehouse: pick(['Lahore Central','Karachi Port','Frankfurt DC','Paris Hub']),
  received: daysAgo(int(1, 120)), expiry: daysAhead(int(-30, 540)),
  status: pick(['in_stock','in_stock','in_transit','quarantine']),
}))
export const warehouses = [
  { name: 'Lahore Central', capacity: 12000, used: 8640, items: 142 },
  { name: 'Karachi Port', capacity: 20000, used: 15800, items: 208 },
  { name: 'Frankfurt DC', capacity: 8000, used: 3920, items: 96 },
  { name: 'Paris Hub', capacity: 6000, used: 4680, items: 74 },
]
export const shipments = Array.from({ length: 12 }, (_, i) => ({
  id: `SHP-${6600 + i}`, destination: pick(['S&J Foods, Paris','Kassan, Frankfurt','Dubai GCC','Local Distributor']),
  sku: pick(skus), qty: int(100, 3000), carrier: pick(['Maersk','DHL','DB Schenker','PIA Cargo']),
  eta: daysAhead(int(1, 40)), status: pick(['in_transit','in_transit','delivered','preparing']),
}))

// ---------------- COMPLIANCE ----------------
export const notices = Array.from({ length: 14 }, (_, i) => ({
  id: `NOT-${8800 + i}`, authority: pick(['FBR','SECP','Customs','Provincial Tax']),
  subject: pick(['Sales tax return filing','Annual return Form-A','EOX residue clarification','WHT statement','Director particulars update','Import GD assessment']),
  issued: daysAgo(int(1, 90)), due: daysAhead(int(-15, 30)),
  severity: pick(['high','medium','medium','low']), status: pick(['open','open','responded','closed']),
}))
export const redFlags = Array.from({ length: 8 }, (_, i) => ({
  id: `RF-${i + 1}`, area: pick(['Tax','Export','Quality','Governance']),
  issue: pick(['Pending RASFF clarification','EOX threshold review','Late filing risk','Missing board minutes','Unreconciled VAT']),
  risk: pick(['high','high','medium','low']), owner: pick(['Sana Iqbal','Legal Team','QA Lead']),
}))

// ---------------- REPORTING ----------------
export const monthlyRevenue = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'].map((m, i) => ({
  month: m, revenue: int(180, 420) * 1000, cost: int(90, 240) * 1000,
}))
export const channelMix = [
  { name: 'EU — France', value: 38 }, { name: 'EU — Germany', value: 27 },
  { name: 'GCC', value: 21 }, { name: 'Domestic', value: 14 },
]
export const boardReports = Array.from({ length: 9 }, (_, i) => ({
  id: `RPT-${i + 1}`, title: pick(['Q4 Board Pack','Monthly MIS','Export Performance','Inventory Aging','Cashflow Forecast','Compliance Status','Investor Update','Sales by Channel','FEFO Risk Report']),
  period: pick(['Q4 2025','Jan 2026','Dec 2025','FY2025']), generated: daysAgo(int(1, 45)),
  status: pick(['final','final','draft']), format: pick(['PDF','XLSX','PDF']),
}))

// ---------------- DOCUMENTATION ----------------
export const documents = Array.from({ length: 16 }, (_, i) => ({
  id: `DOC-${9900 + i}`, title: pick(['Board Resolution — Dividend','CEO Appointment Letter','Distribution Agreement — S&J','Shareholders Agreement','AGM Minutes','Power of Attorney','Bank Mandate Resolution','Compliance Certificate']),
  type: pick(['Resolution','Agreement','Minutes','Letter','Certificate']),
  version: `v${int(1, 4)}.${int(0, 9)}`, updated: daysAgo(int(1, 60)),
  status: pick(['approved','approved','draft','pending_signature']), owner: 'Ayesha Noor',
}))
export const templates = [
  { name: 'Board Resolution', category: 'Governance', fields: 8 },
  { name: 'Meeting Minutes', category: 'Governance', fields: 12 },
  { name: 'Appointment Letter', category: 'HR', fields: 6 },
  { name: 'Distribution Agreement', category: 'Legal', fields: 14 },
  { name: 'Power of Attorney', category: 'Legal', fields: 9 },
  { name: 'Compliance Certificate', category: 'Compliance', fields: 7 },
]

// ---------------- INVESTOR ----------------
export const investors = [
  { name: 'Imran Malik', share: 32, invested: 4800000, payout: 384000 },
  { name: 'Aziz Holdings', share: 24, invested: 3600000, payout: 288000 },
  { name: 'Rehman Family Trust', share: 18, invested: 2700000, payout: 216000 },
  { name: 'GCC Ventures', share: 16, invested: 2400000, payout: 192000 },
  { name: 'Founder Equity', share: 10, invested: 1500000, payout: 120000 },
]
export const payouts = Array.from({ length: 10 }, (_, i) => ({
  id: `PO-${i + 1}`, investor: pick(investors).name, period: pick(['Q1 2026','Q4 2025','Q3 2025']),
  amount: int(40, 380) * 1000, date: daysAgo(int(1, 120)), status: pick(['paid','paid','scheduled']),
}))

// ---------------- DISTRIBUTOR ----------------
export const distributorStock = skus.map((sku, i) => ({
  id: `DS-${i + 1}`, sku, onHand: int(200, 4000), reserved: int(0, 800),
  reorder: int(300, 1000), price: int(3, 18), region: pick(['France','Germany','GCC']),
}))
export const distributorSales = Array.from({ length: 14 }, (_, i) => ({
  id: `SAL-${i + 1}`, customer: pick(['S&J Foods','Kassan Supermarket','Al Maya','Lulu Hyper','Carrefour FR']),
  sku: pick(skus), qty: int(50, 1200), value: int(2, 60) * 1000, date: daysAgo(int(1, 50)),
  status: pick(['fulfilled','fulfilled','pending']),
}))

// ---------------- ADMIN ----------------
export const systemUsers = [
  { name: 'Hina Raza', role: 'HR Manager', workspace: 'HR', status: 'active', lastLogin: daysAgo(0) },
  { name: 'Faisal Karim', role: 'Finance Controller', workspace: 'Finance', status: 'active', lastLogin: daysAgo(1) },
  { name: 'Omar Sheikh', role: 'Operations Lead', workspace: 'Operations', status: 'active', lastLogin: daysAgo(0) },
  { name: 'Sana Iqbal', role: 'Compliance Officer', workspace: 'Compliance', status: 'active', lastLogin: daysAgo(2) },
  { name: 'Bilal Ahmed', role: 'Reporting Analyst', workspace: 'Reporting', status: 'inactive', lastLogin: daysAgo(9) },
  { name: 'Ayesha Noor', role: 'Governance Secretary', workspace: 'Documentation', status: 'active', lastLogin: daysAgo(1) },
  { name: 'Imran Malik', role: 'Investor Relations', workspace: 'Investor', status: 'active', lastLogin: daysAgo(3) },
  { name: 'Zainab Tariq', role: 'Distribution Manager', workspace: 'Distributor', status: 'active', lastLogin: daysAgo(0) },
]
export const auditLog = Array.from({ length: 16 }, (_, i) => ({
  id: `LOG-${i + 1}`, user: pick(systemUsers).name,
  action: pick(['Logged in','Exported report','Approved voucher','Created consignment','Updated employee','Filed return','Generated document','Posted journal']),
  module: pick(['HR','Finance','Operations','Compliance','Documentation']),
  time: daysAgo(int(0, 14)), ip: `10.0.${int(0,255)}.${int(1,254)}`,
}))
export const roles = [
  { name: 'Administrator', users: 1, perms: 'Full system governance' },
  { name: 'Manager', users: 4, perms: 'Domain read/write + approvals' },
  { name: 'Analyst', users: 2, perms: 'Read + export' },
  { name: 'Viewer', users: 3, perms: 'Read only' },
]
