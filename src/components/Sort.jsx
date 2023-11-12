import React, { useState } from "react";
import arrowTop from "../assets/img/arrow-top.svg";
import arrowBottom from "../assets/img/arrow-bottom.svg"
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

const Sort = () => {
	const dispatch = useDispatch()
	const sort = useSelector(state => state.filter.selectedPopupSort)
	const [isVisible, setIsVisible] = useState(false);
	const listPopup = [
		{ name: "популярности", sort: "rating" },
		{ name: "цене", sort: "price" },
		{ name: "алфавиту", sort: "title" },
	];

	function handlerSelected(object) {
		return sort.sort === object.sort ? "active" : "";
	}

	function onSelectedPopup(sort) {
		dispatch(setSort(sort));
		setIsVisible(false);
	}

	return (
		<div className="sort">
			<div className="sort__label">
				<img className="img" src={arrowTop} alt="arrowTop" />
				<img className="img" src={arrowBottom} alt="arrowBottom" />
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
