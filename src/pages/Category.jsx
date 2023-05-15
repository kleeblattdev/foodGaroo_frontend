//library import
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// component import
import Header from "../shared/Header";
import Searchbar from "../shared/Searchbar";
import Navigation from "../shared/Navigation";
import ProductItem from "../shared/ProductItem";
import CategoryList from "../shared/CategoryList";
//scss import
import "./category.scss";

const Category = () => {
	// const searchCount = props.location.state.searchCount;
	// const searchResult = props.location.state.searchResult;
	// ! import und durchreichen von den daten aus filter
	const location = useLocation();
	const category = useLocation();

	const [categoryItems, setCategoryItems] = useState();
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	{
		useEffect(() => {
			fetch(
				url +
					`/products?category=${category?.state?.category}&offset=0&limit=20`
			)
				.then((response) => response.json())
				.then((data) => {
					setCategoryItems(data);
					console.log(data);
				});
		}, [category?.state?.category, url]);
	}
	return (
		<main className="category">
			<Header>Category</Header>
			<section className="searchbarWrapper">
				<Link to="/filter" id="filterIcon"></Link>
				<Searchbar />
			</section>
			<CategoryList />
			<Navigation />

			<h4>Results: {location?.state?.searchCount}</h4>
			<section className="productList">
				{categoryItems &&
					categoryItems.map((item) => {
						return <ProductItem key={uuidv4()} item={item} />;
					})}
				{location?.state?.searchResult?.map((item) => {
					return <ProductItem key={uuidv4()} item={item}></ProductItem>;
				})}
			</section>
		</main>
	);
};

export default Category;
