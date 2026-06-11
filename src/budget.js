// Plan mensual: ingreso esperado y lista de gastos fijos (en pesos / ARS).
// Es tu "mes tipico": se guarda una vez y aplica a todos los meses,
// pero lo podes editar cuando quieras.

const KEY = 'misgastos.budget.v1'

const DEFAULT_BUDGET = {
  income: 0,
  fixed: [], // [{ id, label, amount }]
}

export function loadBudget() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT_BUDGET }
    const data = JSON.parse(raw)
    return {
      income: Number(data.income) || 0,
      fixed: Array.isArray(data.fixed) ? data.fixed : [],
    }
  } catch {
    return { ...DEFAULT_BUDGET }
  }
}

export function saveBudget(budget) {
  localStorage.setItem(KEY, JSON.stringify(budget))
}

export function totalFixed(budget) {
  return budget.fixed.reduce((sum, f) => sum + (Number(f.amount) || 0), 0)
}
