import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort, { listPopup } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router";

const Home = ({ inputValue }) => {
	const navigate = useNavigate();
	const [pizzaData, setPizzaData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const { selectedCategoryId, selectedPopupSort, currentPage } = useSelector(
		(state) => state.filter
	);

	const pizzas = pizzaData.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
	const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
	const search = inputValue ? `&search=${inputValue}` : "";

	const setSelectedCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	function onChangePage(num) {
		dispatch(setCurrentPage(num));
	}

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = listPopup.find((obj) => obj.sort === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setIsLoading(true);

		axios
			.get(
				`https://654b48cc5b38a59f28eecced.mockapi.io/items?page=${currentPage}&limit=8&${
					selectedCategoryId > 0 ? `category=${selectedCategoryId}` : ""
				}&sortBy=${selectedPopupSort.sort}&order=asc${search}`
			)
			.then((response) => {
				setPizzaData(response.data);
				setIsLoading(false);
			});

		window.scrollTo(0, 0);
	}, [selectedCategoryId, selectedPopupSort.sort, currentPage, search]);

	useEffect(() => {
		const queryString = qs.stringify({
			sortProperty: selectedPopupSort.sort,
			categoryId: selectedCategoryId,
			currentPage,
		});

		navigate(`?${queryString}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategoryId, selectedPopupSort.sort, currentPage]);

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
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
