import { Link } from "react-router-dom";
import "./orderItem.scss";

const OrderItem = ({ items, order, index }) => {
	console.log(items) // daten kommen an

	// datum formatieren
	const schoenesDatum = new Date(order[index]?.date)?.toLocaleDateString("de-DE")
	const schoenesDatumDeals = new Date(order[index]?.dealsDate)?.toLocaleDateString("de-DE")

	return (

		/* zugriff auf die // ! Produkt items in den Bestellungen 
			{items?.map((item, index) => {
				return (
					<article key={uuidv4()}>
						<p>item: {item?.name}</p>
			}
	<p>{item?.price}</p>
		 */


		<Link to={`/orders/${order[index]?._id}`} order={order} index={index} className="orderItem">
			<section>
				<article>
					<h2>OrderId: {order[index]?._id} </h2>
					<p>Order sum: {order[index]?.sum}</p>

					<p>percentage: {order[index]?.percentage} %</p>
					<p>totalPrice: {order[index]?.totalPrice}</p>

				</article>
				<article>
					<p>payment status: {order[index]?.payment_status}</p>
					<p>status: {order[index]?.status}</p>
					<p>sum Order: {order[index]?.sum}</p>
					<div>
						<p>Order date: {schoenesDatum}  </p>
						<p>dealsDate: {schoenesDatumDeals}</p>
					</div>
				</article>
			</section>
		</Link>
	);
};

export default OrderItem;
