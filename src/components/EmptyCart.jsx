import SquareButton from "../shared/buttons/SquareButton";

const EmptyCart = () => {
	return (
		<main className="emptyCart">
			<h1>Your Cart is Empty</h1>
			<SquareButton to="/home">Start Shopping</SquareButton>
		</main>
	);
};

export default EmptyCart;
