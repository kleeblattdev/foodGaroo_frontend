import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./categoryList.scss";

const CategoryList = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const [categories, setCategories] = useState();

	useEffect(() => {
		fetch(url + "/categories")
			.then((res) => res.json())
			.then((data) => {
				setCategories(data);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<nav className="categoryList">
			{categories &&
				categories.map((category) => {
					return (
						<Link
							key={uuidv4()}
							to={`/category`}
							state={{ category: category.aisle }}
						>
							{category.aisle}
						</Link>
					);
				})}
		</nav>
	);
};

export default CategoryList;
