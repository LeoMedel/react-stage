//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Button } from 'reactstrap';
import { Card, CardHeader, CardFooter, CardBody, CardTitle, InputGroup, Input, InputGroupAddon } from 'reactstrap';

//Style
import './Projets.css';


class Etudiants extends Component
{

	static propTypes = {
    //isRequired dit que on doit avoir ces valeurs pour creer le component
    projets: PropTypes.array.isRequired,
    motsCles: PropTypes.string
  };

	constructor()
	{
		super();
		this.state = {
			redirect: false,
			projetid: 0,
			search: '',
			recherche: 'Tous les projets'
			
		};

		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleUpdateSearch = this.handleUpdateSearch.bind(this);

	}

	handleUpdateSearch(event)
	{
		this.setState({
			search: event.target.value.substr(0, 22)
		});

		if (event.target.value === ''){
			this.setState({
				recherche: 'Tous les etudiants'
			});
		}
		else
		{
			this.setState({
				recherche: event.target.value
			});
		}
	}


	handleButtonClick(e)
	{
		this.setState({ 
				redirect: true,
				projetid: e.target.id
			});
	}

	render()
	{
		const { redirect } = this.state

		if (redirect) {
    		return <Redirect to={`/projetDetails/${this.state.projetid}`} push/>;
    	}

		const { projets, motsCles } = this.props

		let filterProjets = projets.filter(
				(projet) => {
					return 	(projet.titre.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
							projet.organisme.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
							projet.prenom.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || 
							projet.nom.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);					
				}
			)
		
		return(

			<div className="Projets">
				
				<div className="Projet-Presentation">
					<h1>Projets</h1>
					{
						motsCles!==undefined ? (
							<h2 className="text-center">{ motsCles }</h2>
						) : (
							<div>
							<p>Vous pouvez trouver un projet écrivant des données, cela va filtrer les résultats trouvés</p>
							<InputGroup className="input-sm">
								<Input placeholder="Titre, Organisme ou Chef" type="text" value={this.state.search} onChange={this.handleUpdateSearch} />
								<InputGroupAddon addonType="append" >Projet</InputGroupAddon>
							</InputGroup>
							<br/>
							<h3><p className="text-center"> Resultats. {this.state.recherche} </p></h3>
							</div>
						)
					}
					
				</div>
				<br/>
				<div className="Resultats-Projets">
					
					
				</div>

				<div className="All-Projets">
					{
						filterProjets.map((projet) =>
							<div className="Projet-Resultat" key={ projet.projet_id }>
								<Card>
									<CardHeader className="Titre text-center" tag="h3"> { projet.titre } </CardHeader>
									<CardBody className="Card-Body">
										<CardTitle>Information</CardTitle>
										<ul>
											<li><b>ORGANISME : </b> { projet.organisme }</li>
											<br/>
											<li><b>CHEF : </b> { projet.chef_id } { projet.prenom } {projet.nom} </li>
											<br/>
											<li><b>DATE DEBUT : </b> { projet.date_debut } <b>DATE FIN : </b> { projet.date_fin }</li>

										</ul>
										<p align="center">
											<Button outline color="secondary" id={projet.projet_id} onClick={this.handleButtonClick}>Voir l'Information</Button>
										</p>
									</CardBody>
									<CardFooter className="text-muted">{ projet.organisme }</CardFooter>
								</Card>
							</div>
							
						)
					}
					
				</div>
			</div>
		);
	}

}

export default Etudiants;