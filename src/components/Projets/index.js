
//Dependencies
import React, { Component }from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Card, CardHeader, CardFooter, CardBody,
  CardTitle } from 'reactstrap';

import './Projets.css'

class Projets extends Component
{
	constructor(props)
	{
		super(props);

		//const { projetMotCle } = this.props.match.params
		const { MotCle } = this.props.match.params
		console.log("MOT CLE => "+MotCle);
		this.state = {
			projets: [],
			redirect: false,
			projetid: 0,
			projetCle: MotCle
		};

		this.handleButtonClick = this.handleButtonClick.bind(this);
		if(MotCle !== undefined )
		{
			fetch(`/projets/MotsCles?mots=${MotCle}`)
			.then(res =>res.json())
			.then(projets => 
				this.setState({
					projets:  projets
				}, () => 
					console.log("projets MotsCles : ", projets)
				)
			);
		}

	}

	handleButtonClick(e)
	{
		this.setState({ 
				redirect: true,
				projetid: e.target.id
			});
			
			//alert("Click "+e.target.id);
	}

	componentDidMount()
	{
		if(this.state.projetCle === undefined )
		{
			fetch('/projets/resultats')
			.then(res =>res.json())
			.then(projets => 
				this.setState({
					projets:  projets
				}, () => 
					console.log("projets : ", projets)
				)
			);
		}
	}

	render()
	{
		const { redirect } = this.state

		if (redirect) {
    		return <Redirect to={`/projetDetails/${this.state.projetid}`} push/>;
    	}

		return(

			<div className="Projets">
				<h1>Projets Page </h1>

				<div className="All-Projets">
					{
						this.state.projets.map((projet) =>
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
											<li><b>DATES : </b> { projet.date_debut } --- { projet.date_fin }</li>
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

export default Projets;