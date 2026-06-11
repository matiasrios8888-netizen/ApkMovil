import React from 'react'
import { formatMoney } from '../format.js'

// Calcula totales por moneda (ingreso, gasto, ahorro) para un set de movimientos.
function totalsByCurrency(transactions) {
  const result = {
    ARS: { ingreso: 0, gasto: 0 },
    USD: { ingreso: 0, gasto: 0 },
  }
  for (const t of transactions) {
    const cur = t.currency === 'USD' ? 'USD' : 'ARS'
    if (t.type === 'ingreso') result[cur].ingreso += Number(t.amount) || 0
    else result[cur].gasto += Number(t.amount) || 0
  }
  return result
}

function CurrencyCard({ currency, data }) {
  const ahorro = data.ingreso - data.gasto
  const hayMovimientos = data.ingreso !== 0 || data.gasto !== 0
  if (!hayMovimientos) return null

  return (
    <div className="summary-card">
      <h3>{currency === 'USD' ? 'Dólares (US$)' : 'Pesos ($)'}</h3>
      <div className="summary-row income">
        <span>Ingresos</span>
        <strong>{formatMoney(data.ingreso, currency)}</strong>
      </div>
      <div className="summary-row expense">
        <span>Gastos</span>
        <strong>{formatMoney(data.gasto, currency)}</strong>
      </div>
      <div className={'summary-row saving ' + (ahorro >= 0 ? 'positive' : 'negative')}>
        <span>{ahorro >= 0 ? 'Ahorro' : 'Déficit'}</span>
        <strong>{formatMoney(ahorro, currency)}</strong>
      </div>
    </div>
  )
}

export default function MonthSummary({ transactions }) {
  const totals = totalsByCurrency(transactions)
  const hayAlgo =
    transactions.length > 0 &&
    (totals.ARS.ingreso || totals.ARS.gasto || totals.USD.ingreso || totals.USD.gasto)

  if (!hayAlgo) {
    return (
      <div className="empty-state">
        <p>📊</p>
        <p>No hay movimientos este mes.</p>
        <p className="muted">Agregá un ingreso o un gasto para ver tu resumen.</p>
      </div>
    )
  }

  return (
    <div className="summary">
      <CurrencyCard currency="ARS" data={totals.ARS} />
      <CurrencyCard currency="USD" data={totals.USD} />
    </div>
  )
}
