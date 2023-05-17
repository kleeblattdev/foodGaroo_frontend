import { Link } from "react-router-dom";
import "./orderItem.scss";

const OrderItem = ({ items, order, index }) => {
	console.log(items); // daten kommen an

	// datum formatieren
	const schoenesDatum = new Date(order[index]?.date)?.toLocaleDateString(
		"de-DE"
	);
	const schoenesDatumDeals = new Date(
		order[index]?.dealsDate
	)?.toLocaleDateString("de-DE");
	const orderId = (order[index]?._id).slice(0, 10);
	const totalPrice = order[index]?.sum.toFixed(2);

	return (
		/* zugriff auf die // ! Produkt items in den Bestellungen 
			{items?.map((item, index) => {
				return (
					<article key={uuidv4()}>
						<p>item: {item?.name}</p>
			}
	<p>{item?.price}</p>
		 */

		<section className="orderItem">
			<Link
				to={`/orders/${order[index]?._id}`}
				order={order}
				index={index}
				className="orderItemWrapper"
			>
				<article>
					<h4>OrderId: {orderId} </h4>
					<p>
						Order date: <span>{schoenesDatum}</span>
					</p>
					<p>
						status: <span>{order[index]?.status}</span>
					</p>
					{/* 
					<p>percentage: {order[index]?.percentage} %</p>
					<p>totalPrice: {order[index]?.totalPrice}</p> */}
				</article>
				<article>
					<p>
						payment status: <span>{order[index]?.payment_status}</span>
					</p>
					<p>
						Total Price: <span>{totalPrice}€</span>
					</p>

					{/* 					<p>
						sum Order: <span>{order[index]?.sum}</span>
					</p> */}
					{/* 					<div><p>dealsDate: {schoenesDatumDeals}</p></div> */}
				</article>
			</Link>
		</section>
	);
};

export default OrderItem;
