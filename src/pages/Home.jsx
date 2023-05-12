import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "../shared/Header";
import Searchbar from "../shared/Searchbar";
import Navigation from "../shared/Navigation";

import "./home.scss";

const Home = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const [categories, setCategories] = useState();

	useEffect(() => {
		fetch(url + "/categories")
			.then((res) => res.json())
			.then((data) => {
				setCategories(data);
				console.log(data);
			});
	}, []);

	return (
		<main className="home">
			<Header>Home</Header>
			<section className="searchbarWrapper">
				<Link to="/filter" id="filterIcon"></Link>
				<Searchbar />
			</section>
			<nav className="categories">
				{categories &&
					categories.map((category) => {
						return (
							<Link
								key={uuidv4()}
								to={`/products?category=${category.aisle}&offset=0&limit=20`}
							>
								{category.aisle}
							</Link>
						);
					})}
			</nav>
			<Navigation />
		</main>
	);
};

export default Home;
