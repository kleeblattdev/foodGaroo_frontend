import { useEffect, useState } from "react";

import "./wishlistButton.scss";

const WishlistButton = ({ item }) => {   // item is the product object  ganz Object durchreichen {title:"",price."",...}
	const [like, setLike] = useState(false);

	const handleWishlist = () => {
		if (like == true) {
			deleteItemFromWishlistWithFetch();
			return setLike(false)
		}

		else {
			addItemToWishlistWithFetch();
			setLike(true);
		}
	};

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;


	const addItemToWishlistWithFetch = async () => {
		try {
			const result = await fetch(url + '/addWishlist', {
				method: 'POST',
				credentials: 'include',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(item)
			})
			const data = await result.json()
			console.log(data)
		} catch (err) {
			console.log(err)
		}
	}

	const deleteItemFromWishlistWithFetch = async () => {
		try {
			const result = await fetch(url + '/deleteWishlist', {
				method: 'DELETE',
				credentials: 'include',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(item)
			})
			const data = await result.json()
			console.log(data)
		} catch (err) {
			console.log(err)
		}
	}


	// wenn wishlist item bei getWishlist ist dann setLike(true) sonst setLike(false)
	const getWishlistWithFetch = async () => {

		try {
			const result = await fetch(url + '/wishlist', {
				method: 'GET',
				credentials: 'include',
				//headers: { 'content-type': 'application/json' },
			})
			const data = await result.json()
			console.log(data)
			return data
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {

		const fetchDaten = async () => {

			const wishlist = await getWishlistWithFetch()
			// wenn item in wishlist ist dann setLike(true) sonst setLike(false)

			// mit filter durchsucht wishlist.items und item   nach der gleichen _id
			if (wishlist.items.filter((e) => e._id === item._id).length > 0) {
				setLike(true)
			}
			else {
				setLike(false)
			}
		}
		fetchDaten()


	}, [])


	return (
		<button
			onClick={handleWishlist}
			className={like ? "wishBtnActive" : "wishBtnNotActive"}
		></button>
	);
};

export default WishlistButton;
