import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Header from "../shared/Header";
import Navigation from "../shared/Navigation";

const OrderDetails = ({ order, index }) => {
	const params = useParams();
	const nav = useNavigate();

	// console.log(order[index]?._id)

	const id = params.id;
	console.log(id)

	const [orderDetails, setOrderDetails] = useState();
	console.log(orderDetails)

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	useEffect(() => {
		try {
			const fetchOrderDetails = async () => {
				const result = await fetch(url + `/orders/${id}`, {
					method: "GET",
					credentials: "include",
					headers: { 'content-type': 'application/json' },
				});
				const data = await result.json();
				console.log(data);
				setOrderDetails(data);
			}
			fetchOrderDetails();

		} catch (err) {
			console.log(err);
		}
	}, [])



	return (
		<main className="orderDetails">



			<Header />
			<h1>Order Details</h1>
{/* 			{orderDetails[0]?.items[0]?.price}
 */}			{orderDetails?.map?.((order) => {
				return (
					<div 
					key={uuidv4}>
						<h1>Order Bestellung</h1>
						<h3>deals: {order?.deals} %</h3>
						<h3>sum: {order?.sum} €</h3>
						<h3>status: {order?.status} </h3>
						<h3>payment_status: {order?.payment_status}</h3>
						<h3>dealsDate: {order?.dealsDate }  </h3>
						<h1>date: {order?.date} </h1>
					</div>
				);
			})}

{/* die einzelnen Bestellungen */}
			{orderDetails?.map?.((order) => {
				return order?.items?.map((item) => {
					return (
						<div key={uuidv4}>
							<h1>nächste Item in der Order Bestellung</h1>
							<h3>titel: {item?.title}</h3>
							<h3>price: {item?.price}</h3>
							<p>quantity: {item?.quantity}</p>
							<p>rabattstatus: {item?.rabattStatus}</p>
							<p>rabatt: {item?.rabatt} %</p>
							<p>priceOld: {item?.priceOld}</p>
							<p>priceNeu: {item?.priceNeu}</p>
							<p>status: {item?.status}</p>
							<p>payment_status: {item?.payment_status}</p>


						</div>
					)
				})
			}

			)}

			<Navigation />
		</main>
	);
};

export default OrderDetails;
