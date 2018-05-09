//Dependencies
import React, { Component }from 'react';
//import { Button } from 'reactstrap';
//import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';

class Projets extends Component
{
	
	constructor()
	{
		super();
		this.state = {
			idEtudiant: 0,
			info: []
		};


	}

	componentDidMount()
	{
		//On recupere l'ID de l'etudiant choisi pour faire la requete a la Base de Donnees
		const { userId } = this.props.match.params


		console.log("ID etudiant choisi : "+ userId);
		

		fetch(`/etudiant/information2?id=${userId}`)
		.then(res => res.json())
		.then(info => 

			this.setState({
				info: info,
				

			}, () => 
				console.log("Information de l'Etudiant : ", this.state.info)

			)

		);
	}



	render()
	{
		return(
			
			<div className="Information-Etudiant">
				{
					/*Condition pour montrer le contenu*/
					/*S'il y a information d'un etudiant s'affiche*/
					this.state.info.length >0 ? (
						<div className="Etudiant">
							{
								this.state.info.map((inf) =>
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
			/*Sinon, s'affiche un element pour dire qu'il n'y a pas d'information de l'etudiant cherche*/
				) : (
					<div>

						<h3>Aucune Etudiant </h3>
					</div>
				)
			}
			</div>
		);
	}

}

export default Projets;