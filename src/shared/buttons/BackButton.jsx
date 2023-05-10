import { useNavigate} from 'react-router-dom';


export const BackButton = () => {

	const nav = useNavigate();

	const zurueck = () => {
		nav(-1)
	}

	return <div className="backButton">
		<button onClick={zurueck}>Back</button>
	</div>;
};

