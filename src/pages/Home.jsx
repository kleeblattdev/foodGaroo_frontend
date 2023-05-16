//library import
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//component import
import Header from "../shared/Header";
import Searchbar from "../shared/Searchbar";
import Navigation from "../shared/Navigation";
import CategoryList from "../shared/CategoryList";
import "./home.scss";

const Home = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [userName, setUserName] = useState("JonDoe");

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await fetch(url + "/userName", {
					method: "GET",
					credentials: "include",
					headers: { "content-type": "application/json" },
				});
				const data = await result.json();
				setUserName(data);
				console.log(setUserName);
			} catch (err) {
				console.log(err);
			}
		};
		fetchUser();
	}, []);

	console.log(userName);

	return (
		<main className="home">
			<Header>Home</Header>
			<h2 id="intro">Hello {userName?.firstname}, find your daily goods.</h2>
			<section className="searchbarWrapper">
				<Link to="/filter" id="filterIcon"></Link>
				<Searchbar />
			</section>
			<CategoryList />
			<Navigation />
		</main>
	);
};

export default Home;
