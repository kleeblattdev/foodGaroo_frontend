//library import
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

//scss import
import "./navigation.scss";
import ProductDetail from "../pages/ProductDetail";

const Navigation = () => {
	const [cartCount, setCartCount] = useState();
	const [reload, setReload] = useState(false);

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const getCartCount = async () => {
		try {
			const result = await fetch(url + "/cart/count", {
				method: "GET",
				credentials: "include",
			});
			const data = await result.json();
			setCartCount(data.count);
		} catch (error) {
			console.log(error);
		}
	};




	useEffect(() => {
		getCartCount();
	}, []);  // reload

	return (
		<nav className="navigation">
			<NavLink to="/home" id="home">
				Home
			</NavLink>
			<NavLink to="/orders" id="orders">
				Orders
			</NavLink>
			<NavLink to="/userCart" id="myCart">
				<p key={uuidv4()}>{cartCount}</p>
			</NavLink>
			<NavLink to="/wishlist" id="wishlist">
				Wishlist
			</NavLink>
			<NavLink to="/profile" id="profile">
				Profile
			</NavLink>
{/* 			<ProductDetail reload={reload} setReload={setReload}  ></ProductDetail>
 */}		</nav>

	);
};

export default Navigation;
