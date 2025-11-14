import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="App">
      <div className="wrapper">
        <Header search={searchValue} setSearch={setSearchValue} />

        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home search={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
