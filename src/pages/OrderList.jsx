import OrderItem from "../components/OrderItem";
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";

const OrderList = () => {
	return (
		<main className="orderList">
			<Header>My Orders</Header>
			<Navigation />
			<section>
				<OrderItem />
			</section>
		</main>
	);
};

export default OrderList;
