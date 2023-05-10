import { useNavigate} from 'react-router-dom';

import './BackButton.scss';

export const BackButton = () => {

	const nav = useNavigate();

	const zurueck = () => {
		nav(-1)
	}

	return <main className="backButton">
		<article onClick={zurueck}>🔙 Back</article>
	</main>;
};

