//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Style


class Etudiant extends Component
{

	//Ici on recoie les valeur pour creer le component 
	static propTypes = {
    	etudiant: PropTypes.array.isRequired
    	
    };

	constructor()
	{
		super();
/*
		this.state ={
			etudiant: this.props.info,
			info: props.id
			
		}
*/
		this.handleButtonClick = this.handleButtonClick.bind(this);

	}

	handleButtonClick(e)
	{
		
	}


	render()
	{
		const { etudiant } = this.props
		return(

			<div className="Etudiant">

				<div className="Information">

				{
					etudiant.length > 0 ? (
						<div>
							<h1>Informations</h1>
							{
								etudiant.map((inf) =>
									
									<div className="Etudiant" key={ inf.etudiant_id }>
										<h1> { inf.prenom } { inf.nom } </h1>
										
										<h3>ETUDIANT</h3>
										<ul>
											<li><b>Formation : </b> { inf.formation }</li>
											<li><b>Situatuion : </b> { inf.situation }</li>
											<li><b>Dates : </b> { inf.debutEtudiant } - { inf.finEtudiant }</li>
											<li><b>Email : </b> { inf.email }</li>
										</ul>
										<br/>
									
										<h3>PROJET</h3>
										<ul>
											<li><b>Titre : </b>{ inf.projet }</li>
											<li><b>Chef : </b>{ inf.chef }</li>
											<li><b>Description : </b>{ inf.projet_description }</li>
											<li><b>Organisme : </b>{inf.organisme}</li>
											<li><b>DATES : </b>{ inf.debutProjet } - {inf.finProjet}</li>

										</ul>
										<br/>

										<h3>PUBLICATION</h3>	
										<ul>
											<li><b>Titre de la Publication : </b> { inf.publication }</li>
											<li><b>Type : </b> { inf.type }</li>
											<li><b>Date : </b>{ inf.date }</li>
											<li><b>No. des Pages : </b>{inf.pages}</li>
											<li><b>DATES : </b>{ inf.debutProjet } - {inf.finProjet}</li>
										</ul>
										<h5>Resume</h5>
										<p>{inf.resume}</p>
										
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