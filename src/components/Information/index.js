//Dependencies
import React, { Component }from 'react';
//import { Button } from 'reactstrap';
//import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';

//Components
import Etudiant from './Etudiant'
import Projet from './Projet'

//Style
//import './css/Information.css';

class Recherche extends Component
{
	
	constructor(props)
	{
		super(props);
		const { userId, userPrenom, userNom, projetName, chef, organisme, projetid } = this.props.match.params

		this.state = {
			info: [],
			etudiant: false,
			projet: false,
			etudiantId: userId,
			prenom: userPrenom,
			nom: userNom,
			etudiantCherche: `${userPrenom} ${userNom}`,
			projetN: projetName,
			organisme: organisme,
			chef: chef,
			projetid: projetid
		};

		console.log(`userId ${this.state.etudiantId}, Prenom ${this.state.prenom}, Nom ${this.state.nom}, projetName ${this.state.projetN}, chef ${this.state.chef}, organisme ${this.state.organisme}, projet ID ${this.state.projetid} `);
		
	}

	componentDidMount()
	{
		if (this.state.etudiantId !== undefined && this.state.prenom === undefined && this.state.nom === undefined)
		{
			console.log("ID etudiant choisi : "+ this.state.etudiantId);
			this.setState({
				etudiant: true,
				projet: false
			});
		}
		else if (this.state.etudiantId === undefined && this.state.prenom !== undefined && this.state.nom !== undefined)
		{
			console.log("Etudiant cherché : "+ this.state.prenom + " "+ this.state.nom.toUpperCase());
			this.setState({
				etudiant: true,
				projet: false
			});
		}
		

		else if(this.state.projetN !== undefined && this.state.chef !== undefined && this.state.organisme !== undefined)
		{
			console.log("Projet a chercher : " + this.state.projetN);
			this.setState({
				etudiant: false,
				projet: true
			});
		}
		else if(this.state.projetid !== undefined)
		{
			console.log("Projet ID a chercher : " + this.state.projetid);
			this.setState({
				etudiant: false,
				projet: true
			});
		}
	}



	render()
	{
		console.log("ACTIVE Information.js Render")
		const {etudiant} = this.state
		console.log(etudiant);
		return(
			
			<div className="Information-Etudiant">
			{
				etudiant ? (
					<Etudiant etudiantId={ this.state.etudiantId } etudiantPrenom={this.state.prenom} etudiantNom={this.state.nom} etudiant={this.state.etudiantCherche}/>
	        	) : (
	        		<Projet projetid={this.state.projetid} projetName={this.state.projetN} chef={this.state.chef} organisme={this.state.organisme}/>
	        	)
	        }
			</div>
		);
	}

}

export default Recherche;