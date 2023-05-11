import { useRef } from "react";
import "./searchbar.scss";

const Searchbar = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const searchRef = useRef();

	const handleSearch = () => {
		fetch(
			url + "/search?search=" + searchRef.current.value + "&offset=0&limit=20"
		)
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

	return (
		<section className="searchbar">
			<input
				type="text"
				placeholder="Search for product"
				ref={searchRef}
				onChange={handleSearch}
			/>
		</section>
	);
};

export default Searchbar;
