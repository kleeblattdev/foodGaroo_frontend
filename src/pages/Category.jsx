//library import
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
/* import InfiniteScroll from "react-infinite-scroll-component"; */

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
	/* 	const LIMIT = 20; */

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [categoryItems, setCategoryItems] = useState([]);

	/* const [visible, setVisible] = useState(LIMIT);
	const [hasMore, setHasMore] = useState(true);

	const fetchData = () => {
		console.log("fetch data");
		const newLimit = visible + LIMIT;
		const dataToAdd = categoryItems.slice(visible, newLimit);

		if (dataToAdd.length > categoryItems.length) {
			fetch(
				url +
					`/products?category=${category?.state?.category}&offset=${newLimit}&limit=${LIMIT}&sort=price&order=asc&minPrice=0&maxPrice=100`,
				{
					method: "GET",
					credentials: "include",
				}
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data.length);
					setCategoryItems(data);
					setCategoryItems([...categoryItems].concat(dataToAdd));
				});
			setVisible(newLimit);
		} else {
			setHasMore(false);
		}
	}; */

	useEffect(() => {
		fetch(
			url +
				`/products?category=${category?.state?.category}&offset=0&limit=20&sort=price&order=asc&minPrice=0&maxPrice=100`,
			{
				method: "GET",
				credentials: "include",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.length);
				setCategoryItems(data);
			});
	}, [category?.state?.category, url]);

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
				{/* 				<InfiniteScroll
					dataLength={categoryItems?.length}
					next={fetchData}
					hasMore={hasMore}
					loader={<h4>Loading...</h4>}
					scrollableTarget="productList"
				> */}
				{categoryItems &&
					categoryItems.map((item) => {
						return <ProductItem key={uuidv4()} item={item} />;
					})}
				{/* 					{location?.state?.searchResult?.map((item) => {
						return <ProductItem key={uuidv4()} item={item}></ProductItem>;
					})} */}
				{/* </InfiniteScroll> */}
			</section>
		</main>
	);
};

export default Category;
