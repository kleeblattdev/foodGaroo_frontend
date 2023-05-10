import { useNavigate } from "react-router-dom";
import "./failedLogin.scss";

const FailedLogin = () => {
	const navigate = useNavigate();

	const handleRedirect = () => {
		navigate("/login");
	};

	return (
		<main className="failedLogin" onClick={handleRedirect}>
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
