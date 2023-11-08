import './App.css';
import Header from './components/Header';
import Categories from './components/Categories'
import './scss/app.scss'
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';

import { useEffect, useState } from 'react';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
  const [pizzaData, setPizzaData] = useState([])

  useEffect(() => {
    fetch('https://654b48cc5b38a59f28eecced.mockapi.io/items')
    .then(response => response.json())
    .then(data => setPizzaData(data))
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzaData.map(item => {
              return <Skeleton key={item.id} {...item} />
            })}
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
