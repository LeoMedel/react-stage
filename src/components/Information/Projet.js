//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Style


class Projet extends Component
{
	//Ici on recoie les valeur pour creer le component 
	static propTypes = {
		//isRequired dit que on daoit avoir ces valeurs pour creer le component
    	projet: PropTypes.array.isRequired
    };

	constructor()
	{
		super();
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	componentDidMount()
	{
		
	}

	handleButtonClick(e)
	{
		
	}


	render()
	{
		const { projet } = this.props

		return(

			<div className="Projet">
				<div className="Information">
					<div className="All-Projets">
					{
						projet.length > 0 ? (
							<div>
	        					<h1> Projet</h1>
	        					{
									projet.map((projet) =>
											
										<div className="Etudiant-Resultat" key={ projet.ID }>
											
											<h4> { projet.Titre } </h4>
													
											<h5>Information</h5>
											
											<ul>
												<li><b>Organisme : </b> { projet.Organisme }</li>
												<li><b>CHEF : </b> { projet.Chef_ID }</li>
												<li><b>DATES : </b> { projet.DateDebut } --- { projet.DateFin }</li>
											</ul>
											<p align="right">
												<input type="button" value="Voir l'Information"/>
											</p>
											<p align="right">{ projet.Organisme }</p>
										</div>
									)
								}
	        				</div>
	        			) : (
	        				<div>
	        					<h1>Aucune Projet trouvé </h1>
	        				</div>
	        			)
	       			}

							
					</div>
				</div>
			</div>
		);
	}

}

export default Projet;