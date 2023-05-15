import "./wishlistItem.scss";

const WishlistItem = () => {
	//Hier die Funktion um das WishlistItem zu löschen
	const handleDelete = () => {};
	return (
		<article className="wishlistItem">
			<img src="" alt="Artikelname" />
			<article>
				<h2>Artikelname</h2>
				<div>
					<p>Artikeleinheit</p>
					<p>Artikellikes</p>
				</div>
				<h4>Artikelpreis€</h4>
			</article>
			<button onClick={handleDelete}></button>
		</article>
	);
};

export default WishlistItem;
