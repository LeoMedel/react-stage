//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Card, CardHeader, CardBody, InputGroup, Input, InputGroupAddon } from 'reactstrap';

//Style
import './Etudiants.css';


class Etudiants extends Component
{

	static propTypes = {
    //isRequired dit que on doit avoir ces valeurs pour creer le component
    etudiants: PropTypes.array.isRequired
  };

	constructor()
	{
		super();
		this.state = {
			redirect: false,
			userId: 0, 
			search: '',
			recherche: 'Tous les etudiants'
			
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

		const { etudiants } = this.props

		let filterEtudiant = etudiants.filter(
				(etudiant) => {
					return (etudiant.prenom.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || 
					etudiant.nom.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) ||
					etudiant.formation.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
					etudiant.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
					etudiant.situation.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;					
				}
			)
		
		return(

			<div className="Etudiants">
				
				<div className="Etudiant-Presentation">
					<h1>Etudiants</h1>
					<p>Vous pouvez trouver un étudiant écrivant des données, cela va filtrer les résultats trouvés</p>
					<InputGroup className="input-sm">
						<Input placeholder="Prenom ou Nom de l'etudiant, Formation, Situation ou Email" type="text" value={this.state.search} onChange={this.handleUpdateSearch} />
						<InputGroupAddon addonType="append" >Etudiant</InputGroupAddon>
					</InputGroup>
				</div>
				<br/>
				<div className="Resultats">
					<h3><p className="text-center"> Resultats. {this.state.recherche} </p></h3>
					
				</div>


				<div className="Etudiants-Trouves">
					{
						filterEtudiant.map((etudiant) =>
							<div className="Etudiant-Resultat" key={ etudiant.etudiant_id }>
								<Card >
									<CardHeader tag="h2"> { etudiant.prenom } { etudiant.nom } </CardHeader>
									<CardBody>
										<ul>
											<li>FORMATION : { etudiant.formation }</li>
											<li>SITUATION : { etudiant.situation }</li>
											<li>DATES : { etudiant.date_debut } - { etudiant.date_fin }</li>
											<li>EMAIL : { etudiant.email }</li>
										</ul>
										<p align="right">
											<Button color="info" id={ etudiant.etudiant_id} onClick={this.handleButtonClick}>Voir information</Button>
										</p>
									</CardBody>
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