import { Link } from "react-router-dom";

import Header from "../shared/Header";
import Searchbar from "../shared/Searchbar";
import Navigation from "../shared/Navigation";

import "./home.scss";

const Home = () => {
	return (
		<main className="home">
			<Header>Home</Header>
			<section className="searchbarWrapper">
				<Link to="/filter" id="filterIcon"></Link>
				<Searchbar />
			</section>
			<Navigation />
		</main>
	);
};

export default Home;
