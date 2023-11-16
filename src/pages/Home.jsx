import React, { useEffect, useRef, useState } from "react";
import Categories from "../components/Categories";
import Sort, { listPopup } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router";
import { fetchPizza } from "../redux/slices/pizzaSlice";

const Home = ({ inputValue }) => {
	const isSearch = useRef(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isMounted, setIsMounted] = useState(false);
	const { items, status } = useSelector((state) => state.pizza);

	const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

	const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

	const { selectedCategoryId, selectedPopupSort, currentPage, sortBy, searchValue } = useSelector(
		(state) => state.filter
	);
	const search = "&search=" + searchValue
	const sortProperty = selectedPopupSort.sort;

	const setSelectedCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	function onChangePage(num) {
		dispatch(setCurrentPage(num));
	}

	async function getPizzas() {
		dispatch(
			fetchPizza({
				selectedCategoryId,
				currentPage,
				sortBy,
				search,
				sortProperty,
			})
		);
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

			isSearch.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategoryId, sortProperty, currentPage, searchValue, sortBy]);

	useEffect(() => {
		if (isMounted) {
			const queryString = qs.stringify({
				sortProperty: sortProperty,
				categoryId: selectedCategoryId,
				currentPage,
				sortBy,
			});

			navigate(`?${queryString}`);
		}

		setIsMounted(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategoryId, sortProperty, currentPage]);

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
			{status === "rejected" ||pizzas.length === 0 ? (
				<div className="content__error-info">
					<h2>
						Произошла ошибочка 😕
					</h2>
					<p>Попробуйте вернуться позже</p>
				</div>
			) : (
				<div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
