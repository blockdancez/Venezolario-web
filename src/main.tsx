import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// 初始化Firebase
import './config/firebase'
import { initIframeProtection, setAntiEmbedMeta } from './utils/iframe-protection'

// 初始化iframe保护
initIframeProtection()
setAntiEmbedMeta()
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 