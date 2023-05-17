import { Link } from "react-router-dom";
import "./squareButton.scss";

// eslint-disable-next-line react/prop-types
const SquareButton = ({ link, children, onClick  }) => {
	return (
		<Link  onClick={onClick} className="squareButton" to={link}>
			{children}
		</Link>
	);
};

export default SquareButton;
