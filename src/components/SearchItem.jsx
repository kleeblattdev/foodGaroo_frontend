import { Link } from "react-router-dom";
import "./searchItem.scss";
// eslint-disable-next-line react/prop-types
const SearchItem = ({ item,  title, _id }) => {
	return (
		<>
			<li>
				<Link to={`/productId/${_id}`}>{title}</Link>
			</li>
		</>
	);
};

export default SearchItem;
