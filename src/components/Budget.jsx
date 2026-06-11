import React, { useMemo } from 'react'
import { totalFixed } from '../budget.js'
import { formatMoney } from '../format.js'
import { categoryInfo } from '../categories.js'
import { useCountUp } from '../useCountUp.js'
import { newId } from '../storage.js'

// Desglose de los gastos variables (lo que NO es fijo) por categoria.
function variableBreakdown(transactions) {
  const gastos = transactions.filter(
    (t) => t.type === 'gasto' && (t.currency || 'ARS') === 'ARS'
  )
  const total = gastos.reduce((s, t) => s + (Number(t.amount) || 0), 0)
  const map = new Map()
  for (const t of gastos) {
    map.set(t.category, (map.get(t.category) || 0) + (Number(t.amount) || 0))
  }
  const items = [...map.entries()]
    .map(([id, amount]) => ({ id, amount, ...categoryInfo(id) }))
    .sort((a, b) => b.amount - a.amount)
  return { total, items }
}

function AnimatedAmount({ value, currency = 'ARS', className }) {
  const v = useCountUp(value)
  return <span className={className}>{formatMoney(Math.round(v), currency)}</span>
}

export default function Budget({ budget, onChange, monthTransactions }) {
  const fijos = totalFixed(budget)
  const disponible = (Number(budget.income) || 0) - fijos
  const { total: gastadoVariable, items } = useMemo(
    () => variableBreakdown(monthTransactions),
    [monthTransactions]
  )
  const restante = disponible - gastadoVariable
  const usado = disponible > 0 ? Math.min(100, (gastadoVariable / disponible) * 100) : 0
  const sobrepasado = gastadoVariable > disponible && disponible > 0

  function setIncome(value) {
    onChange({ ...budget, income: Number(value) || 0 })
  }

  function addFixed() {
    onChange({
      ...budget,
      fixed: [...budget.fixed, { id: newId(), label: '', amount: 0 }],
    })
  }

  function updateFixed(id, patch) {
    onChange({
      ...budget,
      fixed: budget.fixed.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })
  }

  function removeFixed(id) {
    onChange({ ...budget, fixed: budget.fixed.filter((f) => f.id !== id) })
  }

  return (
    <div className="budget">
      {/* Ingreso del plan */}
      <section className="budget-card pop" style={{ animationDelay: '0ms' }}>
        <h3>💰 ¿Cuánto cobrás por mes?</h3>
        <div className="income-input">
          <span className="prefix">$</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="1.200.000"
            value={budget.income || ''}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
      </section>

      {/* Gastos fijos */}
      <section className="budget-card pop" style={{ animationDelay: '70ms' }}>
        <h3>📌 Gastos fijos</h3>
        <p className="muted small">
          Alquiler, servicios, cuotas… lo que pagás sí o sí todos los meses.
        </p>
        <ul className="fixed-list">
          {budget.fixed.map((f) => (
            <li key={f.id} className="fixed-row slide-in">
              <input
                className="fixed-name"
                type="text"
                placeholder="Ej: Alquiler"
                value={f.label}
                onChange={(e) => updateFixed(f.id, { label: e.target.value })}
              />
              <div className="fixed-amount">
                <span>$</span>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="0"
                  value={f.amount || ''}
                  onChange={(e) => updateFixed(f.id, { amount: Number(e.target.value) || 0 })}
                />
              </div>
              <button className="fixed-del" onClick={() => removeFixed(f.id)} aria-label="Quitar">
                ✕
              </button>
            </li>
          ))}
        </ul>
        <button className="add-fixed-btn" onClick={addFixed}>
          + Agregar gasto fijo
        </button>
        {budget.fixed.length > 0 && (
          <div className="fixed-total">
            <span>Total fijos</span>
            <strong>{formatMoney(fijos, 'ARS')}</strong>
          </div>
        )}
      </section>

      {/* Resultado: cuanto te queda libre */}
      <section className="budget-card hero pop" style={{ animationDelay: '140ms' }}>
        <div className="hero-rows">
          <div className="hero-row">
            <span>Ingreso</span>
            <strong className="income">{formatMoney(budget.income || 0, 'ARS')}</strong>
          </div>
          <div className="hero-row">
            <span>− Gastos fijos</span>
            <strong className="expense">{formatMoney(fijos, 'ARS')}</strong>
          </div>
          <div className="hero-divider" />
          <div className="hero-row big">
            <span>Te queda libre</span>
            <AnimatedAmount value={disponible} className="free" />
          </div>
        </div>
      </section>

      {/* En que se va el sobrante */}
      {disponible > 0 && (
        <section className="budget-card pop" style={{ animationDelay: '210ms' }}>
          <h3>🔍 ¿En qué se va lo que te sobra?</h3>

          <div className="progress-head">
            <span>
              Gastaste <strong>{formatMoney(gastadoVariable, 'ARS')}</strong>
            </span>
            <span className={restante >= 0 ? 'pos' : 'neg'}>
              {restante >= 0 ? 'Te queda ' : 'Te pasaste '}
              <strong>{formatMoney(Math.abs(restante), 'ARS')}</strong>
            </span>
          </div>

          <div className={'progress-track' + (sobrepasado ? ' over' : '')}>
            <div className="progress-fill" style={{ width: usado + '%' }} />
          </div>

          {items.length === 0 ? (
            <p className="muted small center" style={{ marginTop: 16 }}>
              Todavía no registraste gastos variables este mes. Cargalos en
              «Agregar» y acá vas a ver en qué se van. ✨
            </p>
          ) : (
            <ul className="cat-bars">
              {items.map((it, i) => {
                const pct = gastadoVariable > 0 ? (it.amount / gastadoVariable) * 100 : 0
                return (
                  <li key={it.id} className="cat-bar" style={{ animationDelay: 60 * i + 'ms' }}>
                    <div className="cat-bar-top">
                      <span className="cat-bar-label">
                        {it.icon} {it.label}
                      </span>
                      <span className="cat-bar-amount">{formatMoney(it.amount, 'ARS')}</span>
                    </div>
                    <div className="cat-bar-track">
                      <div
                        className="cat-bar-fill"
                        style={{ width: pct + '%', background: it.color }}
                      />
                    </div>
                    <span className="cat-bar-pct">{pct.toFixed(0)}%</span>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      )}

      {disponible <= 0 && (budget.income || 0) > 0 && (
        <section className="budget-card warn pop" style={{ animationDelay: '210ms' }}>
          ⚠️ Tus gastos fijos se llevan todo (o más) que tu ingreso. Revisá los
          montos para liberar algo de margen.
        </section>
      )}
    </div>
  )
}
