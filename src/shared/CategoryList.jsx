import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./categoryList.scss";

const CategoryList = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const [categories, setCategories] = useState();

	useEffect(() => {
		fetch(url + "/categories", {
			method: "GET",
			credentials: "include",
		})
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
						<div key={uuidv4()}>
							<NavLink to={`/category`} state={{ category: category.aisle }}>
								{category.aisle}
							</NavLink>
						</div>
					);
				})}
		</nav>
	);
};

export default CategoryList;
