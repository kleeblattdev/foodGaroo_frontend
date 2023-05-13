import Header from "../shared/Header";
import Searchbar from "../shared/Searchbar";
import Navigation from "../shared/Navigation";
import SearchItem from "../components/SearchItem";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./category.scss";
import CategoryList from "../shared/CategoryList";

const Category = () => {
	// const searchCount = props.location.state.searchCount;
	// const searchResult = props.location.state.searchResult;
	// ! import und durchreichen von den daten aus filter
	const location = useLocation();
	console.log(location);
	return (
		<main className="category">
			<Header>Category</Header>
			<section className="searchbarWrapper">
				<Link to="/filter" id="filterIcon"></Link>
				<Searchbar />
			</section>
			<CategoryList />
			<Navigation />

			{location?.state?.searchCount}
			{location?.state?.searchResult?.map((item) => {
				return (
					<SearchItem
						key={uuidv4()}
						title={item.title}
						_id={item._id}
						item={item}
					>
						{" "}
					</SearchItem>
				);
			})}
		</main>
	);
};

export default Category;
