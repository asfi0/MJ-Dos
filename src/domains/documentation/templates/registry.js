// MJ Agro / TAVAAZO document templates — faithfully ported from the original ERP
const ATTENDEE_COLS = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Attendance' },
]
const INVOICE_COLS = [
  { key: 'description', label: 'Description' },
  { key: 'hs_code', label: 'HS Code' },
  { key: 'qty', label: 'Qty', type: 'number' },
  { key: 'unit', label: 'Unit' },
  { key: 'unit_price', label: 'Unit Price', type: 'number' },
  { key: 'amount', label: 'Amount', type: 'number' },
]
const RESOLUTION_COLS = [
  { key: 'voter', label: 'Voter' },
  { key: 'role', label: 'Role' },
  { key: 'vote', label: 'Vote' },
]

export const TEMPLATES = [
  {
    id: 'invoice',
    name: 'Commercial Invoice',
    category: 'Finance',
    description: 'Corporate commercial invoice with bill-to / ship-to, itemized table and bank details.',
    fields: [
      { key: 'document_number', label: 'Invoice No.', type: 'text', group: 'Identity' },
      { key: 'document_date', label: 'Invoice Date', type: 'date', group: 'Identity' },
      { key: 'due_date', label: 'Due Date', type: 'date', group: 'Identity' },
      { key: 'currency', label: 'Currency', type: 'text', group: 'Identity' },
      { key: 'bill_to', label: 'Bill To', type: 'textarea', group: 'Parties' },
      { key: 'ship_to', label: 'Ship To', type: 'textarea', group: 'Parties' },
      { key: 'items', label: 'Line Items', type: 'table', group: 'Items', columns: INVOICE_COLS },
      { key: 'discount_pct', label: 'Discount %', type: 'number', group: 'Totals' },
      { key: 'freight', label: 'Freight', type: 'number', group: 'Totals' },
      { key: 'payment_terms', label: 'Payment Terms', type: 'textarea', group: 'Payment' },
      { key: 'bank_details', label: 'Bank Details', type: 'textarea', group: 'Payment' },
      { key: 'remarks', label: 'Remarks', type: 'textarea', group: 'Notes' },
      { key: 'authorized_signatory', label: 'Authorized Signatory', type: 'text', group: 'Approval' },
    ],
    defaults: {
      document_number: 'INV-2026-0401',
      document_date: '2026-04-01',
      due_date: '2026-04-15',
      currency: 'USD',
      bill_to: 'Global Fresh Foods GmbH\nLandsberger Allee 123,\n10407 Berlin,\nGermany\nEmail: info@globalfresh.de\nVAT No.: DE123456789',
      ship_to: 'Global Fresh Foods GmbH\nLandsberger Allee 123,\n10407 Berlin,\nGermany',
      items: [
        { description: 'Tavaazo Basmati Rice 1121 — 5kg Pack', hs_code: '1006.30', qty: 1000, unit: 'PKT', unit_price: 7.8, amount: 7800 },
        { description: 'Tavaazo Premium Basmati Rice — 10kg Pack', hs_code: '1006.30', qty: 500, unit: 'PKT', unit_price: 14.5, amount: 7250 },
        { description: 'Tavaazo Green Lentils — 1kg Pack', hs_code: '0713.40', qty: 800, unit: 'PKT', unit_price: 2.1, amount: 1680 },
        { description: 'Tavaazo Chickpeas — 1kg Pack', hs_code: '0713.20', qty: 800, unit: 'PKT', unit_price: 2.0, amount: 1600 },
        { description: 'Tavaazo Basmati Rice 1121 — 25kg Pack', hs_code: '1006.30', qty: 200, unit: 'PKT', unit_price: 32.0, amount: 6400 },
      ],
      discount_pct: 2,
      freight: 1250,
      payment_terms: '50% Advance, 50% Before Shipment\nMethod: Bank Transfer\nBank charges: borne by buyer\nPlease include invoice number with payment',
      bank_details: 'Bank: Meezan Bank Limited\nAccount Title: MJ Agro Trading (Private) Limited\nAccount No.: 1234-0109876543\nIBAN: PK36MEZN0012340109876543\nSWIFT: MEZNPKKA\nBranch: Main Boulevard, Sialkot, Pakistan',
      remarks: 'Thank you for your business. We look forward to a long and successful partnership.',
      authorized_signatory: 'Saima Tamaz',
    },
  },
  {
    id: 'meeting_minutes',
    name: 'Board Meeting Minutes',
    category: 'Governance',
    description: 'Structured minutes with attendees, agenda, decisions and signatures.',
    fields: [
      { key: 'document_number', label: 'Minutes Ref.', type: 'text', group: 'Identity' },
      { key: 'document_title', label: 'Meeting Title', type: 'text', group: 'Identity' },
      { key: 'meeting_date', label: 'Meeting Date', type: 'date', group: 'Identity' },
      { key: 'location', label: 'Location', type: 'text', group: 'Identity' },
      { key: 'chair', label: 'Chairperson', type: 'text', group: 'Governance' },
      { key: 'secretary', label: 'Company Secretary', type: 'text', group: 'Governance' },
      { key: 'attendees', label: 'Attendees', type: 'table', group: 'Governance', columns: ATTENDEE_COLS },
      { key: 'agenda', label: 'Agenda & Decisions', type: 'list', group: 'Body' },
      { key: 'resolutions_passed', label: 'Resolutions Passed', type: 'textarea', group: 'Body' },
      { key: 'next_meeting', label: 'Next Meeting', type: 'date', group: 'Closing' },
      { key: 'authorized_signatory', label: 'Signed (Chairperson)', type: 'text', group: 'Approval' },
    ],
    defaults: {
      document_number: 'MIN-2026-Q1-014',
      document_title: 'Quarterly Board Meeting — Q1 2026',
      meeting_date: '2026-03-31',
      location: 'MJ Agro HQ, Sialkot — Boardroom A',
      chair: 'M. J. Tamaz',
      secretary: 'A. Mensah',
      attendees: [
        { name: 'M. J. Tamaz', role: 'Chairperson', status: 'Present' },
        { name: 'A. Mensah', role: 'Company Secretary', status: 'Present' },
        { name: 'S. Patel', role: 'CFO', status: 'Present' },
        { name: 'L. Ferreira', role: 'COO', status: 'Present' },
        { name: 'K. Müller', role: 'Non-Exec Director', status: 'Remote' },
        { name: 'J. Okonkwo', role: 'Independent Director', status: 'Present' },
      ],
      agenda: [
        'Welcome, quorum confirmation and adoption of agenda',
        'Approval of minutes of previous meeting (MIN-2025-Q4-013)',
        'FY26 Q1 financial review and treasury position',
        'Capital reallocation proposal — Project Atlas',
        'Risk register review and ESG compliance update',
        'Any other business and date of next meeting',
      ],
      resolutions_passed:
        'RES-2026-4002: Approve FY26 Capital Expenditure Plan up to USD 18M.\nRES-2026-4005: Authorize Treasury Diversification up to USD 25M.\nRES-2026-4007: Adopt Updated Code of Conduct effective 01 May 2026.',
      next_meeting: '2026-06-30',
      authorized_signatory: 'M. J. Tamaz',
    },
  },
  {
    id: 'board_resolution',
    name: 'Board Resolution',
    category: 'Governance',
    description: 'Formal board resolution with proposer, voting record and authorization.',
    fields: [
      { key: 'document_number', label: 'Resolution No.', type: 'text', group: 'Identity' },
      { key: 'document_title', label: 'Resolution Title', type: 'text', group: 'Identity' },
      { key: 'meeting_reference', label: 'Linked Meeting', type: 'text', group: 'Identity' },
      { key: 'document_date', label: 'Date Passed', type: 'date', group: 'Identity' },
      { key: 'preamble', label: 'Preamble (Whereas…)', type: 'textarea', group: 'Body' },
      { key: 'resolution_text', label: 'Resolved That…', type: 'textarea', group: 'Body' },
      { key: 'proposed_by', label: 'Proposed By', type: 'text', group: 'Voting' },
      { key: 'seconded_by', label: 'Seconded By', type: 'text', group: 'Voting' },
      { key: 'votes', label: 'Voting Record', type: 'table', group: 'Voting', columns: RESOLUTION_COLS },
      { key: 'authorized_signatory', label: 'Signed (Chairperson)', type: 'text', group: 'Approval' },
    ],
    defaults: {
      document_number: 'RES-2026-4005',
      document_title: 'Authorize Treasury Diversification up to USD 25M',
      meeting_reference: 'MTG-2026-3001 / Q1 Board Meeting',
      document_date: '2026-03-31',
      preamble:
        'WHEREAS the Board has reviewed the treasury concentration risk identified in the FY25 Audit Report; and WHEREAS the CFO has presented a diversification framework approved by the Audit Committee on 14 March 2026;',
      resolution_text:
        'RESOLVED THAT the Treasury function be and is hereby authorized to diversify holdings across approved investment-grade instruments up to a maximum exposure of USD 25,000,000, subject to quarterly reporting to the Audit Committee and the Board.',
      proposed_by: 'S. Patel (CFO)',
      seconded_by: 'J. Okonkwo (Independent Director)',
      votes: [
        { voter: 'M. J. Tamaz', role: 'Chairperson', vote: 'For' },
        { voter: 'S. Patel', role: 'CFO', vote: 'For' },
        { voter: 'L. Ferreira', role: 'COO', vote: 'For' },
        { voter: 'J. Okonkwo', role: 'Independent Director', vote: 'For' },
        { voter: 'K. Müller', role: 'Non-Exec Director', vote: 'Abstain' },
      ],
      authorized_signatory: 'M. J. Tamaz',
    },
  },
  {
    id: 'shipment_summary',
    name: 'Shipment Summary',
    category: 'Operations',
    description: 'Consignment summary with cargo manifest and dispatch authorization.',
    fields: [
      { key: 'document_number', label: 'Shipment Ref.', type: 'text', group: 'Identity' },
      { key: 'document_date', label: 'Dispatch Date', type: 'date', group: 'Identity' },
      { key: 'consignee', label: 'Consignee', type: 'textarea', group: 'Parties' },
      { key: 'port_of_loading', label: 'Port of Loading', type: 'text', group: 'Logistics' },
      { key: 'port_of_discharge', label: 'Port of Discharge', type: 'text', group: 'Logistics' },
      { key: 'incoterms', label: 'Incoterms', type: 'text', group: 'Logistics' },
      { key: 'items', label: 'Cargo Manifest', type: 'table', group: 'Items', columns: INVOICE_COLS },
      { key: 'remarks', label: 'Remarks', type: 'textarea', group: 'Notes' },
      { key: 'authorized_signatory', label: 'Dispatch Authorization', type: 'text', group: 'Approval' },
    ],
    defaults: {
      document_number: 'SHP-2026-0188',
      document_date: '2026-04-05',
      consignee: 'Global Fresh Foods GmbH\nLandsberger Allee 123, 10407 Berlin, Germany',
      port_of_loading: 'Karachi, Pakistan',
      port_of_discharge: 'Hamburg, Germany',
      incoterms: 'CIF Hamburg',
      items: [
        { description: 'Tavaazo Basmati Rice 1121 — 25kg', hs_code: '1006.30', qty: 200, unit: 'BAG', unit_price: 32, amount: 6400 },
        { description: 'Tavaazo Green Lentils — Bulk', hs_code: '0713.40', qty: 50, unit: 'BAG', unit_price: 60, amount: 3000 },
      ],
      remarks: 'Sealed container MSCU-7781205. Phytosanitary certificate attached.',
      authorized_signatory: 'L. Ferreira (COO)',
    },
  },
]

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0]
}

export const CATEGORY_COLORS = {
  Finance: '#16a34a', Governance: '#7c3aed', Operations: '#ea580c', Audit: '#0891b2',
}
