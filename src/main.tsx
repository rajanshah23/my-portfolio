import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log("🚀 main.tsx is executing!"); // Add this

const container = document.getElementById('root');
if (!container) {
  console.error("❌ Cannot find root element!");
} else {
  console.log("✅ Root element found, rendering React app...");
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
