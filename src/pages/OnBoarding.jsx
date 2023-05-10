import { useState } from "react";
import Splash from "../components/Splash";
import Welcome from "../components/Welcome";

const OnBoarding = () => {
	const [loading, setLoading] = useState(true);

	const splashScreen = () => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);

		if (!loading) return <Splash />;
		else {
			return <Welcome />;
		}
	};

	return (
		<main className="onBoarding">
			<Splash />
			<Welcome />
		</main>
	);
};

export default OnBoarding;
