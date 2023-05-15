import { useState } from "react";
const CartItem = ({ item, index }) => {
	const [cart, setCart] = useState(null);

	const getCart = async () => {
		const response = await fetch(url + "/cart", {
			method: "get",
			credentials: "include",
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();
		console.log(data);
		setCart(data);
	};
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
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
	return (
		<section className="cartItem">
			<h3>{item.title}</h3>
			<p>{item.price}</p>
			<div>
				<button
					onClick={async () => {
						item.quantity = item.quantity - 1;
						await modifyItem(item, index);
					}}
					className={item.quantity == 1 ? "disableBtn" : ""}
				>
					{" "}
					-{" "}
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
			>
				delete
			</button>
		</section>
	);
};

export default CartItem;
