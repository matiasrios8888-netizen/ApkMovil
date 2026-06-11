import React from 'react'
import { categoryInfo } from '../categories.js'
import { formatMoney } from '../format.js'

export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>🧾</p>
        <p>Sin movimientos este mes.</p>
      </div>
    )
  }

  // mas reciente primero
  const ordered = [...transactions].sort((a, b) => {
    if (a.date === b.date) return b.id.localeCompare(a.id)
    return b.date.localeCompare(a.date)
  })

  return (
    <ul className="tx-list">
      {ordered.map((t) => {
        const cat = categoryInfo(t.category)
        const isGasto = t.type === 'gasto'
        return (
          <li key={t.id} className="tx-item">
            <span className="tx-icon">{cat.icon}</span>
            <div className="tx-body">
              <span className="tx-cat">{cat.label}</span>
              {t.note ? <span className="tx-note">{t.note}</span> : null}
              <span className="tx-date">{t.date}</span>
            </div>
            <div className="tx-right">
              <span className={'tx-amount ' + (isGasto ? 'expense' : 'income')}>
                {isGasto ? '-' : '+'} {formatMoney(t.amount, t.currency)}
              </span>
              <button
                className="tx-delete"
                onClick={() => onDelete(t.id)}
                aria-label="Eliminar"
                title="Eliminar"
              >
                ✕
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
