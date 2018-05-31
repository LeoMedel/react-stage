//Dependencies
import React, { Component } from 'react';
//Reactstrap
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, Row, Col } from 'reactstrap';
import classnames from 'classnames';

//Components
import EtudiantList from './EtudiantList'
import Etapes from './Etapes'

//Style


class Projet extends Component
{
    constructor()
	{
		super();
		

	    this.state = {
	    	etudiants:[],
			activeTab: '1'
	    };

	    this.toggle = this.toggle.bind(this);
	    this.handleButtonClick = this.handleButtonClick.bind(this);

	}

	toggle(tab)
	{
		if (this.state.activeTab !== tab)
		{
			this.setState({
				activeTab: tab
			});
		}
    }

	handleButtonClick(e)
	{
		
	}

	componentDidMount()
{
	console.log("Projet.js ACTIVE");
}


	render()
	{
		console.log("Projet.js render ACTIVE");
		const { projet } = this.props
		const { projetName, chef, organisme } = this.props
		
		return(
			
			<div className="Projet">
				<div className="Information">
					<div className="All-Projets">
					{
						projet.length > 0 ? (
							<div>
								<Nav tabs>
									<NavItem>
										<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
											Projet
										</NavLink>
									</NavItem>

									<NavItem>
										<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
											Partenaires
										</NavLink>
									</NavItem>

									<NavItem>
										<NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
											Etapes
										</NavLink>
									</NavItem>
								</Nav>

	        					{
								projet.map((projet) =>
											
									<TabContent activeTab={this.state.activeTab} key={ projet.ID }>
										<TabPane tabId="1">
											<Row>
												<Col sm="12">
													<h1> { projet.projet } </h1>
												</Col>

												<Col sm="12">
													<Card body>
														<CardTitle>Information du Projet</CardTitle>
														<ul>
															<li><b>ORGANISME : </b> { projet.organisme }</li>
															<br/>
															<li><b>CHEF : </b> { projet.chef } ({ projet.chef_email })</li>
															<br/>
															<li><b>DATES : </b> { projet.date_debut } --- { projet.date_fin }</li>
														</ul>
													</Card>
												</Col>
											</Row>
										</TabPane>

										<TabPane tabId="2">
											<Row>
												<Col sm="12">
													<h1> Partenaires </h1>
												</Col>

												<Col sm="12">
													<Card body>
														<CardTitle>Etudiants</CardTitle>
														<EtudiantList projetName={projetName}/>
													</Card>
												</Col>
											</Row>
										</TabPane>

										<TabPane tabId="3">
											<Row>
												<Col sm="12">
													<h1> Etapes et Resultats </h1>
												</Col>

												<Col sm="12">
													<Card body>
														<CardTitle>Etapes</CardTitle>
														<Etapes projetID={projet.ID}/>
													</Card>
												</Col>
											</Row>
										</TabPane>
									</TabContent>
								)
								}
									
								
								
	        				</div>
	        			) : (
	        				<div>
	        					<h1>Aucune Projet trouvé </h1>
	        					<p className="text-center">{projetName}
	        					<br/>{chef}
	        					<br/>{organisme}</p>
	        				</div>
	        			)
	       			}

							
					</div>
				</div>
			</div>
		);
	}

}

export default Projet;