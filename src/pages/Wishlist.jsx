//library import
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useInfiniteScroll from 'react-infinite-scroll-hook';


//component import
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import WishlistItem from "../components/WishlistItem";
import EmptyWishlist from "../components/EmptyWishlist";

//scss import
import "./wishlist.scss";

const Wishlist = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [wishlistItem, setWishlistItem] = useState([]);
	const [neuRender, setNeuRender] = useState(false);

	const getWishlistWithFetch = async () => {
		try {
			const result = await fetch(url + "/wishlist", {
				method: "GET",
				credentials: "include",
			});
			const data = await result.json();
			setWishlistItem(data);
			console.log(data);
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getWishlistWithFetch();
	}, [neuRender]);




	// infinite scroll
	// import useInfiniteScroll from 'react-infinite-scroll-hook';


	const [loading, setLoading] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [error, setError] = useState(false);

	const loadMore = () => {
		if (!loading) {
			setLoading(true);
			// setTimeout(() => {
			setLoading(false);
			//	}, 2000);
		}
	}

	// dieses Item      mit ref={sentryRef} wird überwacht und das nachladen scrollen wird ausgelöst überwacht
	// deshalb erst am Ende vom .map Item einfügen
	// mit Intersection Observer
	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore: loadMore,
		disabled: !!error,
		rootMargin: '0px 0px 400px 0px',
	})



	return (
		<main className="wishlist">
			<Header>My Wishlist</Header>
			<Navigation />
			{wishlistItem?.items?.length == 0 ? (
				<EmptyWishlist />
			) : (
				<section className="wishlistWrapper"
				>
					{wishlistItem?.items?.map((item) => {
						return (
							<WishlistItem
								key={uuidv4()}
								item={item}
								neuRender={neuRender}
								setNeuRender={setNeuRender}
							></WishlistItem>

						);
					})}
					{/* // infinity scroll */}
					{
						loading && hasNextPage && <p>...Loading</p>}
						{!hasNextPage && <p>End of results</p>}
						{error && <p>Error occurred </p>}
					<div ref={sentryRef}> </div>


				</section>
			)}
		</main>
	);
};

export default Wishlist;
