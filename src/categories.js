// Categorias predefinidas. Cada una con emoji y color para identificarla rapido.

export const EXPENSE_CATEGORIES = [
  { id: 'comida', label: 'Comida', icon: '🍽️', color: '#f97316' },
  { id: 'transporte', label: 'Transporte', icon: '🚌', color: '#3b82f6' },
  { id: 'vivienda', label: 'Vivienda / Alquiler', icon: '🏠', color: '#8b5cf6' },
  { id: 'servicios', label: 'Servicios (luz, gas, internet)', icon: '💡', color: '#eab308' },
  { id: 'salud', label: 'Salud', icon: '💊', color: '#ef4444' },
  { id: 'ocio', label: 'Ocio y salidas', icon: '🎉', color: '#ec4899' },
  { id: 'compras', label: 'Compras', icon: '🛍️', color: '#14b8a6' },
  { id: 'educacion', label: 'Educación', icon: '📚', color: '#6366f1' },
  { id: 'otros_gasto', label: 'Otros', icon: '📦', color: '#64748b' },
]

export const INCOME_CATEGORIES = [
  { id: 'sueldo', label: 'Sueldo', icon: '💼', color: '#16a34a' },
  { id: 'freelance', label: 'Freelance / Changas', icon: '💻', color: '#0d9488' },
  { id: 'ventas', label: 'Ventas', icon: '🏷️', color: '#65a30d' },
  { id: 'regalo', label: 'Regalo', icon: '🎁', color: '#22c55e' },
  { id: 'otros_ingreso', label: 'Otros', icon: '➕', color: '#10b981' },
]

const ALL = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

export function categoryInfo(id) {
  return ALL.find((c) => c.id === id) || { id, label: id, icon: '•', color: '#64748b' }
}
