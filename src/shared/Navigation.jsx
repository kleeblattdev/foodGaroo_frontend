//library import
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

//scss import
import "./navigation.scss";

const Navigation = () => {
	const [cartCount, setCartCount] = useState();

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	useEffect(() => {
		fetch(url + "/cart/count", { method: "GET", credentials: "include" })
			.then((response) => response.json())
			.then((data) => {
				setCartCount(data);
			});
	}, []);

	return (
		<nav className="navigation">
			<NavLink to="/home" id="home">
				Home
			</NavLink>
			<NavLink to="/orders" id="orders">
				Orders
			</NavLink>
			<NavLink to="/userCart" id="myCart">
				<p key={uuidv4()}>{cartCount?.count}</p>
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
