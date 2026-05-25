// Pixel-faithful PDF export.
// Clones the rendered .doc-page node into an isolated print window and
// triggers the browser's "Save as PDF". Because the preview uses inline
// styles, the exported PDF matches the on-screen template exactly.

export function exportToPDF(docPageEl, fileName = 'document') {
  if (!docPageEl) return
  const html = docPageEl.outerHTML
  const win = window.open('', '_blank', 'width=900,height=1200')
  if (!win) {
    alert('Please allow pop-ups to export the PDF.')
    return
  }
  win.document.open()
  win.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${fileName}</title>
<style>
  @page { size: A4; margin: 0; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  html, body { margin: 0; padding: 0; background: #fff; }
  .doc-page { box-shadow: none !important; margin: 0 auto !important; }
  @media print { .doc-page { page-break-after: avoid; } }
</style>
</head>
<body>${html}</body>
</html>`)
  win.document.close()
  // Give the new window a tick to lay out, then print
  win.onload = () => {
    setTimeout(() => { win.focus(); win.print() }, 250)
  }
  // Fallback if onload doesn't fire
  setTimeout(() => { try { win.focus(); win.print() } catch {} }, 600)
}
