import OrderItem from "../components/OrderItem";
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";


const OrderList = () => {

	const [orderItems, setOrderItems] = useState([])
	const [order, setOrder] = useState([])

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION

	const getOrder = async () => {
		try {
			const response = await fetch(url + '/orders', {
				method: 'GET',
				credentials: 'include',
				headers: { 'content-type': 'application/json' },
			});
			if (response.ok) {
				const data = await response.json()
				setOrderItems(data[0]?.items)
				console.log(data?.items)
				console.log(data[0]?.items[0]?.price)
				setOrder(data[0])
			}
		} catch (err) {
			console.log(err)
		}
	}


	useEffect(() => {
		getOrder()
	}, [])


	return (
		<main className="orderList">
			<Header>My Orders</Header>
			<Navigation />
			<section>
				{orderItems?.map((items) => {
					return	<OrderItem
						key={uuidv4()}
						items={items}
						order={order}
					> </OrderItem>

				})}
			</section>
		</main>
	);
};

export default OrderList;
