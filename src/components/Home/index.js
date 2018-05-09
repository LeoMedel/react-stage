
//Dependencies
import React, { Component }from 'react';

import './Home.css';

//Components
import FormEtudiant from '../Formulaires/FormEtudiant';
import FormProjet from '../Formulaires/FormProjet';
import MotsCles from '../Formulaires/MotsCles';


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
			projetName: 'Developpement Application Soccer Android',
			organisme: '',
			chef: ''
			
		};
		this.chercherEtudiant = this.chercherEtudiant.bind(this);
		this.handleInputChanged = this.handleInputChanged.bind(this);
		this.chercherProjet = this.chercherProjet.bind(this);
	}

	componentDidMount()
	{
		console.log("componentDidMount active");

	}

	chercherEtudiant(e)
	{
		e.preventDefault();
		console.log('Chercher etudiant ...');

		fetch(`/etudiant/chercher?prenom=${this.state.prenom}&nom=${this.state.nom.toUpperCase()}`)
		.then(res => res.json())
		.then(etudiant1 => 
			this.setState({
				etudiant: etudiant1
			}, () => 
				console.log("Etudiant trouve : ", this.state.etudiant)
				
			)
		);


	}

	chercherProjet(e)
	{
		e.preventDefault();
		console.log('Chercher Projet ...');

		fetch(`/projet/chercher?titre=${this.state.projetName}`)
		.then(res => res.json())
		.then(projet => 
			this.setState({
				projet: projet
			}, () => 
				console.log("Projet trouve : ", this.state.projet)
				
			)
		);
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
		return(

			<div className="Home">
				<div className="Home-Presentation">
					<h1>Home Page </h1>
					<p>Avec cette Application vous pourrez faire le suivi des projets des etudiants de l'université </p>
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
					<p>Seulement, Vous devez remplir tout les champs dans le formulaire d'etudiant</p>
					{/*On va creer le component du formulaire pour chercher un etudiant avec son nom complet*/}
					{/*Au component, on envoie les methodes pour pourvoir modifier les valeurs des champs du formulaire*/}
					<FormEtudiant inputs={ this.handleInputChanged} chercher={this.chercherEtudiant } prenom={this.state.prenom} nom={this.state.nom}/>
				</div>
				<div className="Home-Projet">
					<h2>Formulaire Projet</h2>
					<p>Seulement, Vous devez remplir tout les champs dans le formulaire d'etudiants</p>
					<FormProjet inputs={ this.handleInputChanged} chercher={this.chercherProjet } titre={this.state.projetName} chef={this.state.chef} organisme={this.state.organisme}/>
				</div>
				<div className="Home-MotsCles">
					<h2>Liste des Mots-Clés</h2>
					<MotsCles/>
					
				</div>
			</div>
		);
	}

}

export default Home;