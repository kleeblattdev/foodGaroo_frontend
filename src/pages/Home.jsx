import { Link } from "react-router-dom";
import Header from "../shared/Header";
import Searchbar from "../shared/Searchbar";
import Navigation from "../shared/Navigation";
import CategoryList from "../shared/CategoryList";
import "./home.scss";

const Home = () => {
	return (
		<main className="home">
			<Header>Home</Header>
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
