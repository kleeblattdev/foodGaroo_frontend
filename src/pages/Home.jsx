import Header from "../shared/Header";
import Searchbar from "../shared/Searchbar";
import Navigation from "../shared/Navigation";

const Home = () => {
	return (
		<main className="home">
			<Header>Home</Header>
			<Searchbar />
			<Navigation />
		</main>
	);
};

export default Home;
