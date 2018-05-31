
//Dependencies
import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import { ListGroup, ListGroupItem } from 'reactstrap';



class EtudiantList extends Component
{
	constructor(props)
	{
		super(props);

		console.log("Whats props : "+props.projetName);
		
		this.state = {
			etudiants:[],
			projetName: props.projetName
		}
	}

	componentDidMount()
	{
		console.log("PROJET NAME Pour les ETUDIANTS =>   " +this.state.projetName);
		fetch(`/projet/etudiants?projet=${this.state.projetName}`)
		.then(res =>res.json())
		.then(etudiants => 
			this.setState({
				etudiants:  etudiants
			}, () => 
				console.log("Etudiants dans le projet : ", etudiants)
			)
		);

	}

	render()
	{
		return(

			<ListGroup flush>
				{
					this.state.etudiants.map((etudiant) =>
						<ListGroupItem className="text-info text-center" key={ etudiant.etudiant_id} tag="a" href={`/etudiant/${etudiant.etudiant_id}`}> 
							<b>Etudiant {etudiant.etudiant_id} :</b> 
							{ etudiant.prenom } { etudiant.nom } 
						</ListGroupItem>
					)
				}
			</ListGroup>
				
		);
	}
}

export default EtudiantList;