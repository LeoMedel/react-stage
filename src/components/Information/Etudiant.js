//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

//Style


class Etudiant extends Component
{

	//Ici on recoie les valeur pour creer le component 
	static propTypes = {
    	etudiant: PropTypes.array.isRequired
    	
    };

	constructor()
	{
		super();
/*
		this.state ={
			etudiant: this.props.info,
			info: props.id
			
		}
*/


		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.toggle = this.toggle.bind(this);

	    this.state = {
			activeTab: '1'
	    };

	}

	toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

	handleButtonClick(e)
	{
		
	}


	render()
	{
		const { etudiant } = this.props
		return(

			<div className="Etudiant">

				<div className="Information">
					{
					etudiant.length > 0 ? (
						<div>
						<Nav tabs>
							<NavItem>
								<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
									Etudiant
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
									Projet
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
									Publication
								</NavLink>
							</NavItem>
						</Nav>
						
						{
							etudiant.map((inf) =>

								<TabContent activeTab={this.state.activeTab} key={ inf.etudiant_id }>
									<TabPane tabId="1">
										<Row>
											<Col sm="12">
												<h1> { inf.etudiant } </h1>
											</Col>

											<Col sm="12">
												<Card body>
													<CardTitle>Information personnelle</CardTitle>
													<CardText>
														<ul>
															<li><b>Formation : </b> { inf.formation }</li>
															<br/>
															<li><b>Situatuion : </b> { inf.situation }</li>
															<br/>
															<li><b>Dates : </b> { inf.debutEtudiant } - { inf.finEtudiant }</li>
															<br/>
															<li><b>Email : </b> { inf.etudiantEmail }</li>
														</ul>
													</CardText>
												</Card>
											</Col>
										</Row>
									</TabPane>

									<TabPane tabId="2">
										<Row>
											<Col sm="12">
												<h1> { inf.projet } </h1>
											</Col>

											<Col sm="12">
												<Card body>
													<CardTitle>Information du Projet</CardTitle>
													<CardText>
														<ul>
															<li><b>Chef : </b>{ inf.chef } ({inf.email})</li>
															<br/>
															<li><b>Description : </b>{ inf.projet_description }</li>
															<br/>
															<li><b>Organisme : </b>{inf.organisme}</li>
															<br/>
															<li><b>DATES : </b>{ inf.debutProjet } - {inf.finProjet}</li>
														</ul>
													</CardText>
												</Card>
											</Col>
										</Row>
									</TabPane>

									<TabPane tabId="3">
										<Row>
											<Col sm="12">
												<h1> "{ inf.publication }" </h1>
											</Col>

											<Col sm="12">
												<Card body>
													<CardTitle>Publication</CardTitle>
													<CardText>
														<ul>
															<li><b>Type : </b> { inf.type }</li>
															<br/>
															<li><b>Date : </b>{ inf.date }</li>
															<br/>
															<li><b>No. des Pages : </b>{inf.pages}</li>
															<br/>
															<li><b>DATES : </b>{ inf.debutProjet } - {inf.finProjet}</li>
														</ul>
													</CardText>
												</Card>
											</Col>

											<Col sm="12">
												<Card body>
													<CardTitle><h3>Resume</h3></CardTitle>
													<CardText> { inf.resume } </CardText>
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
	        				<h1>Aucune Etudiant trouvé </h1>
	        			</div>
	        		)
	       		}


				
				</div>

			</div>
		);
	}

}

export default Etudiant;