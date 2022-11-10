import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SearchPage />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
