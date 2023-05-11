import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../shared/Logo";

import "./register.scss";
import RoundedButton from "../shared/buttons/RoundedButton";

const Register = () => {
	const [availiableEmail, setAvailiableEmail] = useState(null);
	const [passwordCompare, setPasswordCompare] = useState(null);

	const emailRef = useRef();
	const passwordRef = useRef();
	const repeatPasswordRef = useRef();

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await fetch(url + "/register", {
				method: "POST",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email: emailRef.current.value,
					password: passwordRef.current.value,
				}),
			});
			if (res.ok) {
				navigate("/successRegistration");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleAvailiableEmail = async () => {
		const email = emailRef.current.value;
		if (email.includes("@")) {
			const response = await fetch(url + "/availiable?email=" + email, {
				credentials: "include",
			});

			if (response.ok) return setAvailiableEmail("mailAvailiable");
			return setAvailiableEmail("mailNotAvailiable");
		} else {
			setAvailiableEmail(""); //
		}
	};

	const handleRepeatPassword = () => {
		if (passwordRef.current.value === repeatPasswordRef.current.value) {
			return setPasswordCompare("passwordSame");
		} else if (repeatPasswordRef.current.value === "") {
			setPasswordCompare("");
		} else {
			return setPasswordCompare("passwordNotSame");
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
						onChange={handleAvailiableEmail}
						placeholder="your email"
						className={availiableEmail}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" ref={passwordRef} placeholder="password" />
				</div>
				<div>
					<label htmlFor="password">Repeat Password</label>
					<input
						type="password"
						placeholder="repeat password"
						ref={repeatPasswordRef}
						onChange={handleRepeatPassword}
						className={passwordCompare}
					/>
				</div>
				<RoundedButton type="submit">Sign Up</RoundedButton>
			</form>
			<p>
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</main>
	);
};

export default Register;
