//library import
import { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
//component import
import SquareButtonLight from "../shared/buttons/SquareButtonLight";
import Header from "../shared/Header";
import FilterButton from "../shared/buttons/FilterButton";
//scss import
import "./filter.scss";

const Filter = () => {
	const navigate = useNavigate();
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	// Slider
	const [minValue, set_minValue] = useState(0);
	const [maxValue, set_maxValue] = useState(400);
	const handleInputSlider = (e) => {
		set_minValue(e.minValue);
		setPriceFrom(minValue);
		set_maxValue(e.maxValue);
		setPriceTo(maxValue);
	};

	const [aktivButton, setAktivButton] = useState(false);
	// lowest, highest, newest, likes, spoonacularScore

	const [priceFrom, setPriceFrom] = useState(0);
	const [priceTo, setPriceTo] = useState(1000);
	// inputs von values von slider

	const [sortBy, setSortBy] = useState("lowest");
	// lowest, highest, newest, likes, spoonacularScore

	// eslint-disable-next-line no-unused-vars
	const [searchResult, setSearchResult] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [searchCount, setSearchCount] = useState(0);

	// offste = 0  limit = 20  => die 1. 20Stk
	const offset = 0;
	const limit = 20;
	const importantBadges = "";
	const handelInputToFetch = async (e) => {
		e.preventDefault();
		try {
			const result = await fetch(
				url +
					`/filter?sortBy=${sortBy}&priceFrom=${priceFrom}&priceTo=${priceTo}&category=${category}&badges=${badges}&importantBadges=${importantBadges}&offset=${offset}&limit=${limit}`,
				{
					method: "GET",
					credentials: "include",
				}
			);

			const data = await result.json();

			setSearchResult(data.resultCursor);
			setSearchCount(data.resultCount);

			// das wird jetzt vor zur Seite category geleitet imt den fetch daten
			navigate("/category", {
				state: {
					searchCount: data.resultCount,
					searchResult: data.resultCursor,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	// category per fetch holen und in ein array speichern    dann unten drüber mappen und ausgeben in FilterButton.jsx

	const [categoryArray, setCategoryArray] = useState([]);
	const getCategory = async () => {
		try {
			const result = await fetch(url + "/categories", {
				method: "GET",
				credentials: "include",
			});
			const data = await result.json();
			setCategoryArray(data);
			console.log(data);
		} catch (er) {
			console.log(er);
		}
	};

	const [badgesArray, setBadgesArray] = useState([]);
	const getBadges = async () => {
		try {
			const result = await fetch(url + "/badges", {
				method: "GET",
				credentials: "include",
			});
			const data = await result.json();
			setBadgesArray(data);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	// category

	const [aktivButtonCategory, setAktivButtonCategory] = useState([]);
	const [category, setCategory] = useState([]);
	console.log(aktivButtonCategory);
	console.log(category);
	const handelButtonClickCategory = (item) => {
		if (aktivButtonCategory.includes(item)) {
			// wenn aktivButtonCategory item enthält

			setAktivButtonCategory(aktivButtonCategory.filter((val) => val !== item)); // dann item entfernt aus aktivButtonCategory
			setCategory(aktivButtonCategory.filter((val) => val !== item)); //dann item entfernt aus category
		} else {
			// wenn nicht in der aktivButtonCategory dann
			setAktivButtonCategory([...aktivButtonCategory, item]); // dann item hinzugefügt zu aktivButtonCategory
			setCategory([...aktivButtonCategory, item]); // dann item hinzugefügt zu category
		}
	};

	// badges

	const [aktivButtonBadges, setAktivButtonBadges] = useState([]);
	const [badges, setBadges] = useState([]);
	console.log(aktivButtonBadges);
	console.log(badges);
	const handelButtonClickBadges = (item) => {
		if (aktivButtonBadges.includes(item)) {
			setAktivButtonBadges(aktivButtonBadges.filter((val) => val !== item));
			setBadges(aktivButtonBadges.filter((val) => val !== item));
		} else {
			setAktivButtonBadges([...aktivButtonBadges, item]);
			setBadges([...aktivButtonBadges, item]);
		}
	};

	// count fetch
	const [count, setCount] = useState(0);
	const handelFetchCount = async () => {
		try {
			const result = await fetch(
				url +
					`/filter?sortBy=${sortBy}&priceFrom=${priceFrom}&priceTo=${priceTo}&category=${category}&badges=${badges}&importantBadges=${importantBadges}&offset=${offset}&limit=${limit}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const data = await result.json();
			setCount(data.resultCount);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCategory();
		getBadges();
	}, []);

	// Count holen immer wenn eine Eingabe gemacht wird
	useEffect(() => {
		handelFetchCount();
	}, [sortBy, priceFrom, priceTo, category, badges, importantBadges]);

	return (
		<main className="filter">
			<Header>Filters</Header>
			<section>
				<h2>Sort By: </h2>

				<button
					onClick={() => {
						setAktivButton("lowest"), setSortBy("lowest");
					}}
					className={aktivButton === "lowest" ? "activeBtn" : "regularBtn"}
				>
					Lowest
				</button>

				<button
					onClick={() => {
						setAktivButton("highest"), setSortBy("highest");
					}}
					className={aktivButton === "highest" ? "activeBtn" : "regularBtn"}
				>
					Highest
				</button>

				<button
					onClick={() => {
						setAktivButton("newest"), setSortBy("newest");
					}}
					className={aktivButton === "newest" ? "activeBtn" : "regularBtn"}
				>
					Newest
				</button>

				<button
					onClick={() => {
						setAktivButton("likes"), setSortBy("likes");
					}}
					className={aktivButton === "likes" ? "activeBtn" : "regularBtn"}
				>
					Likes
				</button>

				<button
					onClick={() => {
						setAktivButton("sponnacularScore"), setSortBy("sponnacularScore");
					}}
					className={
						aktivButton === "sponnacularScore" ? "activeBtn" : "regularBtn"
					}
				>
					Rating
				</button>
			</section>

			<section className="price">
				<h2>Price:</h2>
				<p>
					From: {priceFrom} To: {priceTo}
				</p>
				<MultiRangeSlider
					min={0}
					max={1000}
					step={10}
					minValue={minValue}
					maxValue={maxValue}
					onInput={(e) => {
						handleInputSlider(e);
					}}
				/>
				<p></p>
			</section>

			<section>
				<h2>Category:</h2>
				{categoryArray?.map((item) => (
					<FilterButton
						key={uuidv4()}
						item={item}
						onClick={(item) => handelButtonClickCategory(item.aisle)}
						aktivButtonCategory={aktivButtonCategory}
					>
						{item.aisle}
						{/* button name=aisle durchschieben und hinten mit children abgreifen */}
					</FilterButton>
				))}
			</section>

			<section>
				<h2>Ingredients: </h2> {/* badges */}
				{badgesArray?.map((item) => {
					return (
						<FilterButton
							key={uuidv4()}
							item={item}
							onClick={(item) => handelButtonClickBadges(item.type)}
							aktivButtonBadges={aktivButtonBadges}
						>
							{item.type}
						</FilterButton>
					);
				})}
			</section>
			<div className="buttonWrapper">
				<SquareButtonLight onClick={handelInputToFetch}>
					Show {count} results
				</SquareButtonLight>
			</div>
			{/* 
			<h4>Live - Alle Produkte auf die die Eingaben zutreffen:</h4> {count}
			{searchResult?.map((item) => {
				return (
					<SearchItem
						key={uuidv4()}
						title={item.title}
						_id={item._id}
						item={item}
					>
						{" "}
					</SearchItem>
				);
			})} */}
		</main>
	);
};

export default Filter;
