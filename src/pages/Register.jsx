import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../shared/Logo";

import "./register.scss";

const Register = () => {
	const [email, setEmail] = useState("");

	const emailRef = useRef();
	const passwordRef = useRef();
	const url = import.meta.env.BACKEND_URL + import.meta.env.API_VERSION;
	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			const res = await fetch(url + "/register", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email: emailRef.current.value,
					password: passwordRef.current.value,
				}),
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main className="register">
			<Logo />
			<section>
				<h2>Create New Account</h2>
				<p>Enter Your Details to create account</p>
			</section>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						ref={emailRef}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="your email"
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" ref={passwordRef} placeholder="password" />
				</div>
				<div>
					<label htmlFor="password">Repeat Password</label>
					<input type="password" placeholder="repeat password" />
				</div>
				<button type="submit">Sign Up</button>
			</form>
			<p>
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</main>
	);
};

export default Register;
