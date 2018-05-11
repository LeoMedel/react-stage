
//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';



class EtudiantList extends Component
{
	//Ici on recoie les valeur pour creer le component 
	static propTypes = {
		//isRequired dit que on daoit avoir ces valeurs pour creer le component
    	projetName: PropTypes.string.isRequired
    };

	constructor(props)
	{
		super(props);

		//props.projetName

		console.log("Whats props : "+props.projetName);
		
		this.state = {
			etudiants:[],
			projetName: props.projetName
		}

		//this.CreerList = this.CreerList.bind(this);

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
		const {projetName} = this.props
		return(

			<div className="EtudiantList">
				<ul>
					{
						this.state.etudiants.map((etudiant) =>

							<li key={ etudiant.etudiant_id}><b>Etudiant {etudiant.etudiant_id} :</b> { etudiant.prenom } { etudiant.nom }</li>
						)
					}
				</ul>
			</div>
		);
	}

}

export default EtudiantList;