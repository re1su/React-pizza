import React, { useState } from "react";

const Categories = () => {
	const [selectedCatogory, setSelectedCatogory] = useState();

	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	function handleCategory(index) {
		setSelectedCatogory(index);
	}

	function activeIndex(index) {
		return selectedCatogory === index ? "active" : "";
	}

	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) => {
					return (
						<li
							onClick={() => handleCategory(index)}
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
