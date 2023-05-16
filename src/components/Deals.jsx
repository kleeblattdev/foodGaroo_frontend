import ProductItem from "../shared/ProductItem";
import { v4 as uuidv4 } from "uuid";
const Deals = ({ deal, items }) => {
	console.log(items);
	return (
		<section className="deals">
			<h4>
				Weekly Deals: {deal.date.slice(0, 9)} - {deal.dateEnd.slice(0, 10)}
			</h4>
			<section>
				{items &&
					items.map((item) => {
						return <ProductItem key={uuidv4()} item={item} />;
					})}
			</section>
		</section>
	);
};

export default Deals;
