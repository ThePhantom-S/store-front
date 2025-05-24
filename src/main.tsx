import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ✅ Import the CartProvider
import { CartProvider } from './hooks/useCart.tsx'; // adjust the path as needed

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <App />
  </CartProvider>
);
