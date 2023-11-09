import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";


const Home = ({ inputValue }) => {
	const [pizzaData, setPizzaData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedCategory, setSelectedCatogory] = useState(0);
	const [selectedPopup, setSelectedPopup] = useState({
		name: "популярности",
		sort: "rating",
	});
	const pizzas = pizzaData.map((pizza) => (
		<PizzaBlock key={pizza.id} {...pizza} />
	));
	const skeletons = [...new Array(8)].map((_, index) => (
		<Skeleton key={index} />
	));
	const search = inputValue ? `&search=${inputValue}` : "";

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://654b48cc5b38a59f28eecced.mockapi.io/items?page=${currentPage}&limit=8&${
				selectedCategory > 0 ? `category=${selectedCategory}` : ""
			}&sortBy=${selectedPopup.sort}&order=asc${search}`
		)
			.then((response) => response.json())
			.then((data) => {
				setPizzaData(data);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [selectedCategory, selectedPopup, inputValue, currentPage]);

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={selectedCategory}
					onClickCategory={(index) => setSelectedCatogory(index)}
				/>
				<Sort
					value={selectedPopup}
					onClickSort={(sort) => setSelectedPopup(sort)}
				/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={num => setCurrentPage(num)} />
		</div>
	);
};

export default Home;
