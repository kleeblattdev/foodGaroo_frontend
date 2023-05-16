import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../shared/Header";
import Navigation from "../shared/Navigation";

import "./productDetail.scss";
import WishlistButton from "../shared/buttons/WishlistButton";

const ProductDetail = () => {
	const params = useParams();

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [product, setProduct] = useState();
	const [description, setDescription] = useState(false);
	const [ingredient, setIngredient] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const price = product?.price?.toFixed(2);

	const nav = useNavigate()

	useEffect(() => {
		fetch(url + "/product/" + params.id, {
			method: "GET",
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
			});
	}, []);

	const handleDescription = () => {
		if (description == true) {
			return setDescription(false);
		}
		return setDescription(true);
	};

	const handleIngredient = () => {
		if (ingredient == true) {
			return setIngredient(false);
		}
		return setIngredient(true);
	};

	const increment = () => {
		setQuantity(quantity + 1);
	};

	const decrement = () => {
		if (quantity == 1) {
			return quantity;
		} else {
			setQuantity(quantity - 1);
		}
	};

	const handleAddToCart = async () => {
		const item = product;
		item.quantity = quantity;
		const body = { item: item };

		try {
			const response = await fetch(url + "/cart", {
				method: "post",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body),
			});
			if (response.ok) {
				window.location.reload() // ! besser wäre mit reload state und neu rendern

				alert("Item successfully added to Cart");
				// setReload(true);
				return

			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		// getCartCount();
		// setReload(false);
	}, []); // reload 

	return (
		<main className="productDetail">
			<Header></Header>
			<section className="productWrapper">
				<WishlistButton item={product} />{" "}
				{/* // das item für den WishlistButton ist hier in dem fall in product drin */}
				<section className="product">
					<img src={product?.image} alt={product?.title} />
					<article>
						<h2>{product?.title}</h2>
					</article>
				</section>
				<section className="setQuantity">
					<article className="price">
						<h3>{price}€</h3>
						<h5>
							({product?.servings.size}
							{product?.servings.unit})
						</h5>
					</article>
					<div>
						<button
							onClick={decrement}
							className={quantity == 1 ? "disableBtn" : ""}
						>
							-
						</button>
						<h3>{quantity}</h3>
						<button onClick={increment}>+</button>
					</div>
				</section>
				<article className="description">
					<button
						onClick={handleDescription}
						className={description ? "arrowDown" : "arrowUp"}
					>
						Description
					</button>
					<p className={description ? "showDescription" : "hideDescription"}>
						{product?.description}
					</p>
				</article>
				<article className="description">
					<button
						onClick={handleIngredient}
						className={ingredient ? "arrowDown" : "arrowUp"}
					>
						Ingredients
					</button>
					<p className={ingredient ? "showDescription" : "hideDescription"}>
						{product?.ingredientList}
					</p>
				</article>
				<button onClick={handleAddToCart} id="addToCartBtn">
					Add to Cart
				</button>
				<Navigation />
			</section>
		</main>
	);
};

export default ProductDetail;
