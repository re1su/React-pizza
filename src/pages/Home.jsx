import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
	const [pizzaData, setPizzaData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch("https://654b48cc5b38a59f28eecced.mockapi.io/items")
			.then((response) => response.json())
			.then((data) => {
				setPizzaData(data);
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: pizzaData.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
			</div>
		</>
	);
};

export default Home;
