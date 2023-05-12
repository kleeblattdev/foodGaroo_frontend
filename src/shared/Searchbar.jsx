import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./searchbar.scss";
import SearchItem from "../components/SearchItem";

const Searchbar = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const searchRef = useRef();
	const [searchItem, setSearchItem] = useState();
	const [searchState, setSearchState] = useState(false);

	const handleSearch = () => {
		fetch(
			url + "/search?search=" + searchRef.current.value + "&offset=0&limit=20"
		)
			.then((res) => res.json())
			.then((data) => {
				setSearchItem(data);
				setSearchState(true);
				console.log(data);
			});
		if (setSearchItem == "") {
			setSearchState(false);
		}
	};

	return (
		<section className="searchbar">
			<input
				type="text"
				placeholder="Search for product"
				ref={searchRef}
				onChange={handleSearch}
			/>
			<div className={searchState ? "showSearchResult" : "hideSearchResult"}>
				<ul>
					{searchItem &&
						searchItem.map((item) => {
							return (
								<SearchItem key={uuidv4()} title={item.title} _id={item._id} />
							);
						})}
				</ul>
			</div>
		</section>
	);
};

export default Searchbar;
