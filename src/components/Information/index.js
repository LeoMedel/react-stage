//Dependencies
import React, { Component }from 'react';
//import { Button } from 'reactstrap';
//import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';

//Components
import Etudiant from './Etudiant'
import Projet from './Projet'

class Recherche extends Component
{
	
	constructor()
	{
		super();
		this.state = {
			info: [],
			etudiant: false,
			projet: '',
			organisme: '',
			chef: '',
			etudiantCherche: ''
		};


	}

	componentDidMount()
	{
		const { userId, userPrenom, userNom, projetName, chef, organisme } = this.props.match.params
		//On recupere l'ID de l'etudiant choisi pour faire la requete a la Base de Donnees


		if (userId !== undefined && userPrenom=== undefined && userNom=== undefined)
		{
			console.log("ID etudiant choisi : "+ userId);
			this.setState({
				etudiant: true,
				projet: false
			});

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
		else if (userId === undefined && userPrenom !== undefined && userNom !== undefined)
		{
			console.log("Etudiant cherché : "+ userPrenom + " "+ userNom.toUpperCase());
			this.setState({
				etudiant: true,
				projet: false,
				etudiantCherche: `${userPrenom} ${userNom}`
			});

			fetch(`/etudiant/chercher?prenom=${userPrenom}&nom=${userNom.toUpperCase()}`)
			.then(res => res.json())
			.then(info => 
				this.setState({
					info: info,
				}, () => 
					console.log("Etudiant trouve : ", this.state.info)
					
				)
			);
		}
		else if(userId === undefined && userPrenom === undefined && userNom === undefined && projetName !== undefined && chef !== undefined && organisme !== undefined)
		{
			console.log("Projet a chercher : " + projetName);
			this.setState({
				etudiant: false,
				projet: projetName,
				organisme: organisme,
				chef: chef
			});
			fetch(`/projet/chercher?titre=${projetName}&chef=${chef}&organisme=${organisme}`)
			.then(res => res.json())
			.then(info => 
				this.setState({
					info: info,
				}, () => 
					console.log("Projet trouve : ", this.state.info)
					
				)
			);
		}
	}



	render()
	{
		return(
			
			<div className="Information-Etudiant">

			{
				this.state.etudiant ? (
					<Etudiant etudiant={ this.state.info } etudiantC={this.state.etudiantCherche}/>
	        	) : (
	        		<Projet projet={ this.state.info } projetName={this.state.projet} chef={this.state.chef} organisme={this.state.organisme}/>
	        	)
	        }
				
			</div>
		);
	}

}

export default Recherche;