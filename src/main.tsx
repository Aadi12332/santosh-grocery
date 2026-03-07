import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RoleProvider } from './layout/RoleProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RoleProvider>
    <App />
    </RoleProvider>
  </React.StrictMode>
)
