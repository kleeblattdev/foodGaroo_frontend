import { useState } from "react";

import "./wishlistButton.scss";

const WishlistButton = () => {
	const [like, setLike] = useState(false);

	const handleWishlist = () => {
		if (like == true) return setLike(false);
		else {
			setLike(true);
		}
	};

	return (
		<button
			onClick={handleWishlist}
			className={like ? "wishBtnActive" : "wishBtnNotActive"}
		></button>
	);
};

export default WishlistButton;
