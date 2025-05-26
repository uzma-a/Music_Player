import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PlayerProvider } from './context/PlayerContext'; // ✅ import context

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <PlayerProvider> {/* ✅ Wrap app in provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlayerProvider>
  </React.StrictMode>
);
