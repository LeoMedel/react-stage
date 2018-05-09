//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Style


class Etudiant extends Component
{

	//Ici on recoie les valeur pour creer le component 
	static propTypes = {
		//isRequired dit que on daoit avoir ces valeurs pour creer le component
    	etudiant: PropTypes.array.isRequired
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
		const { etudiant } = this.props
		console.log("INFO !!!  "+etudiant)

		return(

			<div className="Etudiant">

				<div className="Information">

				{
					etudiant.length > 0 ? (
						<div>
							<h1>Etudiant</h1>
							{
								etudiant.map((inf) =>
									
									<div className="Etudiant-Info" key={ inf.ID }>
										<h1> { inf.Prenom } { inf.Nom } </h1>
										
										<h2>Information</h2>
										<h4>Etudiant</h4>
										<ul>
											<li><b>Formation : </b> { inf.Formation }</li>
											<li><b>Situatuion : </b> { inf.Situation }</li>
											<li><b>Dates : </b> { inf.DateDebut } - { inf.DateFin }</li>
										</ul>
										<br/>
									
										<h4>PROJET</h4>
										<ul>
											<li><b>Titre : </b>{ inf.Titre }</li>
											<li><b>Description : </b>{ inf.Description }</li>
											<li><b>Organisme : </b>{inf.Organisme}</li>
										</ul>	
									</div>	
								)
							}
						</div>

					) : (
						<div>
	        				<h1>Aucune Etudiant trouvé </h1>
	        			</div>
	        		)
	       		}


				
				</div>
			</div>
		);
	}

}

export default Etudiant;