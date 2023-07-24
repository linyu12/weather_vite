import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FetchExample from './api.tsx'
import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FetchExample />
    <App />
  </React.StrictMode>,
)
