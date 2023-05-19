import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Header from "../shared/Header";
import Navigation from "../shared/Navigation";

//scss import
import "./orderDetails.scss";

const OrderDetails = ({ order, index }) => {
	const params = useParams();
	const nav = useNavigate();

	const id = params.id;
	const orderId = id.slice(0, 10);

	const [orderDetails, setOrderDetails] = useState([]);
	console.log(orderDetails);

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	useEffect(() => {
		try {
			const fetchOrderDetails = async () => {
				const result = await fetch(url + `/orders/${id}`, {
					method: "GET",
					credentials: "include",
					headers: { "content-type": "application/json" },
				});
				const data = await result.json();
				console.log(data);
				setOrderDetails(data);
				console.log(data);
			};
			fetchOrderDetails();
		} catch (err) {
			console.log(err);
		}
	}, []);
	const schoenesDatum = new Date(orderDetails?.date)?.toLocaleDateString(
		"de-DE"
	);
	console.log(new Date(orderDetails[0]?.date)?.toLocaleDateString("de-DE"));

	return (
		<main className="orderDetails">
			<Header>Order: {orderId}</Header>
			{/* 			{orderDetails[0]?.items[0]?.price}
			 */}{" "}
			{orderDetails?.map?.((order) => {
				return (
					<section key={uuidv4()} className="orderInfo">
						<p>date: {schoenesDatum} </p>
						{/* <h3>deals: {order?.deals} %</h3> */}
						<p>sum: {(order?.sum).toFixed(2)} €</p>
						<p>payment status: {order?.payment_status}</p>
						<p>status: {order?.status} </p>
						{/* <h3>dealsDate: {order?.dealsDate} </h3> */}
					</section>
				);
			})}
			{/* die einzelnen Bestellungen */}
			<h2>Bought Products:</h2>
			<section className="orderItemWrapper">
				{orderDetails?.map?.((order) => {
					return order?.items?.map((item) => {
						const oldPrice = (item?.priceOld).toFixed(2);
						const newPrice = (item?.priceNeu).toFixed(2);
						return (
							<article key={uuidv4()}>
								<div>
									<img src={item?.images[0]} alt={item?.title} />
									<h4>{item?.title}</h4>
								</div>
								{/* <h3>price: {(item?.price).toFixed(2)}</h3> */}
								<div>
									<p>quantity: {item?.quantity}</p>
									{/* <p>rabattstatus: {item?.rabattStatus}</p> */}
									<p>price: {oldPrice}€</p>
								</div>
								<div>
									<p>deal: {item?.rabatt} %</p>
									<p>deal price: {newPrice}€</p>
								</div>
								{/* 								<p>status: {item?.status}</p>
								<p>payment_status: {item?.payment_status}</p> */}
							</article>
						);
					});
				})}
			</section>
			<Navigation />
		</main>
	);
};

export default OrderDetails;
