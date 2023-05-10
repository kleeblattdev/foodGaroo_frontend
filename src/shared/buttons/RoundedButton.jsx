import { Link } from "react-router-dom";

const RoundedButton = ({ children, link }) => {
	return (
		<Link className="roundedButton" to={link}>
			{children}
		</Link>
	);
};

export default RoundedButton;
