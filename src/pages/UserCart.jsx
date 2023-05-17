//library import
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
//components import
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import SquareButton from "../shared/buttons/SquareButton";
import { useNeuRenderTotal } from "../store/neuRenderTotal.jsx";
import {  plusNeuRenderTotal, minusNeuRenderTotal  } from "../store/neuRenderTotal.jsx";

//scss import
import "./userCart.scss";

const UserCart = () => {
	const [cart, setCart] = useState(null);
	const [total, setTotal] = useState("");
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [neuRendern, setNeuRendern] = useState(false);
	
	const neuRendernTotal = useNeuRenderTotal((state) => state.neuRenderTotal);
	const plusNeuRenderTotal = useNeuRenderTotal((state) => state.plusNeuRenderTotal);
	const minusNeuRenderTotal = useNeuRenderTotal((state) => state.minusNeuRenderTotal);

	useEffect(() => {
		getCart();
		getTotal();
		//	setNeuRendern(false)
	}, [neuRendernTotal]);
	console.log(neuRendernTotal)

	const getCart = async () => {
		const response = await fetch(url + "/cart", {
			method: "get",
			credentials: "include",
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();
		setCart(data);
	};

	const modifyItem = async (item, index) => {
		const body = { item: item, index: index };
		try {
			const response = await fetch(url + "/cart/modify", {
				method: "put",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body),
			});
			if (response.ok) return await getCart();
		} catch (err) {
			console.log(err);
		}
	};
	const handleDelete = async (item) => {
		const body = { item: item };
		try {
			const response = await fetch(url + "/cart", {
				method: "delete",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body),
			});
			plusNeuRenderTotal()
			if (response.ok) return await getCart() , plusNeuRenderTotal();
		} catch (err) {
			plusNeuRenderTotal()
			console.log(err);
		}
	};

	const getTotal = async () => {
		const response = await fetch(url + "/cart/totalPrice", {
			method: "get",
			credentials: "include",
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();
		setTotal(data.totalPrice);
	}

	const handlCheckout = async () => {
		// setNeuRendern(true)
		plusNeuRenderTotal()
		// window.location.reload()  // !  hartes neuRendern, weil Item oder Einkaufswagen nicht wollen
		const response = await fetch(url + '/cart/checkout', {
			method: 'GET',
			credentials: 'include',
			headers: { 'content-type': 'application/json' },
		})
		plusNeuRenderTotal()
		const data = await response.json()
		if (data.ok) {
			plusNeuRenderTotal()
			setCart(null)
			setTotal('')
			// 	setNeuRendern(false)
		}
	}

	// löst neuRendern aus
	useEffect(() => {
		getTotal('')
	}, [neuRendernTotal])


	return (
		<main className="userCart">
			<Header>My Cart</Header>
			<section className="cartList">
				{cart &&
					cart.items.map((item, index) => {
						return (
							<article className="product" key={uuidv4()}>
								<Link to={`/product/${item._id}`}>
									<img src={item.image} alt={item.title} />
								</Link>
								<div className="info">
									<Link to={`/product/${item._id}`}>
										<h4>{item.title}</h4>
									</Link>
									<p>{item.price.toFixed(2)}€</p>
								</div>
								<div className="quantity">
									<button
										onClick={async () => {
											minusNeuRenderTotal()
											if (item.quantity == 1) {
												return (item.quantity = 1);
											} else {
												item.quantity = item.quantity - 1;
											}
											await modifyItem(item, index);
										}}
										className={item.quantity == 1 ? "disableBtn" : ""}
									>
										-
									</button>
									<h3>{item.quantity}</h3>
									<button
										onClick={async () => {
											plusNeuRenderTotal()
											item.quantity = item.quantity + 1;
											await modifyItem(item, index);
										}}
									>
										+
									</button>
								</div>
								<button
									onClick={() => {
										plusNeuRenderTotal()
										handleDelete(item);

									}}
									id="bin"
								></button>
							</article>
						);
					})}
			</section>
			<section className="total">
				<p>Total:</p>
				<p>{total}€</p>
			</section>
			<div className="btnWrapper">
				<SquareButton onClick={() => {
					handlCheckout(),
						plusNeuRenderTotal()
				}}>Checkout</SquareButton>
				<Navigation setNeuRendern={setNeuRendern} neuRendern={neuRendern} />
			</div>
		</main>
	);
};

export default UserCart;
