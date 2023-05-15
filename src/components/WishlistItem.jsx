import "./wishlistItem.scss";

const WishlistItem = () => {
	//Hier die Funktion um das WishlistItem zu löschen
	const handleDelete = () => {};
	return (
		<article className="wishlistItem">
			<img src="" alt="Artikelname" />
			<h2>Artikelname</h2>
			<div>
				<p>Artikeleinheit</p>
				<p>Artikellikes</p>
				<button onClick={handleDelete}></button>
			</div>
			<h4>Artikelpreis€</h4>
		</article>
	);
};

export default WishlistItem;
