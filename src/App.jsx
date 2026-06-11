import React, { useEffect, useMemo, useState } from 'react'
import { loadTransactions, saveTransactions, newId } from './storage.js'
import { monthKey, monthLabel, todayISO } from './format.js'
import MonthSummary from './components/MonthSummary.jsx'
import AddTransaction from './components/AddTransaction.jsx'
import TransactionList from './components/TransactionList.jsx'

export default function App() {
  const [transactions, setTransactions] = useState(() => loadTransactions())
  const [tab, setTab] = useState('resumen') // 'resumen' | 'agregar' | 'movimientos'
  const [selectedMonth, setSelectedMonth] = useState(() => monthKey(todayISO()))

  // guardar cada vez que cambian los movimientos
  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  // lista de meses con datos + el mes actual, ordenados desc
  const availableMonths = useMemo(() => {
    const set = new Set(transactions.map((t) => monthKey(t.date)))
    set.add(monthKey(todayISO()))
    return [...set].sort((a, b) => b.localeCompare(a))
  }, [transactions])

  const monthTransactions = useMemo(
    () => transactions.filter((t) => monthKey(t.date) === selectedMonth),
    [transactions, selectedMonth]
  )

  function addTransaction(data) {
    const tx = { id: newId(), ...data }
    setTransactions((prev) => [...prev, tx])
    // si cargo en un mes distinto al seleccionado, saltamos a ese mes
    const k = monthKey(data.date)
    if (k !== selectedMonth) setSelectedMonth(k)
    setTab('resumen')
  }

  function deleteTransaction(id) {
    if (!confirm('¿Eliminar este movimiento?')) return
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mis Gastos</h1>
        <select
          className="month-picker"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {availableMonths.map((m) => (
            <option key={m} value={m}>
              {monthLabel(m)}
            </option>
          ))}
        </select>
      </header>

      <main className="content">
        {tab === 'resumen' && <MonthSummary transactions={monthTransactions} />}
        {tab === 'agregar' && <AddTransaction onAdd={addTransaction} />}
        {tab === 'movimientos' && (
          <TransactionList transactions={monthTransactions} onDelete={deleteTransaction} />
        )}
      </main>

      <nav className="tabbar">
        <button
          className={tab === 'resumen' ? 'active' : ''}
          onClick={() => setTab('resumen')}
        >
          <span className="tab-icon">📊</span>
          Resumen
        </button>
        <button
          className={'add-tab ' + (tab === 'agregar' ? 'active' : '')}
          onClick={() => setTab('agregar')}
        >
          <span className="tab-icon">➕</span>
          Agregar
        </button>
        <button
          className={tab === 'movimientos' ? 'active' : ''}
          onClick={() => setTab('movimientos')}
        >
          <span className="tab-icon">🧾</span>
          Movimientos
        </button>
      </nav>
    </div>
  )
}
