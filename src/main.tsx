import React from 'react'
import ReactDOM from 'react-dom/client'

import { Toaster } from 'react-hot-toast'

import { App } from './App'

import './global.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toaster
      position="top-left"
      toastOptions={{
        style: {
          background: '#5E60CE',
          color: '#fff',
          fontWeight: 'bold'
        }
      }}
    />
    <App />
  </React.StrictMode>
)
