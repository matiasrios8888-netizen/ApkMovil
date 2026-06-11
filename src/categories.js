// Categorias predefinidas. Cada una con un emoji para identificarla rapido.

export const EXPENSE_CATEGORIES = [
  { id: 'comida', label: 'Comida', icon: '🍽️' },
  { id: 'transporte', label: 'Transporte', icon: '🚌' },
  { id: 'vivienda', label: 'Vivienda / Alquiler', icon: '🏠' },
  { id: 'servicios', label: 'Servicios (luz, gas, internet)', icon: '💡' },
  { id: 'salud', label: 'Salud', icon: '💊' },
  { id: 'ocio', label: 'Ocio y salidas', icon: '🎉' },
  { id: 'compras', label: 'Compras', icon: '🛍️' },
  { id: 'educacion', label: 'Educación', icon: '📚' },
  { id: 'otros_gasto', label: 'Otros', icon: '📦' },
]

export const INCOME_CATEGORIES = [
  { id: 'sueldo', label: 'Sueldo', icon: '💼' },
  { id: 'freelance', label: 'Freelance / Changas', icon: '💻' },
  { id: 'ventas', label: 'Ventas', icon: '🏷️' },
  { id: 'regalo', label: 'Regalo', icon: '🎁' },
  { id: 'otros_ingreso', label: 'Otros', icon: '➕' },
]

const ALL = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

export function categoryInfo(id) {
  return ALL.find((c) => c.id === id) || { id, label: id, icon: '•' }
}
