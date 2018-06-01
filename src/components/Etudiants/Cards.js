//Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

//Style
import './Etudiants.css';


class Etudiants extends Component
{
	constructor()
	{
		super();
		this.state = {
			etudiants: [],
			redirect: false,
			userId: 0
			
		};
		this.handleButtonClick = this.handleButtonClick.bind(this);
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

	handleButtonClick(e)
	{
		console.log("Hello !  " + e.target.id);

		this.setState({ 
			redirect: true,
			userId: e.target.id
		});
	}


	render()
	{
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to={`/etudiant/${this.state.userId}`} push/>;
		}
		
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
							<div className="Etudiant-Resultat" key={ etudiant.etudiant_id }>
								
								<h4> { etudiant.prenom } { etudiant.nom } </h4>
									
								<ul>
									<li>FORMATION : { etudiant.formation }</li>
									<li>SITUATION : { etudiant.situation }</li>
									<li>DATES : { etudiant.date_debut } - { etudiant.date_fin }</li>
									<li>EMAIL : { etudiant.email }</li>
								</ul>
								<p align="right">
									<Button color="info" id={ etudiant.etudiant_id} onClick={this.handleButtonClick}>Voir information</Button>
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