import { NavLink } from "react-router-dom";
import "./navigation.scss";
const Navigation = () => {
	return (
		<nav className="navigation">
			<NavLink to="/home" id="home">
				Home
			</NavLink>
			<NavLink to="/orders" id="orders">
				Orders
			</NavLink>
			<NavLink to="myCart" id="myCart"></NavLink>
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
