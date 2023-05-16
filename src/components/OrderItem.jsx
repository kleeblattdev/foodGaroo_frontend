import { Link } from "react-router-dom";
import "./orderItem.scss";

const OrderItem = ( {items , order} ) => {
	console.log(items) // daten kommen an
	
	// datum formatieren
	const schoenesDatum = new Date(order?.date).toLocaleDateString("de-DE")	

	return (
		<Link to={`/orders/:${items?._id}`} className="orderItem">
			<section>
				<article>
					<h2>OrderId: {items?._id} </h2>
					<p>Order sum: {items?.price.toFixed(2)}</p>
				</article>
				<article>
					<p>payment status: {order?.payment_status}</p>
					<p>status: {order?.status}</p>
					<div>
						<p>Order date: {schoenesDatum}</p>
					</div>
				</article>
			</section>
		</Link>
	);
};

export default OrderItem;
