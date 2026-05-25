import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { getTemplate } from './templates/registry.js'
import { PageShell, renderBody } from './templates/render.jsx'
import { draftStore } from './draft-store.js'
import { exportToPDF } from './export-pdf.js'

function groupFields(fields) {
  const groups = {}
  for (const f of fields) {
    if (!groups[f.group]) groups[f.group] = []
    groups[f.group].push(f)
  }
  return groups
}

// ---------- field editors ----------
function TextField({ field, value, onChange }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <span style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{field.label}</span>
      <input
        type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
        value={value ?? ''}
        onChange={(e) => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
        style={inputStyle}
      />
    </label>
  )
}
function TextAreaField({ field, value, onChange }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <span style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{field.label}</span>
      <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
    </label>
  )
}
function ListField({ field, value, onChange }) {
  const items = value || []
  const update = (i, v) => { const next = [...items]; next[i] = v; onChange(next) }
  const add = () => onChange([...items, ''])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  return (
    <div style={{ marginBottom: 12 }}>
      <span style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{field.label}</span>
      {items.map((item, i) => (
        <div key={i} className="row gap-2" style={{ marginBottom: 6 }}>
          <span className="muted" style={{ fontSize: 12, width: 18 }}>{i + 1}.</span>
          <input value={item} onChange={(e) => update(i, e.target.value)} style={{ ...inputStyle, flex: 1 }} />
          <button onClick={() => remove(i)} className="btn" style={{ padding: '6px 8px' }}><Icons.Trash2 size={14} /></button>
        </div>
      ))}
      <button onClick={add} className="btn" style={{ marginTop: 4 }}><Icons.Plus size={14} /> Add item</button>
    </div>
  )
}
function TableField({ field, value, onChange }) {
  const rows = value || []
  const cols = field.columns || []
  const update = (ri, key, v) => {
    const next = rows.map((r, i) => (i === ri ? { ...r, [key]: v } : r))
    onChange(next)
  }
  const addRow = () => onChange([...rows, Object.fromEntries(cols.map((c) => [c.key, c.type === 'number' ? 0 : '']))])
  const removeRow = (ri) => onChange(rows.filter((_, i) => i !== ri))
  return (
    <div style={{ marginBottom: 12 }}>
      <span style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{field.label}</span>
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 8 }}>
        <table style={{ width: '100%', fontSize: 12 }}>
          <thead>
            <tr>
              {cols.map((c) => <th key={c.key} style={{ padding: '6px 8px', fontSize: 10 }}>{c.label}</th>)}
              <th style={{ width: 32 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {cols.map((c) => (
                  <td key={c.key} style={{ padding: 3 }}>
                    <input
                      type={c.type === 'number' ? 'number' : 'text'}
                      value={row[c.key] ?? ''}
                      onChange={(e) => update(ri, c.key, c.type === 'number' ? Number(e.target.value) : e.target.value)}
                      style={{ ...inputStyle, padding: '5px 7px', fontSize: 12 }}
                    />
                  </td>
                ))}
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => removeRow(ri)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#b42318' }}><Icons.X size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addRow} className="btn" style={{ marginTop: 6 }}><Icons.Plus size={14} /> Add row</button>
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '8px 10px', border: '1px solid var(--border)',
  borderRadius: 6, fontSize: 13, background: '#fff', color: 'var(--text)',
  outline: 'none', boxSizing: 'border-box',
}

export default function Editor() {
  const { templateId } = useParams()
  const [searchParams] = useSearchParams()
  const draftId = searchParams.get('draft')
  const navigate = useNavigate()
  const previewRef = useRef(null)

  const template = useMemo(() => getTemplate(templateId), [templateId])
  const [data, setData] = useState(() => ({ ...template.defaults }))
  const [draftMeta, setDraftMeta] = useState(null)
  const [saving, setSaving] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  const [scale, setScale] = useState(0.62)

  // load existing draft if editing
  useEffect(() => {
    let active = true
    if (draftId) {
      draftStore.get(draftId).then((d) => {
        if (active && d) { setData(d.data); setDraftMeta(d) }
      })
    } else {
      setData({ ...template.defaults })
      setDraftMeta(null)
    }
    return () => { active = false }
  }, [draftId, template])

  const setField = (key, value) => setData((prev) => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    const saved = await draftStore.save({
      id: draftMeta?.id,
      templateId: template.id,
      templateName: template.name,
      title: data.document_title || data.document_number || template.name,
      data,
      status: draftMeta?.status || 'draft',
    })
    setDraftMeta(saved)
    setSaving(false)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1800)
    // reflect draft id in URL without full reload
    if (!draftId) navigate(`/w/documentation/editor/${template.id}?draft=${saved.id}`, { replace: true })
  }

  const handleExport = () => {
    exportToPDF(previewRef.current, data.document_number || template.name)
  }

  const groups = groupFields(template.fields)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* toolbar */}
      <div className="row between" style={{ marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <button onClick={() => navigate('/w/documentation/templates')} className="btn" style={{ marginBottom: 8 }}>
            <Icons.ArrowLeft size={14} /> Templates
          </button>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>{template.name}</h1>
          <p className="muted" style={{ fontSize: 13 }}>
            {draftMeta ? `Draft ${draftMeta.id} · saved ${new Date(draftMeta.updatedAt).toLocaleString()}` : 'New document — unsaved'}
          </p>
        </div>
        <div className="row gap-2">
          <button onClick={handleSave} className="btn" disabled={saving}>
            {saving ? <Icons.Loader2 size={15} className="spin" /> : savedFlash ? <Icons.Check size={15} color="#16a34a" /> : <Icons.Save size={15} />}
            {savedFlash ? 'Saved' : 'Save Draft'}
          </button>
          <button onClick={handleExport} className="btn primary"><Icons.FileDown size={15} /> Export PDF</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 20, flex: 1, minHeight: 0 }}>
        {/* form panel */}
        <div className="card" style={{ padding: 18, overflowY: 'auto' }}>
          <div className="row gap-2" style={{ marginBottom: 14 }}>
            <Icons.FormInput size={16} color="#db2777" />
            <strong style={{ fontSize: 14 }}>Document Fields</strong>
          </div>
          {Object.entries(groups).map(([group, fields]) => (
            <div key={group} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: '#98a2b3', marginBottom: 10, paddingBottom: 5, borderBottom: '1px solid var(--border)' }}>{group}</div>
              {fields.map((field) => {
                const value = data[field.key]
                if (field.type === 'textarea') return <TextAreaField key={field.key} field={field} value={value} onChange={(v) => setField(field.key, v)} />
                if (field.type === 'list') return <ListField key={field.key} field={field} value={value} onChange={(v) => setField(field.key, v)} />
                if (field.type === 'table') return <TableField key={field.key} field={field} value={value} onChange={(v) => setField(field.key, v)} />
                return <TextField key={field.key} field={field} value={value} onChange={(v) => setField(field.key, v)} />
              })}
            </div>
          ))}
        </div>

        {/* live preview */}
        <div style={{ background: '#525659', borderRadius: 10, overflow: 'auto', position: 'relative' }}>
          <div className="row between" style={{ position: 'sticky', top: 0, zIndex: 2, padding: '8px 14px', background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(4px)' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Live Preview — exports exactly as shown</span>
            <div className="row gap-2">
              <button onClick={() => setScale((s) => Math.max(0.4, s - 0.1))} style={zoomBtn}><Icons.Minus size={14} /></button>
              <span style={{ color: '#fff', fontSize: 12, minWidth: 40, textAlign: 'center' }}>{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale((s) => Math.min(1, s + 0.1))} style={zoomBtn}><Icons.Plus size={14} /></button>
            </div>
          </div>
          <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
              <div ref={previewRef}>
                <PageShell data={data} templateName={template.name}>
                  {renderBody(template, data)}
                </PageShell>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const zoomBtn = {
  width: 28, height: 24, borderRadius: 5, border: 'none', background: 'rgba(255,255,255,.15)',
  color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
}
