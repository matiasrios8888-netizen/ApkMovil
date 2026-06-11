import React, { useState } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../categories.js'
import { todayISO } from '../format.js'

export default function AddTransaction({ onAdd }) {
  const [type, setType] = useState('gasto')
  const [currency, setCurrency] = useState('ARS')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].id)
  const [note, setNote] = useState('')
  const [date, setDate] = useState(todayISO())

  const categories = type === 'gasto' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

  function changeType(newType) {
    setType(newType)
    const list = newType === 'gasto' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES
    setCategory(list[0].id)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const value = parseFloat(String(amount).replace(',', '.'))
    if (!value || value <= 0) {
      alert('Ingresá un monto válido mayor a cero.')
      return
    }
    onAdd({
      type,
      currency,
      amount: value,
      category,
      note: note.trim(),
      date,
    })
    // reset del monto y nota; mantenemos tipo/moneda/categoria para cargar rapido
    setAmount('')
    setNote('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="toggle-group">
        <button
          type="button"
          className={'toggle ' + (type === 'gasto' ? 'active expense' : '')}
          onClick={() => changeType('gasto')}
        >
          🔴 Gasto
        </button>
        <button
          type="button"
          className={'toggle ' + (type === 'ingreso' ? 'active income' : '')}
          onClick={() => changeType('ingreso')}
        >
          🟢 Ingreso
        </button>
      </div>

      <label className="field">
        <span>Monto</span>
        <div className="amount-row">
          <select
            className="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="ARS">$ ARS</option>
            <option value="USD">US$ USD</option>
          </select>
          <input
            type="number"
            inputMode="decimal"
            step="any"
            min="0"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoFocus
          />
        </div>
      </label>

      <label className="field">
        <span>Categoría</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Fecha</span>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>

      <label className="field">
        <span>Nota (opcional)</span>
        <input
          type="text"
          placeholder="Ej: supermercado del barrio"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>

      <button type="submit" className={'submit-btn ' + type}>
        Guardar {type === 'gasto' ? 'gasto' : 'ingreso'}
      </button>
    </form>
  )
}
