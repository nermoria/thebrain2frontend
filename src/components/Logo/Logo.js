import React from 'react';
import Tilt from 'react-tilt';
import Icon from './1.png';
import './logo.css';

const Logo = () => {
		return (
			<div className='ma4 center mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
				 <div className="Tilt-innern pa3"> 
				 	<img style={{paddingTop: '5px'}}alt='logo' src={Icon} /> 
				 </div>
			 </Tilt>
			</div>

		


	);
}


export default Logo;
