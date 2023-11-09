import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss'
import { Route, Routes, } from "react-router-dom";

export const SearchContext = createContext()

function App() {
  const [inputValue, setInputValue] = useState('')

  return (
    <SearchContext.Provider value={{ inputValue, setInputValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home inputValue={inputValue} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div >
    </SearchContext.Provider>
  );
}

export default App;
