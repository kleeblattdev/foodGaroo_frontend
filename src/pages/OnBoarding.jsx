import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./onBoarding.scss";

const OnBoarding = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate("/welcome");
		}, 4000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className="onBoarding">
			<div></div>
			<h1>FoodGaroo</h1>
		</main>
	);
};

export default OnBoarding;
