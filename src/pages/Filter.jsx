
import Header from "../shared/Header";
import "./filter.scss";
import { useState, useEffect, useRef } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { useNavigate } from "react-router-dom";
import SquareButtonLight from "../shared/buttons/SquareButtonLight";


const Filter = () => {

	const nav = useNavigate();
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION


	const [minValue, set_minValue] = useState(25);
	const [maxValue, set_maxValue] = useState(400);
	const handleInput = (e) => {
		set_minValue(e.minValue);
		setPriceFrom(e.minValue);
		set_maxValue(e.maxValue);
		setPriceTo(e.maxValue);
	};

	const [aktivButton, setAktivButton] = useState(false);
	// lowest, highest, newest, likes, spoonacularScore

	const [priceFrom, setPriceFrom] = useState(0);
	const [priceTo, setPriceTo] = useState(500);
	// inputs von values von slider
	console.log(priceFrom, priceTo)

	const [sortBy, setSortBy] = useState();
	// lowest, highest, newest, likes, spoonacularScore
	console.log(sortBy)


	// ! zum testen
	const category = 'Frozen'
	const badges = 'egg_free'
	const importantBadges = ''


	// offste = 0  limit = 20  => die 1. 20Stk
	const offset = 0
	const limit = 20
	const handelInputToFetch = async (e) => {
		e.preventDefault();
		try {
			const result = await fetch(url + 
				`/filter?sortBy=${sortBy}&priceFrom=${priceFrom}&priceTo=${priceTo}&category=${category}&badges=${badges}&importantBadges=${importantBadges}&offset=${offset}&limit=${limit}`,
				{
					method: 'GET',
					credentials: 'include'
				})
				const data = await result.json()
				console.log(data)
				console.log(data.resultCount)
				console.log(data.resultCursor)
		}
		catch (err) {
			console.log(err)
		}


	}




	return (
		<main className="filter">

			<Header>Filters</Header>
			<form onSubmit={handelInputToFetch}>


				<section>
					<h2>Sort By: nur einer geht zum auswählen </h2>

					<button onClick={() => { setAktivButton('lowest'), setSortBy('lowest') }}
						style={(aktivButton === 'lowest') ? { backgroundColor: 'green' } : { backgroundColor: 'grey' }}

					>Lowest</button>

					<button onClick={() => { setAktivButton('highest'), sortBy('highest') }}
						style={(aktivButton === 'highest') ? { backgroundColor: 'green' } : { backgroundColor: 'grey' }}
					>Highest</button>

					<button onClick={() => { setAktivButton('newest'), sortBy('newest') }}
						style={(aktivButton === 'newest') ? { backgroundColor: 'green' } : { backgroundColor: 'grey' }}
					>Newest</button>

					<button onClick={() => { setAktivButton('likes'), sortBy('likes') }}
						style={(aktivButton === 'likes') ? { backgroundColor: 'green' } : { backgroundColor: 'grey' }}
					>Likes</button>

					<button onClick={() => { setAktivButton('sponnacularScore') , sortBy('sponnacularScore') }}
						style={(aktivButton === 'sponnacularScore') ? { backgroundColor: 'green' } : { backgroundColor: 'grey' }}
					>sponnacular Score</button>
				</section>

				<section>
					<h2>Price:</h2>

					<article style={{ width: "50vw" }} className="slider">

						<MultiRangeSlider style={{ borderRadius: '30px', backgroundColor: 'orange' }} className="slider"
							min={0}
							max={500}
							step={10}
							minValue={minValue}
							maxValue={maxValue}
							onInput={(e) => {
								handleInput(e);
							}}
						/>
					</article>


				</section>

				<section>
					<h2>Category: mehrere auswählen </h2>{/* category */}
					<button>Frozen</button>
					<button>Vegetarian</button>
					<button>Vegan</button>

				</section>

				<section>
					<h2>Inhaltsstoffe: mehrere auswählen</h2> {/* badges */}
					<button>egg_free</button>
					<button>peanut_free</button>
					<button>sugar_free</button>


				</section>

				<section>
					<h2>Allergen: mehrere auswählen</h2>
					<button>organic</button>
					<button>kosher</button>
					<button>no_artificial_flavors</button>


				</section>
				<section  >

							<button onClick={handelInputToFetch}> test-Fetch</button>

					<SquareButtonLight type='submit' onClick={handelInputToFetch}
						style={{ margin: "200px", color: 'red' }}  >Apply</SquareButtonLight>
				</section>
			</form>
		</main>
	);
};

export default Filter;
