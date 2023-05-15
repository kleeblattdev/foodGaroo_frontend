//component import
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import WishlistItem from "../components/WishlistItem";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const Wishlist = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [wishlistItem, setWishlistItem] = useState([])

	const getWishlistWithFetch = async () => {
		try {
			const result = await fetch(url + '/wishlist' , {
				method: 'GET',
				credentials: 'include',
			})
			const data = await result.json()
			console.log(data)
			setWishlistItem(data)
			return data
		}	catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getWishlistWithFetch()
	} , [])

	console.log(wishlistItem)


	return (
		<main className="wishlist">
			<Header>My Wishlist</Header>
			<Navigation />
			<section>
				{wishlistItem?.map((item) => {
					return <WishlistItem key={uuidv4()} item={item}></WishlistItem>;
				})}
{/* 				<WishlistItem  />
 */}			</section>
		</main>
	);
};

export default Wishlist;
