import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../shared/Header";
import Navigation from "../shared/Navigation";

import "./productDetail.scss";

const ProductDetail = () => {
	const params = useParams();

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [product, setProduct] = useState();
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		fetch(url + "/product/" + params.id)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
				console.log(data);
			});
	}, []);

	const handleAddToCart = async () => {};

	return (
		<main className="productDetail">
			<Header></Header>
			<section className="product">
				<img src={product?.image} alt={product?.title} />
				<h3>{product?.price}€</h3>
				<h4>
					{product?.servings.size}
					{product?.servings.unit}
				</h4>
			</section>
			<section className="setQuantity">
				<h5>Quantity</h5>
				<article>
					<button onClick={() => setQuantity(quantity - 1)}>-</button>
					<h3>{quantity}</h3>
					<button onClick={() => setQuantity(quantity + 1)}>+</button>
				</article>
			</section>
			<button onClick={handleAddToCart} id="addToCartBtn">
				Add to Cart
			</button>
			<Navigation />
		</main>
	);
};

export default ProductDetail;
