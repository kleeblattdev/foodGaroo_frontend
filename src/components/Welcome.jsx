import { Link } from "react-router-dom";
import Logo from "../shared/Logo";
import "./welcome.scss";

const Welcome = () => {
	return (
		<main className="welcome">
			<Logo />
			<h2>Welcome to FoodGaroo</h2>
			<p>Let FoodGaroo hop to it and bring your groceries to you!</p>
			<div>
				<Link to="/register">Create New Account</Link>
				<Link to="/login">Sign In</Link>
			</div>
		</main>
	);
};

export default Welcome;
