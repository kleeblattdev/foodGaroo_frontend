import { useNavigate } from "react-router-dom";

import "./header.scss";
// eslint-disable-next-line react/prop-types
const Header = ({ children }) => {
	const navigate = useNavigate();
	return (
		<header>
			<button onClick={() => navigate(-1)}></button>
			<h2>{children}</h2>
		</header>
	);
};

export default Header;
