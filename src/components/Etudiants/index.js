
//Dependencies
import React, { Component } from 'react';

//Style
import './Etudiants.css';
import Cards from './Cards'


class Etudiants extends Component
{


	constructor()
	{
		super();

		this.state = {
			etudiants: []
		}

		fetch('/etudiants/resultats')
		.then(res =>res.json())
		.then(etudiants => 
			this.setState({
				etudiants:  etudiants
			}, () => 
				console.log("Etudiants : ", etudiants)
			)
		);
	}

	render()
	{
		return(

			<div className="Etudiants">
				<Cards etudiants={this.state.etudiants}/>
			</div>
		);
	}

}

export default Etudiants;