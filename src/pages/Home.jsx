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
	return (
		<main className="home">
			<Header>Home</Header>
			<h2>Hello, </h2>
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
