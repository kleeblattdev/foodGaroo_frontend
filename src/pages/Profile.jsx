import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import "./profile.scss";
// import { useHistory } from "react-router-dom";

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
			return data;     // für userInputDatenUpdaten
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


	// Button Update Profile
	const handleUpdateProfile = async (event) => {
		event.preventDefault();
		// ProfilBild extra hochladen 
		// bildHochladenZumBackEnd(event)   // geht nicht, wenn Bild nicht geändert wurde da als antwort kein secUrl kommt und backEnd server abstürzt
		userInputDatenUpdaten(event)

	}

	// Funktion um die UserDaten zu updaten
	const [neuRendernBeiInputs, setNeuRendernBeiInputs] = useState(false)

	const firstnameRef = useRef()
	const lastnameRef = useRef()
	const emailRef = useRef()
	const streetRef = useRef()
	const numberRef = useRef()
	const zipCodeRef = useRef()
	const cityRef = useRef()
	const phoneRef = useRef()

	let firstname = ''
	let lastname = ''
	let email = ''
	let street = ''
	let number = ''
	let zipCode = ''
	let city = ''
	let phone = ''

	// const history = useHistory()

	const userInputDatenUpdaten = async (event) => {
		event.preventDefault()


		// wenn input leer ist, dann den Wert aus der DB nehmen und nicht den leeren Wert
		const getDbProfil = await getProfile()
		const dbUser = await getDbProfil?.user

		// Vergleich ob input leer ist oder nicht und entsprechend den Wert aus der DB oder den Wert aus dem input nehmen
		if (firstnameRef.current.value === "") { firstname = dbUser?.firstname } else { firstname = firstnameRef.current.value }
		if (lastnameRef.current.value === '') { lastname = dbUser?.lastname } else { lastname = lastnameRef.current.value }
		// if (emailRef.current.value === '') { email = dbUser?.email } else { email = emailRef.current.value }
		if (streetRef.current.value === '') { street = dbUser?.address?.street } else { street = streetRef.current.value }
		if (numberRef.current.value === '') { number = dbUser?.address?.number } else { number = numberRef.current.value }
		if (zipCodeRef.current.value === '') { zipCode = dbUser?.address?.zipCode } else { zipCode = zipCodeRef.current.value }
		if (cityRef.current.value === '') { city = dbUser?.address?.city } else { city = cityRef.current.value }
		if (phoneRef.current.value === '') { phone = dbUser?.phone } else { phone = phoneRef.current.value }

		const editUserDaten = {
			firstname: firstname,
			lastname: lastname,
			// email: email,
			address: {
				street: street,
				number: number,
				zipCode: zipCode,
				city: city,
			},
			phone: phone
		}

		try {
			const result = await fetch(url + '/editUserProfile', {
				method: 'PUT',
				credentials: 'include',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(editUserDaten)

			})
			const data = await result.json()
			console.log(data)
			setUserDaten(data)
			setNeuRendernBeiInputs(true)
			//	window.location.reload() // damit die Daten sofort neu geladen werden
			//	history.push('/profile') // damit die Daten sofort neu geladen werden

		} catch (err) {
			console.log(err)
		}

	}


	useEffect(() => {
		const neuRendern = async () => {
			const data = await getProfile()
			setUserDaten(data)
			setNeuRendernBeiInputs(false)
		}
		neuRendern()
	}, [neuRendernBeiInputs])




	return (

		<main className="profile">
			<Header>My Profile</Header>
			<section className="profileImg">
				<img src={userDaten?.user?.userImg} alt="UserBild" />
				<form>
					<input
						ref={imgRef}
						type="file"
						name="file"
						id="fileUpload"
						placeholder="max 1MB"
						accept="image/*"
						/* wenn das bild beim input hinzugefügt wurde, wid es 
						sofort gändert  */
						onChange={bildHochladenZumBackEnd}
					/>

				</form>
			</section>


			<form >
				<div>
					<label htmlFor="name">Name</label>
					<input

						ref={firstnameRef}
						// value={userDaten?.user?.firstname}
						type="text"
						name="firstname"
						placeholder={userDaten?.user?.firstname || "Firstname ?"}
					/>
					<input

						ref={lastnameRef}
						type="text"
						name="lastname"
						placeholder={userDaten?.user?.lastname || "Lastname ?"}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						ref={emailRef}
						type="email"
						name="email"
						placeholder={userDaten?.user?.email || "Email ?"}
						disabled    /* Email soll/darf nicht geändert werden */
						value={userDaten?.user?.email}
						style={{ color: "purple" }}
					/>
				</div>
				<div>
					<label htmlFor="address">Shipping Address</label>
					<input
						ref={streetRef}
						type="text"
						name="street"
						placeholder={userDaten?.user?.address?.street || "Street ?"}
					/>
					<input
						ref={numberRef}
						type="text"
						name="number"
						placeholder={userDaten?.user?.address?.number || "Number ?"}
					/>
					<input
						ref={zipCodeRef}
						type="text"
						name="zipCode"
						placeholder={userDaten?.user?.address?.zipCode || "Zip Code ?"}
					/>
					<input
						ref={cityRef}
						type="text"
						name="city"
						placeholder={userDaten?.user?.address?.city || "City ?"}
					/>
				</div>
				<div>
					<label htmlFor="phone">Phone Number</label>
					<input
						ref={phoneRef}
						type="number"
						name="phone"
						placeholder={userDaten?.user?.phone || "Phone Number ?"}
					/>

				</div>
				<div>
					<button onClick={logout} id="logout">
						Logout
					</button>
				</div>
				<button onClick={handleUpdateProfile} id="updateProfile">Update Profile</button>
			</form>
			<Navigation />


		</main>

	);
};

export default Profile;
