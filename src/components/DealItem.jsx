import { Link } from "react-router-dom";
import WishlistButton from "../shared/buttons/WishlistButton";
const DealItem = ({ item, title, price }) => {
	return (
		<article className="dealItem">
			<WishlistButton item={item} />
			<Link to={`/product/${item._id}`}>
				<img src={item.image} alt={item.title} />
				<h4>{title}</h4>
				<h4>{price}€</h4>
				{/* old price */}
				<h4>{price}€</h4>
				<p>{item.likes}</p>
			</Link>
		</article>
	);
};

export default DealItem;
