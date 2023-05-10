import { BackButton } from '../shared/buttons/BackButton.jsx'
import { useNavigate } from 'react-router-dom';


const Profile = () => {

	const nav = useNavigate();
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION
	
	
	
	const logout = async () => {
		try {
			const res = await fetch(url + '/logout', {
				method: 'GET',
				credentials: 'include',
				headers: { 'content-type': 'application/json' },
			

			})
			if(res.ok) {
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
			</section>

			<section>
				<h3>Name</h3>
				<h3>Eamil</h3>
				<h3>Shipping Adresse</h3>
				<h3>Phone Number</h3>

				<button onClick={logout}>Logout</button>

			</section>

		</main>
	);
};

export default Profile;
