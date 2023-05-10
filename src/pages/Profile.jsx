import { BackButton } from '../shared/buttons/BackButton.jsx'


const Profile = () => {


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

				<button>Logout</button>

			</section>

		</main>
	);
};

export default Profile;
