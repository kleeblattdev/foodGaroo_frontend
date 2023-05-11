import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";







const Filter = () => {


	const [minValue, set_minValue] = useState(25);
	const [maxValue, set_maxValue] = useState(400);
	const handleInput = (e) => {
		set_minValue(e.minValue);
		set_maxValue(e.maxValue);
	};



	return (
		<main className="filter">
			<h1>Filter</h1>

			<div className="App">
				<MultiRangeSlider
					min={0}
					max={500}
					step={5}
					minValue={minValue}
					maxValue={maxValue}
					onInput={(e) => {
						handleInput(e);
					}}
				/>
			</div>


			<section>
				<h2>Sort By:</h2>
				<button>Lowest</button>
				<button>Highest</button>
				<button>Newest</button>
			</section>

			<section>
				<h2>Price:</h2>
				<form action="">
					<p></p>
					<label htmlFor="priceFrom">min</label>
					<input type='number' name="priceFrom" placeholder="0" />
					<p>-</p>
					<input type="number" name="priceTo" placeholder="500" />
					<label htmlFor="priceTo">max</label>
				</form>
			</section>

			<section>
				<h2>Category:</h2>{/* category */}
				<button>Frozen</button>
				<button>Vegetarian</button>
				<button>Vegan</button>

			</section>

			<section>
				<h2>Inhaltsstoffe:</h2> {/* badges */}
				<button>egg_free</button>
				<button>peanut_free</button>
				<button>sugar_free</button>


			</section>

			<section>
				<h2>Allergen:</h2>
				<button>organic</button>
				<button>kosher</button>
				<button>no_artificial_flavors</button>

			</section>

		</main>
	);
};

export default Filter;
