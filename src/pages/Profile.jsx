import { useEffect, useState, useRef } from 'react';
import { BackButton } from '../shared/buttons/BackButton.jsx'
import { useNavigate } from 'react-router-dom';


const Profile = () => {

	const nav = useNavigate();
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION
	const [userDaten, setUserDaten] = useState({})
	const imgRef = useRef()
	const [bildGeladen, setBildGeladen] = useState()
	const [neuRendern, setNeuRendern] = useState(false)

	useEffect(() => {
		getProfile()
		setNeuRendern(prev => !prev)
	}, [])

	useEffect(() => {
		const bildNeuRendern = async () => {

			const bildUrl = userDaten?.user?.userImg

			setBildGeladen(bildUrl)
		}
		bildNeuRendern()
	}, [neuRendern])



	const getProfile = async () => {
		try {
			const result = await fetch(url + '/profile', {
				method: 'GET',
				credentials: 'include',
				headers: { 'content-type': 'application/json' }

			})
			const data = await result.json()
			setUserDaten(data)

		} catch (err) {
			console.log(err)
		}
	}

	const bildHochladenZumBackEnd = async (event) => {
		event.preventDefault()

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
			setNeuRendern(prev => !prev)

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


	return (
		<main className="profile">
			<h1>Profile</h1>

			<section>
				<BackButton></BackButton>
				<h2>userName</h2>
				<h2>img</h2>
{/* 				<img src={bildGeladen} alt="UserBild" />
 */}				<img src={userDaten?.user?.userImg} alt="UserBild" />
				<form>
					<label htmlFor='file'>Datei zum Hochladen</label>
					<input ref={imgRef} type='file' id='file' name='file' placeholder='max 1MB' />
					<button onClick={bildHochladenZumBackEnd} >Hochladen zum BackEnd</button>
				</form>
			</section>

			<section>
				<h3>Name </h3>
				<p>{userDaten?.user?.firstname} {userDaten?.user?.lastname} </p>			{/*  ? bedeutet, dass es nicht immer da ist und so lange wie Pending gibt es keinen Fehler */}
				<h3>Eamil </h3>
				<p>{userDaten?.user?.email}</p>
				<h3>Shipping Adresse</h3>
				<p>{userDaten?.user?.address?.street}</p>
				<p>{userDaten?.user?.address?.number}</p>
				<p>{userDaten?.user?.address?.zipCode}</p>
				<p>{userDaten?.user?.address?.city}</p>

				<h3>Phone Number</h3>
				<p>{userDaten?.user?.phone}</p>

				<button onClick={logout}>Logout</button>

			</section>

			<button> Zur Profil verändern Seite </button>

		</main>
	);
};

export default Profile;



