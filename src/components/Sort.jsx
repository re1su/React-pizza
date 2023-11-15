import React, { useState } from "react";
import arrowTop from "../assets/img/arrow-top.svg";
import arrowBottom from "../assets/img/arrow-bottom.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSort, setSortBy } from "../redux/slices/filterSlice";
import { useEffect } from "react";
import { useRef } from "react";

export const listPopup = [
	{ name: "популярности", sort: "rating" },
	{ name: "цене", sort: "price" },
	{ name: "алфавиту", sort: "title" },
];

const Sort = () => {
	const sortRef = useRef();
	const dispatch = useDispatch();
	const [isVisible, setIsVisible] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);
	const sort = useSelector((state) => state.filter.selectedPopupSort) || {
		name: "популярности",
		sort: "rating",
	};

	function handlerSelected(object) {
		return sort.sort === object.sort ? "active" : "";
	}

	function onSelectedPopup(sort) {
		dispatch(setSort(sort));
		setIsVisible(false);
	}

	useEffect(() => {
		setDataLoaded(true);
	}, []);

	useEffect(() => {
		const handleBodyClick = (e) => {
			if (e.target.className) {
				setIsVisible(false);
			}
		};

		document.body.addEventListener("click", handleBodyClick);

		return () => {
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<div className="img">
					<img onClick={() => dispatch(setSortBy("desc"))} width="20px" src={arrowTop} alt="arrowTop" />
				</div>
				<div className="img">
					<img onClick={() => dispatch(setSortBy("asc"))} width="30px" src={arrowBottom} alt="arrowBottom" />
				</div>
				<b>Сортировка по:</b>
				<span onClick={() => setIsVisible((prev) => !prev)}>{sort.name}</span>
			</div>
			{isVisible && (
				<div className="sort__popup">
					<ul>
						{listPopup.map((object, index) => {
							return (
								<li
									key={index}
									onClick={() => onSelectedPopup(object)}
									className={handlerSelected(object)}
								>
									{object.name}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Sort;
