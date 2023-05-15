/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import WishlistButton from "../shared/buttons/WishlistButton";

import "./productItem.scss";

const ProductItem = ({ item }) => {
	console.log(item);
	const price = item.price.toFixed(2);
	const title = item.title.slice(0, 29);

	


	return (
		<article className="productItem">
			<WishlistButton item={item} />
			<Link to={`/product/${item._id}`}>
				<img src={item.image} alt={item.title} />
				<h4>{title}</h4>
				<h4>{price}€</h4>
				<p>{item.likes}</p>
			</Link>
		</article>
	);
};

export default ProductItem;
