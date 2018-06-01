//Dependencies
import React, { Component } from 'react';
//Reactstrap
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, Row, Col } from 'reactstrap';
import classnames from 'classnames';

//Components
import EtudiantList from './EtudiantList'
import Etapes from './Etapes'

//Style


class ProjetDefini extends Component
{
    constructor(props)
	{
		super(props);
		const {projetid} = this.props.match.params
		console.log(`ProjetDefini.js PROPS => ${projetid}`);

	    this.state = {
	    	projetInfo: [],
	    	projetID: projetid,
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
		console.log("Projet.js ACTIVE componentDidMount");

	
	if(this.state.projetID !== undefined)
	    {
	    	if (this.state.projetInfo.length > 1)
	    	{
	    		console.log("Repeat");
	    	}
	    	else
	    	{
	    		console.log("Projet ID a CHERCHER : "+this.state.projetID);
		    	fetch(`/chercherProjet/chercherID?projetid=${this.state.projetID}`)
				.then(res => res.json())
				.then(info => 
					this.setState({
						projetInfo: info,
					}, () => 
						console.log("Projet trouve : ", this.state.projetInfo)
						
					)
				);
	    	}
	    }
	}


	render()
	{
		console.log("Projet.js render ACTIVE");
		
		
		return(
			
			<div className="Projet">
				<div className="Information">
					<div className="All-Projets">
					{
						this.state.projetInfo.length > 0 ? (
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
								this.state.projetInfo.map((projet) =>
											
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
														<EtudiantList projetName={projet.projet}/>
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
	        					<p className="text-center">{this.state.projetName}
	        					<br/>{this.state.chef}
	        					<br/>{this.state.organisme}</p>
	        				</div>
	        			)
	       			}

							
					</div>
				</div>
			</div>
		);
	}

}

export default ProjetDefini;