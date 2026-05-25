import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { PageHeader, KpiCard, DataTable, StatusBadge, SectionCard, Badge } from '../../shared/ui.jsx'
import { TEMPLATES, CATEGORY_COLORS } from './templates/registry.js'
import { draftStore } from './draft-store.js'
import Editor from './Editor.jsx'

// ---------------- Dashboard ----------------
function Dashboard() {
  const navigate = useNavigate()
  const [drafts, setDrafts] = useState([])
  useEffect(() => { draftStore.list().then(setDrafts) }, [])

  const draftCount = drafts.filter(d => d.status === 'draft').length
  const pending = drafts.filter(d => d.status === 'pending_signature').length
  const approved = drafts.filter(d => d.status === 'approved').length

  return (
    <>
      <PageHeader title="Documentation & Governance" subtitle="Drafts, templates & document vault"
        actions={<button className="btn primary" onClick={() => navigate('/w/documentation/templates')}><Icons.FilePlus size={15} /> New Document</button>} />
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <KpiCard label="Total Documents" value={drafts.length} sub="In system" icon={Icons.Archive} tone="blue" />
        <KpiCard label="Drafts" value={draftCount} sub="In progress" icon={Icons.FileEdit} tone="amber" />
        <KpiCard label="Pending Signature" value={pending} sub="Awaiting" icon={Icons.PenTool} tone="amber" />
        <KpiCard label="Templates" value={TEMPLATES.length} sub="Available" icon={Icons.LayoutTemplate} tone="gray" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <SectionCard title="Recent Drafts" action={<button className="btn" onClick={() => navigate('/w/documentation/drafts')}>View all</button>}>
          {drafts.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center' }} className="muted">
              No drafts yet. <button className="btn" style={{ marginLeft: 8 }} onClick={() => navigate('/w/documentation/templates')}>Create one</button>
            </div>
          ) : (
            <DataTable
              columns={[
                { key: 'title', label: 'Document', render: (r) => <span style={{ fontWeight: 600 }}>{r.title}</span> },
                { key: 'templateName', label: 'Template' },
                { key: 'updatedAt', label: 'Updated', render: (r) => new Date(r.updatedAt).toLocaleDateString() },
                { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
                { key: 'open', label: '', render: (r) => <button className="btn" onClick={() => navigate(`/w/documentation/editor/${r.templateId}?draft=${r.id}`)}>Open</button> },
              ]}
              rows={drafts.slice(0, 6)}
            />
          )}
        </SectionCard>
        <SectionCard title="Quick Start — Templates">
          {TEMPLATES.map(t => (
            <button key={t.id} onClick={() => navigate(`/w/documentation/editor/${t.id}`)}
              style={{ width: '100%', textAlign: 'left', border: '1px solid var(--border)', borderRadius: 8, padding: 12, marginBottom: 8, background: '#fff', cursor: 'pointer' }}>
              <div className="row between">
                <span style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</span>
                <Badge tone="gray">{t.category}</Badge>
              </div>
            </button>
          ))}
        </SectionCard>
      </div>
    </>
  )
}

// ---------------- Template Gallery ----------------
function TemplateGallery() {
  const navigate = useNavigate()
  return (
    <>
      <PageHeader title="Document Templates" subtitle="Select a template to open the editor" />
      <div className="grid-cards">
        {TEMPLATES.map(t => {
          const color = CATEGORY_COLORS[t.category] || '#475467'
          return (
            <div key={t.id} className="card" style={{ overflow: 'hidden' }}>
              <div style={{ height: 4, background: color }} />
              <div style={{ padding: 18 }}>
                <div className="row between" style={{ marginBottom: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 9, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icons.FileText size={21} color={color} />
                  </div>
                  <Badge tone="gray">{t.category}</Badge>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                <p className="muted" style={{ fontSize: 12.5, marginTop: 6, lineHeight: 1.5, minHeight: 54 }}>{t.description}</p>
                <button className="btn primary" style={{ width: '100%', marginTop: 8 }} onClick={() => navigate(`/w/documentation/editor/${t.id}`)}>
                  <Icons.PenLine size={14} /> Open Editor
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ---------------- Drafts list ----------------
function Drafts() {
  const navigate = useNavigate()
  const [drafts, setDrafts] = useState([])
  const reload = () => draftStore.list().then(setDrafts)
  useEffect(() => { reload() }, [])

  const handleDelete = async (id) => {
    await draftStore.remove(id)
    reload()
  }
  const handleStatus = async (id, status) => {
    await draftStore.setStatus(id, status)
    reload()
  }

  return (
    <>
      <PageHeader title="Drafts & Documents" subtitle={`${drafts.length} saved`}
        actions={<button className="btn primary" onClick={() => navigate('/w/documentation/templates')}><Icons.FilePlus size={15} /> New</button>} />
      {drafts.length === 0 ? (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <Icons.FileX size={40} color="#98a2b3" style={{ margin: '0 auto 14px' }} />
          <p className="muted">No saved drafts yet.</p>
          <button className="btn primary" style={{ marginTop: 12 }} onClick={() => navigate('/w/documentation/templates')}>Create your first document</button>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: 'title', label: 'Document', render: (r) => <span style={{ fontWeight: 600 }}>{r.title}</span> },
            { key: 'templateName', label: 'Template' },
            { key: 'id', label: 'Ref', render: (r) => <span style={{ fontFamily: 'monospace', fontSize: 11 }}>{r.id}</span> },
            { key: 'updatedAt', label: 'Updated', render: (r) => new Date(r.updatedAt).toLocaleString() },
            { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
            { key: 'actions', label: 'Actions', render: (r) => (
              <div className="row gap-2">
                <button className="btn" style={{ padding: '5px 8px' }} onClick={() => navigate(`/w/documentation/editor/${r.templateId}?draft=${r.id}`)} title="Edit"><Icons.PenLine size={14} /></button>
                {r.status === 'draft' && <button className="btn" style={{ padding: '5px 8px' }} onClick={() => handleStatus(r.id, 'pending_signature')} title="Send for signature"><Icons.Send size={14} /></button>}
                {r.status === 'pending_signature' && <button className="btn" style={{ padding: '5px 8px' }} onClick={() => handleStatus(r.id, 'approved')} title="Approve"><Icons.CheckCircle2 size={14} color="#16a34a" /></button>}
                <button className="btn" style={{ padding: '5px 8px' }} onClick={() => handleDelete(r.id)} title="Delete"><Icons.Trash2 size={14} color="#b42318" /></button>
              </div>
            ) },
          ]}
          rows={drafts}
        />
      )}
    </>
  )
}

// ---------------- Vault ----------------
function Vault() {
  const navigate = useNavigate()
  const [drafts, setDrafts] = useState([])
  useEffect(() => { draftStore.list().then(setDrafts) }, [])
  const approved = drafts.filter(d => d.status === 'approved')
  return (
    <>
      <PageHeader title="Document Vault" subtitle={`${approved.length} approved documents`} />
      {approved.length === 0 ? (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <Icons.Archive size={40} color="#98a2b3" style={{ margin: '0 auto 14px' }} />
          <p className="muted">No approved documents yet. Approve drafts to file them here.</p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: 'title', label: 'Document' }, { key: 'templateName', label: 'Type' },
            { key: 'id', label: 'Ref', render: (r) => <span style={{ fontFamily: 'monospace', fontSize: 11 }}>{r.id}</span> },
            { key: 'updatedAt', label: 'Filed', render: (r) => new Date(r.updatedAt).toLocaleDateString() },
            { key: 'open', label: '', render: (r) => <button className="btn" onClick={() => navigate(`/w/documentation/editor/${r.templateId}?draft=${r.id}`)}>View / Export</button> },
          ]}
          rows={approved}
        />
      )}
    </>
  )
}

// ---------------- Exports landing ----------------
function Exports() {
  const navigate = useNavigate()
  return (
    <>
      <PageHeader title="PDF Exports" subtitle="Open any template or draft and export a pixel-faithful PDF" />
      <div className="grid-cards">
        {TEMPLATES.map(t => (
          <div key={t.id} className="card" style={{ padding: 18 }}>
            <div className="row between"><Icons.FileText size={20} color="#db2777" /><span className="badge green">PDF</span></div>
            <div style={{ fontWeight: 600, marginTop: 10 }}>{t.name}</div>
            <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>{t.category}</div>
            <button className="btn" style={{ marginTop: 12, width: '100%' }} onClick={() => navigate(`/w/documentation/editor/${t.id}`)}>
              <Icons.FileDown size={14} /> Open & Export
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default function Documentation() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="templates" element={<TemplateGallery />} />
      <Route path="editor/:templateId" element={<Editor />} />
      <Route path="drafts" element={<Drafts />} />
      <Route path="vault" element={<Vault />} />
      <Route path="exports" element={<Exports />} />
    </Routes>
  )
}
