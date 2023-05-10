import Logo from "../shared/Logo";
import SquareButtonLight from "../shared/buttons/SquareButtonLight";
import SquareButton from "../shared/buttons/SquareButton";
import Navigation from "../shared/Navigation";

import "./welcome.scss";

const Welcome = () => {
	return (
		<main className="welcome">
			<Logo />
			<h2>Welcome to FoodGaroo</h2>
			<p>Let FoodGaroo hop to it and bring your groceries to you!</p>
			<div>
				<SquareButtonLight link="/register">
					Create New Account
				</SquareButtonLight>
				<SquareButton link="/login">Sign in</SquareButton>
			</div>
		</main>
	);
};

export default Welcome;
