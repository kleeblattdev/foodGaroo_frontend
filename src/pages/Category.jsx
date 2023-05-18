//library import
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useInfiniteScroll from 'react-infinite-scroll-hook'; // infinite scroll

// store import  für infinite scroll
import { useInfinityScrollCategoryZuFilter } from '../store/useInfinityScrollCategoryZuFilter.jsx'
import { setNeuLimit, setNeuOffset, plusNeuLimit, minusNeuLimit, plusNeuOffset, minusNeuOffset, resetNeuLimit, resetNeuOffset } from '../store/useInfinityScrollCategoryZuFilter.jsx'



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

	const [categoryItems, setCategoryItems] = useState([]);
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [offset, setOffset] = useState(0);  // initial scroll
	const [limit, setLimit] = useState(100);  // initial scroll
	// infinite scroll

	const [loading, setLoading] = useState(false);
	const [hasNextPages, setHasNextPages] = useState(true);
	const [error, setError] = useState(false);

	// store import  für infinite scroll
	const setNeuLimit = useInfinityScrollCategoryZuFilter((state) => state.setNeuLimit);
	const setNeuOffset = useInfinityScrollCategoryZuFilter((state) => state.setNeuOffset);
	const plusNeuOffset = useInfinityScrollCategoryZuFilter((state) => state.plusNeuOffset);
	const plusNeuLimit = useInfinityScrollCategoryZuFilter((state) => state.plusNeuLimit);

	useEffect(() => {
		const asyncFetchItems = async () => {
			try {
				const response = await fetch(
					url +
					`/products?category=${category?.state?.category}&offset=${offset}&limit=${limit}&sort=price&order=asc&minPrice=0&maxPrice=10000`,
					{
						method: "GET",
						credentials: "include",
					}
				);
				const data = await response.json();
				// setCategoryItems(data);
				console.log(data);
				setCategoryItems((prevItems) => [...prevItems, ...data]); // infinite scroll
				console.log(data);
				setLoading(false); // infinite scroll
				setHasNextPages(data.length > 0); // infinite scroll
			} catch (err) {
				console.log(err);
				setLoading(false); // infinite scroll
				setError(true); // infinite scroll
			}
		}
		asyncFetchItems();
	}, [category?.state?.category, url, offset, limit]);



	// infinite scroll

	const loadMore = () => {
		if (!loading && hasNextPages) {

			// store aufruf für infinite scroll
			plusNeuOffset()
			console.log(plusNeuOffset)
			plusNeuLimit()
			console.log(plusNeuLimit)

			setLoading(true);
			setOffset((prevOffset) => prevOffset + limit);
			setLimit((prevLimit) => prevLimit + 4);
			// setTimeout(() => {
			setLoading(false);
			//	}, 2000);
		}
	}

	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPages: true,  // sonst geht es mit limit und offset nicht, da wir ja keine page haben
		onLoadMore: loadMore,
		disabled: !!error,
		rootMargin: '0px 0px 400px 0px',
	})

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
				{/* infinity scroll */}
				{
					loading && hasNextPages && <p>...Loading</p>}
				{!hasNextPages && <p>End of results</p>}
				{error && <p>Error occurred </p>}
				<div ref={sentryRef}>				</div>
				{location?.state?.searchResult?.map((item) => {
					return <ProductItem key={uuidv4()} item={item}></ProductItem>;
				})}
				{
					loading && hasNextPages && <p>...Loading</p>}
				{!hasNextPages && <p>End of results</p>}
				{error && <p>Error occurred </p>}
				<div ref={sentryRef}>				</div>
			</section>
		</main>
	);
};

export default Category;
