import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import "./profile.scss";

const Profile = () => {
	const nav = useNavigate();
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const [userDaten, setUserDaten] = useState({});
	const imgRef = useRef();
	const [bildGeladen, setBildGeladen] = useState();
	const [neuRendern, setNeuRendern] = useState(false);

	useEffect(() => {
		getProfile();
		setNeuRendern((prev) => !prev);
	}, []);

	useEffect(() => {
		const bildNeuRendern = async () => {
			const bildUrl = userDaten?.user?.userImg;

			setBildGeladen(bildUrl);
		};
		bildNeuRendern();
	}, [neuRendern]);

	const getProfile = async () => {
		try {
			const result = await fetch(url + "/profile", {
				method: "GET",
				credentials: "include",
				headers: { "content-type": "application/json" },
			});
			const data = await result.json();
			setUserDaten(data);
		} catch (err) {
			console.log(err);
		}
	};

	const bildHochladenZumBackEnd = async (event) => {
		event.preventDefault();

		const form = new FormData();
		form.append("file", imgRef.current.files[0]);
		form.append("name", userDaten?.user?._id);

		try {
			const result = await fetch(url + "/directupload", {
				method: "POST",
				credentials: "include",
				body: form,
			});
			const dataBild = await result.json();
			userDaten.user.userImg = dataBild.url;
			setUserDaten(userDaten);
			setNeuRendern((prev) => !prev);
		} catch (err) {
			console.log(err);
		}
	};

	const logout = async (event) => {
		event.preventDefault();
		try {
			const res = await fetch(url + "/logout", {
				method: "GET",
				credentials: "include",
				headers: { "content-type": "application/json" },
			});
			if (res.ok) {
				nav("/");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main className="profile">
			<Header>My Profile</Header>

			<section className="profileImg">
				{/* 				<img src={bildGeladen} alt="UserBild" />
				 */}
				<img src={userDaten?.user?.userImg} alt="UserBild" />
				<form className="imageForm">
					<input
						ref={imgRef}
						type="file"
						name="file"
						id="fileUpload"
						placeholder="max 1MB"
					/>
					<button onClick={bildHochladenZumBackEnd}></button>
				</form>
			</section>

			<form className="userInfo">
				<div className="name">
					<label htmlFor="name">Firstname</label>
					<input
						type="text"
						name="firstname"
						placeholder={userDaten?.user?.firstname}
					/>
					<label htmlFor="name">Lastname</label>
					<input
						type="text"
						name="lastname"
						placeholder={userDaten?.user?.lastname}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						placeholder={userDaten?.user?.email}
						disabled
					/>
				</div>
				<div>
					<label htmlFor="address">Shipping Address</label>
					<div className="street">
						<label htmlFor="street">Street</label>
						<input
							type="text"
							name="street"
							placeholder={userDaten?.user?.address?.street}
						/>
						<label htmlFor="streetnumber">Street number</label>
						<input
							type="text"
							name="streetnumber"
							placeholder={userDaten?.user?.address?.number}
						/>
					</div>
					<div className="city">
						<label htmlFor="zipCode">Zipcode</label>
						<input
							type="text"
							name="zipCode"
							placeholder={userDaten?.user?.address?.zipCode}
						/>
						<label htmlFor="city">City</label>
						<input
							type="text"
							name="city"
							placeholder={userDaten?.user?.address?.city}
						/>
					</div>
				</div>
				<div>
					<label htmlFor="phone">Phone Number</label>
					<input
						type="number"
						name="phone"
						placeholder={userDaten?.user?.phone}
					/>
				</div>
				<div>
					<button onClick={logout} id="logout">
						Logout
					</button>
				</div>
				<button id="updateProfile">Update Profile</button>
			</form>
			<Navigation />
		</main>
	);
};

export default Profile;
