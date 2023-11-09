import React from "react";
import style from "./search.module.scss";
import clear from "../../assets/img/clear.svg";

const Search = ({ setInputValue, inputValue }) => {

	return (
		<div className={style.root}>
			{inputValue && <img
				className={style.clear}
				onClick={() => setInputValue("")}
				width="25px"
				height="25px"
				src={clear}
				alt=""
			/>}
			<input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className={style.search}
				type="text"
				placeholder="Название пиццы..."
			/>

			<button className={style.button}>
				<svg
					height="24px"
					id="Layer_1"
					className={style.icon}
					version="1.1"
					viewBox="0 0 512 512"
					width="24px"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
				</svg>
			</button>
		</div>
	);
};

export default Search;
