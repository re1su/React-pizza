import style from "./search.module.scss";
import clear from "../../assets/img/clear.svg";
import React, { useRef, useCallback, useContext, useState } from "react";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice.js"

const Search = () => {
	const dispatch = useDispatch();
	const [localValue, setLocalValue] = useState("");
	const inputRef = useRef();

	const updateSearchValue = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str))
		}, 500),
		[]
	);

	function onClickClear() {
		dispatch(setSearchValue(""))
		setLocalValue("");
		inputRef.current.focus();
	}

	function onChangeInput(e) {
		setLocalValue(e.target.value);
		updateSearchValue(e.target.value);
	}

	return (
		<div className={style.root}>
			{localValue && (
				<img
					className={style.clear}
					onClick={() => onClickClear()}
					width="25px"
					height="25px"
					src={clear}
					alt=""
				/>
			)}
			<input
				ref={inputRef}
				autoFocus
				value={localValue}
				onChange={(e) => onChangeInput(e)}
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
