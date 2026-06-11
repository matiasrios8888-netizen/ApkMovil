// Persistencia local: los datos se guardan en el propio telefono (localStorage).
// No hay servidor ni nube: la informacion nunca sale del dispositivo.

const KEY = 'misgastos.transactions.v1'

export function loadTransactions() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function saveTransactions(transactions) {
  localStorage.setItem(KEY, JSON.stringify(transactions))
}

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
