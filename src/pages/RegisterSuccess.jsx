import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./registerSuccess.scss";
const RegisterSuccess = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate("/login");
		}, 2000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className="registerSuccess">
			<section>
				<article>
					<h2>Welcome FoodGaroo</h2>
					<p>Successfully created your FoodGaroo account</p>
				</article>
			</section>
		</main>
	);
};

export default RegisterSuccess;
