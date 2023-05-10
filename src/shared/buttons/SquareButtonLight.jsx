import { Link } from "react-router-dom";
import "./squareButtonLight.scss";

// eslint-disable-next-line react/prop-types
const SquareButtonLight = ({ children, link }) => {
	return (
		<Link className="squareButtonLight" to={link}>
			{children}
		</Link>
	);
};

export default SquareButtonLight;
