//library import
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

//component import
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import WishlistItem from "../components/WishlistItem";

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
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getWishlistWithFetch();
	}, [neuRender]);


	return (
		<main className="wishlist">
			<Header>My Wishlist</Header>
			<Navigation />
			<section>
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
			</section>
		</main>
	);
};

export default Wishlist;
