//Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


//Style
import './Etudiants.css';
import { Button } from 'reactstrap';


class Etudiants extends Component
{
	constructor()
	{
		super();
		this.state = {
			etudiants: []
			
		};
	}

	componentDidMount()
	{
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
				

				<div className="Etudiant-Presentation">
					<h1>Etudiants</h1>
					<p>Tous les etudiants trouvés : </p>
				</div>

				<div className="Resultats">
					<h3>Resultats</h3>
				</div>


				<div className="Etudiants-Trouves">
					{
						this.state.etudiants.map((etudiant) =>
							<div className="Etudiant-Resultat" key={ etudiant.ID }>
								
								<h4> { etudiant.Prenom } { etudiant.Nom } </h4>
									
								<ul>
									<li>{ etudiant.Formation }</li>
									<li>{ etudiant.Situation }</li>
									<li>{ etudiant.DateDebut } - { etudiant.DateFin }</li>
								</ul>
								<p align="right">
									<Button className="information" id={ etudiant.ID} color="info"><Link to={`/etudiant/${etudiant.ID}`}>Voir l'Information</Link></Button>
								</p>
							</div>
							
						)
					}
				</div>

			</div>
		);
	}

}

export default Etudiants;