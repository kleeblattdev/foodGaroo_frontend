//library import
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
//component import
import Header from "../shared/Header";
import Searchbar from "../shared/Searchbar";
import Navigation from "../shared/Navigation";
import CategoryList from "../shared/CategoryList";
import Deals from "../components/Deals";
import "./home.scss";

const Home = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [userName, setUserName] = useState("JonDoe");
	const [deals, setDeals] = useState();

	useEffect(() => {
		fetchUser();
		fetchDeals();
	}, []);
	const fetchUser = async () => {
		try {
			const result = await fetch(url + "/userName", {
				method: "GET",
				credentials: "include",
				headers: { "content-type": "application/json" },
			});
			const data = await result.json();
			setUserName(data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchDeals = async () => {
		try {
			const response = await fetch(url + "/deals", {
				method: "GET",
				credentials: "include",
			});
			const data = await response.json();
			setDeals(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main className="home">
			<Header>Home</Header>
			<h2 id="intro">
				Hello {userName?.firstname || "John Doe"}, find your daily goods.
			</h2>
			<section className="searchbarWrapper">
				<Link to="/filter" id="filterIcon"></Link>
				<Searchbar />
			</section>
			<CategoryList />
			{deals &&
				deals.map((deal) => {
					return <Deals key={uuidv4()} deal={deal} items={deal.items} />;
				})}
			<Navigation />
		</main>
	);
};

export default Home;
