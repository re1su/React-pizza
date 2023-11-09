import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss'
import { Route, Routes, } from "react-router-dom";

function App() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="wrapper">
      <Header inputValue={inputValue} setInputValue={setInputValue} />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home inputValue={inputValue} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
