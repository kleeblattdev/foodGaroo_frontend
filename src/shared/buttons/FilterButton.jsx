/* eslint-disable react/prop-types */
import "./FilterButton.scss";

const FilterButton = ({
	children,
	item,
	onClick,
	aktivButtonCategory,
	aktivButtonBadges,
}) => {
	return (
		// wenn der button gedrückt ist, dann soll er in aktivButtonCategory gespeichert werden und die farbe soll grün sein
		<button
			className={`filterButton ${
				aktivButtonCategory?.includes(item.aisle)
					? "activFilterButton"
					: aktivButtonBadges?.includes(item.type)
					? "activFilterButton"
					: ""
			}`}
			onClick={() => onClick(item)}
		>
			{children}
		</button>
	);
};

export default FilterButton;
