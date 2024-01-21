import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store/store.js';
import { ThemeProvider } from './utils/ThemeProvider.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
 
  <React.StrictMode>

    <Provider store={store}>
      <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      </BrowserRouter>
    </Provider>
   
   
  </React.StrictMode>,
)
