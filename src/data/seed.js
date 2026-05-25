// Deterministic PRNG so demo data is stable across renders
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(42)
export const pick = (arr) => arr[Math.floor(rand() * arr.length)]
export const int = (a, b) => Math.floor(rand() * (b - a + 1)) + a
export const money = (n) => '€' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const num = (n) => n.toLocaleString('en-US')
export function daysAgo(n) {
  const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10)
}
export function daysAhead(n) {
  const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10)
}
export { rand }
