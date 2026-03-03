import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Theme appearance='light'>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Theme>
  </StrictMode>,
)
