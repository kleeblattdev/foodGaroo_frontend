import { Link } from "react-router-dom";
import "./squareButtonLight.scss";

// eslint-disable-next-line react/prop-types
const SquareButtonLight = ({ children, link, style, onClick }) => {
	return (
		<Link onClick={onClick} style={style} className="squareButtonLight" to={link}>
			{children}
		</Link>
	);
};

export default SquareButtonLight;
