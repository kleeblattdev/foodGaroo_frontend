//library import
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

//scss import
import "./navigation.scss";

const Navigation = ({ setNeuRendern, neuRendern }) => {
	const [cartCount, setCartCount] = useState(false);

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const getCartCount = async () => {
		setNeuRendern = false;
		try {
			const result = await fetch(url + "/cart/count", {
				method: "GET",
				credentials: "include",
			});
			const data = await result.json();
			setCartCount(data.count);
			return;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCartCount();

		getCartCount();
	}, []); // reload

	return (
		<nav className="navigation">
			<NavLink to="/home" id="home">
				Home
			</NavLink>
			<NavLink to="/orders" id="orders">
				Orders
			</NavLink>
			<NavLink to="/userCart" id="myCart">
				<p key={uuidv4()}>{cartCount || 0} </p>
			</NavLink>
			<NavLink to="/wishlist" id="wishlist">
				Wishlist
			</NavLink>
			<NavLink to="/profile" id="profile">
				Profile
			</NavLink>
		</nav>
	);
};

export default Navigation;
