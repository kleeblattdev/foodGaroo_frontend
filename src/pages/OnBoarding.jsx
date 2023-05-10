import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./onBoarding.scss";

const OnBoarding = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate("/welcome");
		}, 4000);
	}, []);

	return (
		<main className="onBoarding">
			<div></div>
			<h1>FoodGaroo</h1>
		</main>
	);
};

export default OnBoarding;
