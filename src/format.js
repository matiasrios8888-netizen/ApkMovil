// Formato de monedas. Pesos argentinos (principal) y dólares (secundaria).

const formatters = {
  ARS: new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
}

// Intl.currency para ARS da "$" y para USD "$US" segun locale; forzamos prefijos claros.
export function formatMoney(amount, currency) {
  const value = Number(amount) || 0
  if (currency === 'USD') {
    return 'US$ ' + value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  // ARS
  return '$ ' + value.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// Devuelve "2026-06" a partir de una fecha ISO
export function monthKey(isoDate) {
  return isoDate.slice(0, 7)
}

export function monthLabel(key) {
  const [year, month] = key.split('-')
  return `${MONTHS_ES[Number(month) - 1]} ${year}`
}

export function todayISO() {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d - tz).toISOString().slice(0, 10)
}
