
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
							<div className="Etudiant-Resultat" key={ projet.ID }>
								
									<h4> { projet.Titre } </h4>
									
										<h5>Information</h5>
											<ul>
												<li><b>Organisme : </b> { projet.Organisme }</li>
												<li><b>CHEF : </b> { projet.Chef_ID }</li>
												<li><b>DATES : </b> { projet.DateDebut } --- { projet.DateFin }</li>
											</ul>
										<p align="right">
											<Button color="info">Voir l'Information</Button>
										</p>
									<p align="right">{ projet.Organisme }</p>
							</div>
							
						)
					}
					
				</div>
			</div>
		);
	}

}

export default Projets;