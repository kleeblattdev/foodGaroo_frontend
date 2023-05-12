import { Link } from "react-router-dom";
import "./FilterButton.scss";

const FilterButton = ({ childeren, link, item, }) => {
	return (
		<button className="filterButton">
			{childeren} {item.aisle} {item.type}
		</button>

	)
};

export default FilterButton;
