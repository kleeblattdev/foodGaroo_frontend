//library import
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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
	const LIMIT = 20;

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [categoryItems, setCategoryItems] = useState([]);

	const [visible, setVisible] = useState(LIMIT);
	const [hasMore, setHasMore] = useState(true);

	const fetchData = () => {
		const newLimit = visible + LIMIT;

		fetch(
			url +
				`/products?category=${category?.state?.category}&offset=${visible}&limit=${LIMIT}&sort=price&order=asc&minPrice=0&maxPrice=100`,
			{
				method: "GET",
				credentials: "include",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setCategoryItems([...categoryItems, ...data]);
				setVisible(newLimit);
				if (data.length === 0 || data.length < LIMIT) {
					setHasMore(false);
				}
			});
	};

	const fetchMoreDataFilter = () => {
		const newLimit = visible + LIMIT;
		fetch(
			url +
				`/filter?sortBy=${location?.state.sortBy}&priceFrom=${location?.state.priceFrom}&priceTo=${location?.state.priceTo}&category=${location?.state.category}&badges=${location?.state.badges}&importantBadges=${location?.state.importantBadges}&offset=${visible}&limit=${LIMIT}`,
			{
				method: "GET",
				credentials: "include",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (
					data.resultCursor.length === 0 ||
					data.resultCursor.length < LIMIT
				) {
					setHasMore(false);
				}
				setCategoryItems((prevItems) => [...prevItems, ...data.resultCursor]);
				setVisible(newLimit);
			})
			.catch((error) => {
				console.log("Error fetching more data:", error);
			});
	};

	useEffect(() => {
		fetch(
			url +
				`/products?category=${category?.state?.category}&offset=0&limit=20&sort=price&order=asc&minPrice=0&maxPrice=1000`,
			{
				method: "GET",
				credentials: "include",
			}
		)
			.then((response) => response.json())
			.then((data) => {
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
			<section className="productList" id="productList">
				<InfiniteScroll
					dataLength={categoryItems.length}
					next={location?.state?.searchResult ? fetchMoreDataFilter : fetchData}
					hasMore={hasMore}
					loader={<h4>Loading...</h4>}
					scrollableTarget="productList"
				>
					{categoryItems.map((item) => (
						<ProductItem key={uuidv4()} item={item} />
					))}
					{location?.state?.searchResult?.map((item) => (
						<ProductItem key={uuidv4()} item={item} />
					))}
				</InfiniteScroll>
			</section>
		</main>
	);
};

export default Category;
