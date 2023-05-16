//library import
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
//components import
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import SquareButton from "../shared/buttons/SquareButton";
//scss import
import "./userCart.scss";

const UserCart = () => {
	const [cart, setCart] = useState(null);
	const [total, setTotal] = useState("");
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const [neuRendern, setNeuRendern] = useState(false);

	useEffect(() => {
		getCart();
		getTotal();
		setNeuRendern(false)
	}, [neuRendern]);

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
			if (response.ok) return await getCart();
		} catch (err) {
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
		setNeuRendern(true)
		window.location.reload()  // !  hartes neuRendern, weil Item oder Einkaufswagen nicht wollen
		const response = await fetch(url + '/cart/checkout', {
			method: 'GET',
			credentials: 'include',
			headers: { 'content-type': 'application/json' },
		})
		const data = await response.json()
		if (data.ok) {
			setCart(null)
			setTotal('')
			setNeuRendern(false)
		}
	}


	return (
		<main className="userCart">
			<Header>My Cart</Header>
			<section className="cartList">
				{cart &&
					cart.items.map((item, index) => {
						return (
							<article className="product" key={uuidv4()}>
								<img src={item.image} alt={item.title} />
								<div className="info">
									<h4>{item.title}</h4>
									<p>{item.price.toFixed(2)}€</p>
								</div>
								<div className="quantity">
									<button
										onClick={async () => {
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
											item.quantity = item.quantity + 1;
											await modifyItem(item, index);
										}}
									>
										+
									</button>
								</div>
								<button
									onClick={() => {
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
				<SquareButton onClick={handlCheckout}>Checkout</SquareButton>
				<Navigation  setNeuRendern={setNeuRendern} neuRendern={neuRendern} />
			</div>
		</main>
	);
};

export default UserCart;
