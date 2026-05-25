// ============================================================
// Draft persistence layer.
// Currently backed by localStorage; the async interface mirrors
// a future database/API so swapping the backend later requires
// NO changes in components — only this file.
// ============================================================

const STORAGE_KEY = 'mjdos_doc_drafts'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}
function writeAll(drafts) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts)) } catch {}
}
function uid() {
  return 'DRF-' + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 1000)
}

export const draftStore = {
  // GET /api/documents
  async list() {
    return readAll().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  },

  // GET /api/documents/:id
  async get(id) {
    return readAll().find((d) => d.id === id) || null
  },

  // POST /api/documents  (or PUT when id provided)
  async save(draft) {
    const drafts = readAll()
    const now = new Date().toISOString()
    if (draft.id) {
      const idx = drafts.findIndex((d) => d.id === draft.id)
      const updated = { ...draft, updatedAt: now }
      if (idx >= 0) drafts[idx] = updated
      else drafts.push(updated)
      writeAll(drafts)
      return updated
    }
    const created = {
      ...draft,
      id: uid(),
      createdAt: now,
      updatedAt: now,
      status: draft.status || 'draft',
    }
    drafts.push(created)
    writeAll(drafts)
    return created
  },

  // DELETE /api/documents/:id
  async remove(id) {
    writeAll(readAll().filter((d) => d.id !== id))
    return true
  },

  // PATCH /api/documents/:id/status
  async setStatus(id, status) {
    const drafts = readAll()
    const idx = drafts.findIndex((d) => d.id === id)
    if (idx >= 0) {
      drafts[idx] = { ...drafts[idx], status, updatedAt: new Date().toISOString() }
      writeAll(drafts)
      return drafts[idx]
    }
    return null
  },
}
