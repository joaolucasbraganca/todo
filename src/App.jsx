import { useState } from 'react'
import './App.css'

const FILTERS = ['Todas', 'Ativas', 'Concluídas']

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('Todas')

  function addTask() {
    const text = input.trim()
    if (!text) return
    setTasks([...tasks, { id: Date.now(), text, done: false }])
    setInput('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  const filtered = tasks.filter(t => {
    if (filter === 'Ativas') return !t.done
    if (filter === 'Concluídas') return t.done
    return true
  })

  const remaining = tasks.filter(t => !t.done).length

  return (
    <div className="app">
      <h1 className="title">Lista de Tarefas</h1>

      <div className="input-row">
        <input
          className="task-input"
          type="text"
          placeholder="Nova tarefa..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={addTask}>Adicionar</button>
      </div>

      <div className="filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {filtered.length === 0 && (
          <li className="empty">Nenhuma tarefa aqui.</li>
        )}
        {filtered.map(task => (
          <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="task-checkbox"
            />
            <span className="task-text">{task.text}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>✕</button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <p className="summary">
          {remaining} tarefa{remaining !== 1 ? 's' : ''} restante{remaining !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
