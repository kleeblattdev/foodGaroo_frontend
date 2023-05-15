import SquareButton from "../shared/buttons/SquareButton";
import "./emptyWishlist.scss";

const EmptyWishlist = () => {
	return (
		<section className="emptyWishlist">
			<h2>Your Wishlist is Empty</h2>
			<SquareButton to="/home">Continue Shopping</SquareButton>
		</section>
	);
};

export default EmptyWishlist;
