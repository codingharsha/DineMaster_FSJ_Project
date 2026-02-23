import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import StoreContextProvider from './Context/StoreContextProvider.jsx'
import App from './App.jsx'
import ErrorProvider from './Context/ErrorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <StoreContextProvider>
          <ErrorProvider>
            <App />
          </ErrorProvider>
        </StoreContextProvider>
    </BrowserRouter>
  </StrictMode>
)
