import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../shared/Logo";

import "./login.scss";

const Login = () => {
	const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const handleLogin = async (e) => {
		e.preventDefault();
		const body = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		try {
			const response = await fetch(url + "/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(body),
			});
			if (response.ok) return navigate("/Home");
			console.log(response);
			return navigate('/failedLogin')
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<main className="login">
			<Logo />
			<h1>Login</h1>
			<section>
				<form onSubmit={handleLogin}>
					<div>
						<label htmlFor="email">Email</label>
						<input type="email" ref={emailRef} placeholder="your email" />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							placeholder="your password"
							ref={passwordRef}
						/>
					</div>
					<button type="submit">Sign In</button>
				</form>
			</section>
		</main>
	);
};

export default Login;
