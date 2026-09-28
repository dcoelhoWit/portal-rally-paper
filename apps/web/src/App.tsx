import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

type Status = 'checking' | 'connected' | 'error'

function App() {
  const [status, setStatus] = useState<Status>('checking')
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ error }) => {
        if (error) throw error
        setStatus('connected')
      })
      .catch((err: Error) => {
        setStatus('error')
        setMessage(err.message)
      })
  }, [])

  return (
    <main>
      <h1>Portal Rally Paper</h1>
      <p>
        Supabase: <strong data-status={status}>{status}</strong>
      </p>
      {message && <p className="error">{message}</p>}
    </main>
  )
}

export default App
