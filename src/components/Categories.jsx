import React, { useState } from "react";

const Categories = ({ value, onClickCategory }) => {
	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	function activeIndex(index) {
		return value === index ? "active" : "";
	}

	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) => {
					return (
						<li
							key={index}
							onClick={() => onClickCategory(index)}
							className={activeIndex(index)}
						>
							{category}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Categories;
