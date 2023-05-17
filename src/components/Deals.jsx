import ProductItem from "../shared/ProductItem";
import { v4 as uuidv4 } from "uuid";
const Deals = ({ deal, items }) => {
	const schoenesDatumDeals = new Date(deal?.date)?.toLocaleDateString("de-DE");
	const dealEndDate = new Date(deal?.dateEnd)?.toLocaleDateString("de-DE");
	console.log(items);
	return (
		<section className="deals">
			<h4>
				Weekly Deals: {schoenesDatumDeals} - {dealEndDate}
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
