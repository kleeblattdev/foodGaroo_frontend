import { useEffect, useState } from 'react';
import { BackButton } from '../shared/buttons/BackButton.jsx'
import { useNavigate } from 'react-router-dom';


const Profile = () => {

	const nav = useNavigate();
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION
	const [userDaten, setUserDaten] = useState({})

	useEffect(() => {
		getProfile()
	}, [])



	// die Userdaten holen und in die Felder eintragen
	// Userdaten aus der secure Cookie Payload holen
	const getProfile = async () => {
		try {
			const result = await fetch(url + '/profile', {
				method: 'GET',
				credentials: 'include',
				headers: { 'content-type': 'application/json' }

			})
			const data = await result.json()
			console.log(data)
			setUserDaten(data)

		} catch (err) {
			console.log(err)
		}


	}

	const logout = async () => {
		try {
			const res = await fetch(url + '/logout', {
				method: 'GET',
				credentials: 'include',
				headers: { 'content-type': 'application/json' },

			})
			if (res.ok) {
				nav('/')
			}

		} catch (err) {
			console.log(err)
		}
	}

	console.log(userDaten)

	return (
		<main className="profile">
			<h1>Profile</h1>

			<section>
				<BackButton></BackButton>
				<h2>userName</h2>
				<h2>img</h2>
			</section>

			<section>
				<h3>Name {userDaten?.user?.firstname}</h3> 				{/*  ? bedeutet, dass es nicht immer da ist und so lange wie Pending gibt es keinen Fehler */}
				<h3>Eamil {userDaten?.user?.email}</h3>
				<h3>Shipping Adresse</h3>
				<h3>Phone Number</h3>

				<button onClick={logout}>Logout</button>

			</section>

		</main>
	);
};

export default Profile;



