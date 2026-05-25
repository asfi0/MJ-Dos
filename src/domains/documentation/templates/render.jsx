import React from 'react'

const GREEN = '#1f5132'
const GOLD = '#c9a352'

function fmtDateLong(d) {
  if (!d) return ''
  const date = typeof d === 'string' ? new Date(d) : d
  if (isNaN(date)) return String(d)
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
}
function money(n) {
  const num = typeof n === 'number' ? n : parseFloat(String(n ?? 0))
  return (isNaN(num) ? 0 : num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function InfoBlock({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: GOLD }}>{label}</div>
      <div style={{ marginTop: 4, fontSize: 11, whiteSpace: 'pre-line', color: '#222' }}>{children}</div>
    </div>
  )
}
function SectionTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8 }}>
      <div style={{ height: 12, width: 4, background: GOLD }} />
      <h2 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.03em', textTransform: 'uppercase', color: GREEN, margin: 0 }}>{children}</h2>
    </div>
  )
}

// ============ Letterhead shell ============
export function PageShell({ data, templateName, children }) {
  const docNo = data.document_number || '—'
  const docDate = data.document_date ? fmtDateLong(data.document_date) : fmtDateLong(new Date())
  const th = { padding: '8px', textAlign: 'left', color: '#fff' }
  return (
    <div className="doc-page" style={{
      width: '210mm', minHeight: '297mm', background: '#fff', color: '#1a1a1a',
      margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", position: 'relative',
    }}>
      {/* top strip */}
      <div style={{ display: 'flex' }}>
        <div style={{ background: GREEN, height: 22, flex: 1 }} />
        <div style={{ background: GOLD, height: 22, width: 90 }} />
        <div style={{ background: GREEN, height: 22, width: 70, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, paddingRight: 12 }}>
          <span style={{ height: 6, width: 6, borderRadius: '50%', background: 'rgba(255,255,255,.95)' }} />
          <span style={{ height: 6, width: 6, borderRadius: '50%', background: 'rgba(255,255,255,.95)' }} />
          <span style={{ height: 6, width: 6, borderRadius: '50%', background: 'rgba(255,255,255,.95)' }} />
        </div>
      </div>
      <div style={{ background: GOLD, height: 5 }} />

      {/* header */}
      <div style={{ padding: '24px 40px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.02em', color: GREEN, margin: 0 }}>MJ AGRO GROUP</h1>
          <div style={{ fontSize: 12, color: '#444', marginTop: 2 }}>MJ Agro Trading (Private) Limited</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 10, letterSpacing: '.02em', color: '#555' }}>
          <div>DOCUMENT VERSION 1.0 | MJ-DOS 1.0 | DATE: {docDate.toUpperCase()}</div>
          <div style={{ marginTop: 4, fontFamily: 'monospace', color: '#222' }}>{templateName.toUpperCase()} · {docNo}</div>
        </div>
      </div>

      {/* tavaazo + mj strip */}
      <div style={{ padding: '0 40px 12px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: `2px solid ${GREEN}`, borderRadius: 6, padding: '6px 16px', color: GREEN }}>
          <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 20, fontWeight: 700 }}>Tavaazo</span>
          <span style={{ fontSize: 8, letterSpacing: '.2em' }}>ESTD 2024</span>
        </div>
        <div style={{ height: 32, width: 1, background: GOLD }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ height: 32, width: 32, borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 10, background: `linear-gradient(135deg, ${GREEN}, ${GOLD})` }}>MJ</div>
          <span style={{ fontWeight: 700, fontSize: 13, color: GREEN }}>MJ AGRO GROUP</span>
        </div>
      </div>
      <div style={{ margin: '0 40px', height: 2, background: GOLD }} />

      {/* body */}
      <div style={{ padding: '24px 40px', fontSize: 11.5, lineHeight: 1.6 }}>{children}</div>

      {/* footer */}
      <div style={{ padding: '0 40px', marginTop: 24 }}>
        <div style={{ height: 2, background: GOLD }} />
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: GREEN }}>MJ AGRO TRADING (PRIVATE) LIMITED</div>
          <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>Plot No. 103-B, Main Boulevard, City Housing, Sialkot, Punjab, Pakistan.</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 12, fontSize: 10, color: '#333' }}>
          <div><div>+92 300 864 8488</div><div style={{ marginTop: 4 }}>+92 333 111 9488</div></div>
          <div style={{ textAlign: 'center' }}><div>info@mjagrogroup.com</div><div style={{ marginTop: 4 }}>www.mjagrogroup.com</div></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ height: 48, width: 48, background: 'repeating-conic-gradient(#000 0 25%, #fff 0 50%)', backgroundSize: '6px 6px' }} />
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ background: GOLD, height: 18, width: 50 }} />
          <div style={{ background: GREEN, height: 18, flex: 1, display: 'grid', placeItems: 'center' }}>
            <span style={{ fontSize: 10, letterSpacing: '.3em', color: '#fff', fontWeight: 500 }}>
              Quality | <span style={{ color: GOLD }}>Integrity</span> | Growth
            </span>
          </div>
          <div style={{ background: GOLD, height: 18, width: 50 }} />
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}

const thStyle = { padding: '8px', textAlign: 'left', color: '#fff', fontSize: 10.5 }
const tdStyle = { padding: '8px', fontSize: 10.5 }

function InvoiceBody({ data }) {
  const items = data.items || []
  const subtotal = items.reduce((s, i) => s + Number(i.amount ?? 0), 0)
  const discount = subtotal * (Number(data.discount_pct ?? 0) / 100)
  const net = subtotal - discount
  const freight = Number(data.freight ?? 0)
  const total = net + freight
  const ccy = data.currency || 'USD'
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: GREEN, margin: 0 }}>INVOICE</h1>
        <div style={{ fontSize: 11, display: 'grid', gridTemplateColumns: 'auto auto', columnGap: 12, rowGap: 4 }}>
          <div style={{ fontWeight: 600 }}>Invoice No.</div><div>: {data.document_number}</div>
          <div style={{ fontWeight: 600 }}>Invoice Date</div><div>: {fmtDateLong(data.document_date)}</div>
          <div style={{ fontWeight: 600 }}>Due Date</div><div>: {fmtDateLong(data.due_date)}</div>
          <div style={{ fontWeight: 600 }}>Currency</div><div>: {ccy}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 20 }}>
        <InfoBlock label="Bill To:">{data.bill_to}</InfoBlock>
        <InfoBlock label="Ship To:">{data.ship_to}</InfoBlock>
      </div>
      <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: GREEN }}>
            <th style={{ ...thStyle, width: 28 }}>#</th>
            <th style={thStyle}>DESCRIPTION</th>
            <th style={{ ...thStyle, width: 70 }}>HS CODE</th>
            <th style={{ ...thStyle, width: 70, textAlign: 'right' }}>QTY</th>
            <th style={{ ...thStyle, width: 48 }}>UNIT</th>
            <th style={{ ...thStyle, width: 90, textAlign: 'right' }}>UNIT PRICE</th>
            <th style={{ ...thStyle, width: 100, textAlign: 'right' }}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} style={{ background: i % 2 ? '#f7f5ef' : '#fff' }}>
              <td style={{ ...tdStyle, textAlign: 'center', background: GREEN, color: '#fff' }}>{i + 1}</td>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{it.description}</td>
              <td style={tdStyle}>{it.hs_code}</td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>{money(it.qty)}</td>
              <td style={tdStyle}>{it.unit}</td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>{money(it.unit_price)}</td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>{money(it.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot style={{ fontSize: 11 }}>
          <tr><td colSpan={5} /><td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 600, borderTop: '1px solid #ddd' }}>Subtotal</td><td style={{ padding: '6px 8px', textAlign: 'right', borderTop: '1px solid #ddd' }}>{ccy} {money(subtotal)}</td></tr>
          <tr><td colSpan={5} /><td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 600 }}>Discount ({data.discount_pct ?? 0}%)</td><td style={{ padding: '6px 8px', textAlign: 'right' }}>{ccy} {money(discount)}</td></tr>
          <tr><td colSpan={5} /><td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 600 }}>Net Amount</td><td style={{ padding: '6px 8px', textAlign: 'right' }}>{ccy} {money(net)}</td></tr>
          <tr><td colSpan={5} /><td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 600 }}>Freight</td><td style={{ padding: '6px 8px', textAlign: 'right' }}>{ccy} {money(freight)}</td></tr>
          <tr style={{ background: GREEN, color: '#fff' }}><td colSpan={5} /><td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>TOTAL AMOUNT DUE</td><td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>{ccy} {money(total)}</td></tr>
        </tfoot>
      </table>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20 }}>
        <div style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 11, marginBottom: 6, color: GREEN }}>PAYMENT TERMS</div>
          <div style={{ fontSize: 10.5, whiteSpace: 'pre-line', color: '#333' }}>{data.payment_terms}</div>
        </div>
        <div style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 11, marginBottom: 6, color: GREEN }}>BANK DETAILS</div>
          <div style={{ fontSize: 10.5, whiteSpace: 'pre-line', color: '#333' }}>{data.bank_details}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24, alignItems: 'flex-end' }}>
        <div style={{ fontSize: 10.5, color: '#555' }}>{data.remarks}</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10.5, color: '#555' }}>For and on behalf of</div>
          <div style={{ fontWeight: 700, color: GREEN }}>MJ Agro Trading (Private) Limited</div>
          <div style={{ marginTop: 12, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 18 }}>{data.authorized_signatory}</div>
          <div style={{ borderTop: '1px solid #999', paddingTop: 4, marginTop: 4, fontSize: 10 }}>Authorized Signatory</div>
        </div>
      </div>
    </>
  )
}

function MinutesBody({ data }) {
  const attendees = data.attendees || []
  const agenda = data.agenda || []
  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: GREEN, margin: 0 }}>BOARD MEETING MINUTES</h1>
      <div style={{ fontSize: 12, marginTop: 2, color: '#333' }}>{data.document_title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16 }}>
        <InfoBlock label="Date">{fmtDateLong(data.meeting_date)}</InfoBlock>
        <InfoBlock label="Location">{data.location}</InfoBlock>
        <InfoBlock label="Chairperson">{data.chair}</InfoBlock>
        <InfoBlock label="Company Secretary">{data.secretary}</InfoBlock>
      </div>
      <SectionTitle>Attendees</SectionTitle>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: GREEN }}><th style={thStyle}>Name</th><th style={thStyle}>Role</th><th style={{ ...thStyle, width: 128 }}>Attendance</th></tr></thead>
        <tbody>
          {attendees.map((a, i) => (
            <tr key={i} style={{ background: i % 2 ? '#f7f5ef' : '#fff' }}>
              <td style={tdStyle}>{a.name}</td><td style={tdStyle}>{a.role}</td><td style={tdStyle}>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SectionTitle>Agenda & Decisions</SectionTitle>
      <ol style={{ paddingLeft: 20, fontSize: 11, lineHeight: 1.9 }}>{agenda.map((a, i) => <li key={i}>{a}</li>)}</ol>
      <SectionTitle>Resolutions Passed</SectionTitle>
      <div style={{ fontSize: 11, whiteSpace: 'pre-line', borderLeft: `4px solid ${GOLD}`, paddingLeft: 12, paddingTop: 4, paddingBottom: 4 }}>{data.resolutions_passed}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32, alignItems: 'flex-end' }}>
        <InfoBlock label="Next Meeting">{fmtDateLong(data.next_meeting)}</InfoBlock>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 18 }}>{data.authorized_signatory}</div>
          <div style={{ borderTop: '1px solid #999', paddingTop: 4, marginTop: 4, fontSize: 10 }}>Chairperson — Authorized Signature</div>
        </div>
      </div>
    </>
  )
}

function ResolutionBody({ data }) {
  const votes = data.votes || []
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: GREEN, margin: 0 }}>BOARD RESOLUTION</h1>
        <div style={{ fontSize: 11, marginTop: 4, color: '#555' }}>{data.document_number} · {data.meeting_reference}</div>
        <div style={{ fontWeight: 600, marginTop: 8, fontSize: 13 }}>{data.document_title}</div>
        <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>Dated: {fmtDateLong(data.document_date)}</div>
      </div>
      <SectionTitle>Preamble</SectionTitle>
      <div style={{ fontSize: 11.5, lineHeight: 1.7, textAlign: 'justify', fontStyle: 'italic', color: '#333' }}>{data.preamble}</div>
      <SectionTitle>Resolved</SectionTitle>
      <div style={{ fontSize: 12, lineHeight: 1.7, textAlign: 'justify', fontWeight: 500, borderLeft: `4px solid ${GOLD}`, paddingLeft: 12, paddingTop: 4, paddingBottom: 4 }}>{data.resolution_text}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20 }}>
        <InfoBlock label="Proposed By">{data.proposed_by}</InfoBlock>
        <InfoBlock label="Seconded By">{data.seconded_by}</InfoBlock>
      </div>
      <SectionTitle>Voting Record</SectionTitle>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: GREEN }}><th style={thStyle}>Voter</th><th style={thStyle}>Role</th><th style={{ ...thStyle, width: 96 }}>Vote</th></tr></thead>
        <tbody>
          {votes.map((v, i) => (
            <tr key={i} style={{ background: i % 2 ? '#f7f5ef' : '#fff' }}>
              <td style={tdStyle}>{v.voter}</td><td style={tdStyle}>{v.role}</td>
              <td style={{ ...tdStyle, fontWeight: 600, color: v.vote === 'For' ? GREEN : v.vote === 'Against' ? '#b91c1c' : '#92760c' }}>{v.vote}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'right', marginTop: 40 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 20 }}>{data.authorized_signatory}</div>
        <div style={{ borderTop: '1px solid #999', paddingTop: 4, marginTop: 4, fontSize: 10, display: 'inline-block', padding: '4px 32px 0' }}>Chairperson</div>
      </div>
    </>
  )
}

function ShipmentBody({ data }) {
  const items = data.items || []
  const total = items.reduce((s, i) => s + Number(i.amount ?? 0), 0)
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: GREEN, margin: 0 }}>SHIPMENT SUMMARY</h1>
        <div style={{ fontSize: 11, textAlign: 'right' }}>
          <div style={{ fontWeight: 600 }}>{data.document_number}</div>
          <div style={{ color: '#555' }}>{fmtDateLong(data.document_date)}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16 }}>
        <InfoBlock label="Consignee">{data.consignee}</InfoBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <InfoBlock label="Port of Loading">{data.port_of_loading}</InfoBlock>
          <InfoBlock label="Port of Discharge">{data.port_of_discharge}</InfoBlock>
          <InfoBlock label="Incoterms">{data.incoterms}</InfoBlock>
        </div>
      </div>
      <SectionTitle>Cargo Manifest</SectionTitle>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: GREEN }}>
          <th style={thStyle}>Description</th><th style={{ ...thStyle, width: 70 }}>HS Code</th>
          <th style={{ ...thStyle, width: 70, textAlign: 'right' }}>Qty</th><th style={{ ...thStyle, width: 48 }}>Unit</th>
          <th style={{ ...thStyle, width: 90, textAlign: 'right' }}>Unit Price</th><th style={{ ...thStyle, width: 100, textAlign: 'right' }}>Amount</th>
        </tr></thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} style={{ background: i % 2 ? '#f7f5ef' : '#fff' }}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{it.description}</td><td style={tdStyle}>{it.hs_code}</td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>{money(it.qty)}</td><td style={tdStyle}>{it.unit}</td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>{money(it.unit_price)}</td><td style={{ ...tdStyle, textAlign: 'right' }}>{money(it.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot><tr style={{ background: GREEN, color: '#fff' }}><td colSpan={5} style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>CONSIGNMENT VALUE</td><td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>USD {money(total)}</td></tr></tfoot>
      </table>
      <div style={{ marginTop: 16, fontSize: 10.5, color: '#444' }}>{data.remarks}</div>
      <div style={{ textAlign: 'right', marginTop: 40 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 18 }}>{data.authorized_signatory}</div>
        <div style={{ borderTop: '1px solid #999', paddingTop: 4, marginTop: 4, fontSize: 10, display: 'inline-block', padding: '4px 32px 0' }}>Dispatch Authorization</div>
      </div>
    </>
  )
}

export function renderBody(template, data) {
  switch (template.id) {
    case 'invoice': return <InvoiceBody data={data} />
    case 'meeting_minutes': return <MinutesBody data={data} />
    case 'board_resolution': return <ResolutionBody data={data} />
    case 'shipment_summary': return <ShipmentBody data={data} />
    default: return <InvoiceBody data={data} />
  }
}
