import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import SquareButtonLight from "../shared/buttons/SquareButtonLight";
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

	const logout = async () => {
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
				<form>
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

			{/* 			<section>
				<h3>Name </h3>
				<p>
					{userDaten?.user?.firstname} {userDaten?.user?.lastname}{" "}
				</p>
				<h3>Email </h3>
				<p>{userDaten?.user?.email}</p>
				<h3>Shipping Adresse</h3>
				<p>{userDaten?.user?.address?.street}</p>
				<p>{userDaten?.user?.address?.number}</p>
				<p>{userDaten?.user?.address?.zipCode}</p>
				<p>{userDaten?.user?.address?.city}</p>
				<h3>Phone Number</h3>
				<p>{userDaten?.user?.phone}</p>
				<button onClick={logout}>Logout</button>
			</section> */}

			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						placeholder={`${userDaten?.user?.firstname} ${userDaten?.user?.lastname}`}
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
					<input
						type="text"
						name="street"
						placeholder={userDaten?.user?.address?.street}
					/>
					<input
						type="text"
						name="number"
						placeholder={userDaten?.user?.address?.number}
					/>
					<input
						type="text"
						name="zipCode"
						placeholder={userDaten?.user?.address?.zipCode}
					/>
					<input
						type="text"
						name="city"
						placeholder={userDaten?.user?.address?.city}
					/>
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
