
//Dependencies
import React, { Component }from 'react';
import { Redirect } from 'react-router-dom'

import './Home.css';

//Components
import FormEtudiant from '../Formulaires/FormEtudiant';
import FormProjet from '../Formulaires/FormProjet';
import MotsCles from '../Formulaires/MotsCles';

//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Home extends Component
{

	constructor()
	{
		super();
		this.state = {
			etudiant: [],
			projet: [],
			prenom: 'Leonel',
			nom: 'MEDEL ILHUICATZI',
			projetName: 'Application SoccerAPI',
			organisme: 'Universite Grenoble Alpes',
			chef: 'Emmanuel',
			redirectEtudiant: false,
			redirectProjet: false,
			modal: false,
			erMessage: '',
			champs: ''
			
		};
		this.chercherEtudiant = this.chercherEtudiant.bind(this);
		this.handleInputChanged = this.handleInputChanged.bind(this);
		this.chercherProjet = this.chercherProjet.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	toggle(champs, message) {
		this.setState({
			modal: !this.state.modal,
			erMessage: message,
			champs: champs
		});
  }

	componentDidMount()
	{
		console.log("componentDidMount active");

	}

	chercherEtudiant(e)
	{
		e.preventDefault();
		console.log('Chercher etudiant ...');

		if( this.state.prenom ==='' || this.state.nom ==='' )
		{
			if( this.state.prenom !=='' && this.state.nom ==='' )
			{
				//this.toggle("Nom", "Le champs NOM est vide, s'il vous plait de remplir");
				alert("Champ NOM vide");
			}
			else if( this.state.prenom ==='' || this.state.nom !=='' )
			{	
				//this.toggle("Prenom", "Le champs PRENOM est vide, s'il vous plait de remplir");
				alert("Champ PRENOM vide");
			}
			else
			{
				alert("Champs PRENOM et NOM vides");
				//this.toggle("Prenom et Nom", "S'il vous plait de bien remplir le formulaire");
			}
		}
		else
		{
			this.setState({ 
				redirectEtudiant: true, 
				redirectProjet: false
			});
		}
	}

	chercherProjet(e)
	{
		e.preventDefault();
		console.log('Chercher Projet ...');

		if( this.state.projetName ==='' || this.state.organisme ==='' || this.state.chef ==='')
		{
			alert("Il y a un Champs vide, S'il vous plait de bien remplir le foormulaire");
			//this.toggle("Projet error", "S'il vous plait de bien remplir le formulaire du projet pour pouvoir realeiser la recherhe")
		}
		else
		{
			this.setState({ 
				redirectEtudiant: false, 
				redirectProjet: true
			});
		}
	}

	handleInputChanged(e)
	{
		console.log(e.target.id);

		if (e.target.id === 'prenom')
		{
			this.setState({
				prenom: e.target.value
			});
		}
		else if (e.target.id === 'nom')
		{
			this.setState({
				nom: e.target.value
			});
		}
		else if (e.target.id === 'titre')
		{
			this.setState({
				projetName: e.target.value
			});
		}
		else if (e.target.id === 'organisme')
		{
			this.setState({
				organisme: e.target.value
			});
		}
		else if (e.target.id === 'chef')
		{
			this.setState({
				chef: e.target.value
			});
		}

	}


	render()
	{
		const { redirectEtudiant, redirectProjet } = this.state;

    	if (redirectEtudiant) {
    		return <Redirect to={`/etudiant/${this.state.prenom}/${this.state.nom}`} push/>;
    	}
    	else if (redirectProjet) {
    		return <Redirect to={`/projet/${this.state.projetName}/${this.state.chef}/${this.state.organisme}`} push/>;
    	}
    	
		return(
        

			<div className="Home">
{/*
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>{ this.state.champs }</ModalHeader>
					<ModalBody>
						{this.state.erMessage}
					</ModalBody>

					<ModalFooter>
						<Button color="secondary" onClick={this.toggle}>Accepter</Button>
					</ModalFooter>
				</Modal>
*/}
				<div className="Home-Presentation">
					<h1>Suivi des Projets étudiants </h1>
					<p>Avec cette Application vous pourrez faire le suivi des projets des etudiants de l'université qui sont enregistrés dans la base de donnees et comme ca vous pourrez trouvez aux etudiants et leur projet, savoir l'Information des etudiants ainsi que l'Introfmation de leur projet pendant leur formation</p>
					<br/>
					<h2>Implementation</h2>
					<ul>
						<li>Recherche d'un etudiant</li>
						<li>Recherche d'un projet</li>
						<li>Parcourir tout</li>
					</ul>
				</div>
				
				<div className="Home-Etudiant">
					<h2>Formulaire Etudiant</h2>
					<p>Vous devez remplir les champs dans le formulaire d'etudiant, pour trouver l'information de l'etudiant</p>
					{/*On va creer le component du formulaire pour chercher un etudiant avec son nom complet*/}
					{/*Au component, on envoie les methodes pour pourvoir modifier les valeurs des champs du formulaire*/}
					<FormEtudiant inputs={ this.handleInputChanged} chercher={this.chercherEtudiant } prenom={this.state.prenom} nom={this.state.nom}/>
				</div>

				<div className="Home-Projet">
					<h2>Formulaire Projet</h2>
					<p>Vous devez remplir tout les champs dans le formulaire de projets et toruver l'information d'un projet</p>
					<FormProjet inputs={ this.handleInputChanged} chercher={this.chercherProjet } titre={this.state.projetName} chef={this.state.chef} organisme={this.state.organisme}/>
				</div>

				<div className="Home-MotsCles">
					<h2>Liste des Mots-Clés</h2>
					<p>Voici, une petite liste avec les mots-cles avec lequels vous pourriez trouver un projet plus facile.</p>
					<MotsCles/>
				</div>
			</div>
		);
	}

}

export default Home;