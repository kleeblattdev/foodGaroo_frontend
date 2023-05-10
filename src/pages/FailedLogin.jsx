import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./failedLogin.scss";

const FailedLogin = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate("/login");
		}, 4000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className="failedLogin">
			<section>
				<article>
					<h2>Oops...</h2>
					<h2>Something went wrong</h2>
					<p>Login failed:</p>
					<p>Your Email or password is incorrect.</p>
				</article>
			</section>
		</main>
	);
};

export default FailedLogin;
