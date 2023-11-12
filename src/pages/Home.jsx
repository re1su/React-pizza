import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import axios from "axios";

const Home = ({ inputValue }) => {
	const [pizzaData, setPizzaData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useDispatch();
	const { selectedCategoryId, selectedPopupSort } = useSelector((state) => state.filter);


	const pizzas = pizzaData.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
	const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
	const search = inputValue ? `&search=${inputValue}` : "";


	const setSelectedCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	useEffect(() => {
		setIsLoading(true);

		axios.get(`https://654b48cc5b38a59f28eecced.mockapi.io/items?page=${currentPage}&limit=8&${
			selectedCategoryId > 0 ? `category=${selectedCategoryId}` : ""
		}&sortBy=${selectedPopupSort.sort}&order=asc${search}`).then(response => {
			setPizzaData(response.data)
			setIsLoading(false);
		})

		window.scrollTo(0, 0);
	}, [selectedCategoryId, selectedPopupSort, inputValue, currentPage, search]);

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={selectedCategoryId}
					onClickCategory={(index) => setSelectedCategory(index)}
				/>
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={(num) => setCurrentPage(num)} />
		</div>
	);
};

export default Home;