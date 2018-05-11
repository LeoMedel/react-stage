
//Dependencies
import React, { Component }from 'react';
import { Button } from 'reactstrap';

import './Projets.css'

class Projets extends Component
{
	constructor()
	{
		super();
		this.state = {
			projets: []
		};

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
		return(

			<div className="Projets">
				<h1>Projets Page </h1>

				<div className="All-Projets">
					{
						this.state.projets.map((projet) =>
							<div className="Etudiant-Resultat" key={ projet.projet_id }>
								
									<h4> { projet.titre } </h4>
									
										<h5>Information</h5>
											<ul>
												<li><b>ORGANISME : </b> { projet.organisme }</li>
												<li><b>CHEF : </b> { projet.chef_id }</li>
												<li><b>DATES : </b> { projet.date_debut } --- { projet.date_fin }</li>
											</ul>
										<p align="right">
											<Button color="info">Voir l'Information</Button>
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