import { Link } from "react-router-dom";
import "./orderItem.scss";

const OrderItem = () => {
	return (
		<Link to="/orders/:id" className="orderItem">
			<section>
				<article>
					<h2>OrderId</h2>
					<p>Order sum</p>
				</article>
				<article>
					<p>payment status</p>
					<p>status</p>
					<div>
						<p>Order date</p>
					</div>
				</article>
			</section>
		</Link>
	);
};

export default OrderItem;
