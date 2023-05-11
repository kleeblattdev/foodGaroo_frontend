import { useEffect, useState, useRef } from 'react';
import { BackButton } from '../shared/buttons/BackButton.jsx'
import { useNavigate } from 'react-router-dom';


const Profile = () => {

	const nav = useNavigate();
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION
	const [userDaten, setUserDaten] = useState({})
	const imgRef = useRef()

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

	const bildHochladenZumBackEnd = async (e) => {
		e.preventDefault()

		const form = new FormData()
		form.append('file', imgRef.current.files[0])
		form.append('name', userDaten?.user?._id)

		try {
			const result = await fetch(url + '/directupload', {
				method: 'POST',
				credentials: 'include',
				body: form
			})
			const dataBild = await result.json()
			userDaten.user.userImg = dataBild.url
			setUserDaten(userDaten)
			console.log(userDaten)
			console.log(dataBild)
		} catch (err){
			console.log(err)
		}
	}

	console.log(userDaten)

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
				<img src={userDaten?.user?.userImg} alt="" />
				<form>
					<label htmlFor='file'>Datei zum Hochladen</label>
					<input ref={imgRef} type='file' id='file' name='file' placeholder='max 1MB'/> 
					<button onClick={bildHochladenZumBackEnd} >Hochladen zum BackEnd</button>
				</form>
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



