//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import EtudiantList from './EtudiantList'

//Style


class Projet extends Component
{

	//Ici on recoie les valeur pour creer le component 
	static propTypes = {
		//isRequired dit que on daoit avoir ces valeurs pour creer le component
    	projet: PropTypes.array.isRequired,
    	projetName: PropTypes.string.isRequired
    };


	constructor()
	{
		super();
		
		
		//console.log("PROPS PROJET : "+ projetName);
		this.state = {
			etudiants:[],
			projetName: ''
		}

/*
		this.setState({
			projetName: this.props
		})
*/

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
		const { projetName } = this.props
		
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
											
											<h4> { projet.titre } </h4>		
											<h5>Information</h5>
											<ul>
												<li><b>ORGANISME : </b> { projet.organisme }</li>
												<li><b>CHEF : </b> { projet.chef }</li>
												<li><b>DATES : </b> { projet.date_debut } --- { projet.date_fin }</li>
											</ul>
											<p align="right">{ projet.organisme }</p>
											<p align="right">
												<input type="button" value="Voir l'Information"/>
											</p>
											
										</div>

									)
								}
								<h3>Partenaires : </h3>
								<EtudiantList projetName={projetName}/>
								
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