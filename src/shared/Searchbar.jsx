import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./searchbar.scss";

const Searchbar = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const searchRef = useRef();
	const [searchItem, setSearchItem] = useState();

	const handleSearch = () => {
		fetch(
			url + "/search?search=" + searchRef.current.value + "&offset=0&limit=20"
		)
			.then((res) => res.json())
			.then((data) => {
				setSearchItem(data);
				console.log(data);
			});
	};

	return (
		<section className="searchbar">
			<input
				type="text"
				placeholder="Search for product"
				ref={searchRef}
				onChange={handleSearch}
			/>
			{/* 			{searchItem && searchItem.map((item)=>{
			})} */}
		</section>
	);
};

export default Searchbar;
