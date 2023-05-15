//component import
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import WishlistItem from "../components/WishlistItem";

const Wishlist = () => {
	return (
		<main className="wishlist">
			<Header>My Wishlist</Header>
			<Navigation />
			<section>
				<WishlistItem />
			</section>
		</main>
	);
};

export default Wishlist;
