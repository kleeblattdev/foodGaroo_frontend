import OrderItem from "../components/OrderItem";
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
//scss import
import "./orderList.scss";

const OrderList = () => {
	const [orderItems, setOrderItems] = useState([]);
	const [order, setOrder] = useState([]);
	const [orderCount, setOrderCount] = useState(0);

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	const getOrder = async () => {
		try {
			const response = await fetch(url + "/orders", {
				method: "GET",
				credentials: "include",
				headers: { "content-type": "application/json" },
			});
			if (response.ok) {
				const data = await response.json();
				setOrderItems(data?.orders[0]?.items);
				setOrder(data?.orders);
				setOrderCount(data.ordersCount);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getOrder();
	}, []);

	return (
		<main className="orderList">
			<Header>My Orders</Header>
			<Navigation />
			<h4>Total Orders: {orderCount}</h4>
			<section className="orderListing">
				{/* // !  evtl. hier der Fehler, da es mehrere Bestellungen gibt, 
				// ! die dann noch weitere items = Produkte enthalten  */}
				{order?.map((items, index) => {
					return (
						<OrderItem key={uuidv4()} index={index} items={items} order={order}>
							{" "}
						</OrderItem>
					);
				})}
			</section>
		</main>
	);
};

export default OrderList;
