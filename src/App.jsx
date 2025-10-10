import './App.css'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';



function App() {
  const [search, setSearch] = useState('');
  const [totalFilms, setTotalFilms] = useState(0);

  return (
    <BrowserRouter>
      <Navbar onSearch={setSearch} />
      <>
        <Routes>
          <Route
            path="/"
            element={<Home search={search} onTotalFilms={setTotalFilms} />}
          />
          <Route
            path="*"
            element={
              <div className="alert alert-warning mt-5">
                <h2>404 - Page non trouvée</h2>
                <p>Cette page n'existe pas.</p>
              </div>
            }
          />
        </Routes>
      </>
      <Footer totalFilms={totalFilms} />
    </BrowserRouter>
  )
}

export default App;