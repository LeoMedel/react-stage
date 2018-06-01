
//Dependencies
import React, { Component }from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

import './Projets.css'

class Projets extends Component
{
	constructor()
	{
		super();
		this.state = {
			projets: [],
			redirect: false,
			projetid: 0
		};

		this.handleButtonClick = this.handleButtonClick.bind(this);

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
								
								<h4> { projet.titre } </h4>
									
									<h5>Information</h5>
										<ul>
											<li><b>ORGANISME : </b> { projet.organisme }</li>
											<li><b>CHEF : </b> { projet.chef_id } { projet.prenom } {projet.nom} </li>
											<li><b>DATES : </b> { projet.date_debut } --- { projet.date_fin }</li>
										</ul>
									<p align="right">
										<Button color="info" id={projet.projet_id} onClick={this.handleButtonClick}>Voir l'Information</Button>
									</p>
								<p align="right">{ projet.organisme }</p>
							</div>
							
						)
					}
					
				</div>
			</div>
		);
	}

}

export default Projets;