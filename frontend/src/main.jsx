// Imports:
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { ThemeProvider } from './context/ThemeProvider.jsx';

///////////////////////////////////////////////////
// Render to DOM:
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
