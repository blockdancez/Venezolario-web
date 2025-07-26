import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// 初始化Firebase
import './config/firebase'
// 初始化iframe保护
import { defaultFrameProtection } from './utils/frameProtection'

// 启动iframe保护
defaultFrameProtection();
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 