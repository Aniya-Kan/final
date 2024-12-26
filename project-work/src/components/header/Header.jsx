import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

export default function Header() {
	const [isBlue, setIsBlue] = useState(true); 


	const toggleBackground = () => {
		setIsBlue(!isBlue); 
	};

	return (
		<React.Fragment>
		
			<div className={`header ${isBlue ? 'header--gray' : 'header--red'}`}>
				<nav className="navigation">
					<ul>
						<li>
							<Link to="/Characters">Characters</Link>
						</li>
						<li>
							<Link to="/Locations">Locations</Link>
						</li>
						<li>
							<Link to="/">Episodes</Link>
						</li>
						<li>				<div style={{ textAlign: 'center', marginTop: '20px' }}>
					<button
						className="button"
						onClick={toggleBackground}
					>
						switch theme!
					</button>
				</div>
				</li>
				</ul>
				</nav>
				</div>


				
		</React.Fragment>
	);
}






