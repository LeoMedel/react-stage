//Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, Row, Col } from 'reactstrap';
import classnames from 'classnames';

//Style


class Etudiant extends Component
{
	constructor(props)
	{
		super(props);

		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.toggle = this.toggle.bind(this);

	    this.state = {
			activeTab: '1',
			redirect: false,
			projetid: 0,
			etudiantID: props.etudiantId,
			etudiantPrenom: props.etudiantPrenom,
			etudiantNom: props.etudiantNom,
			etudiantCherche: props.etudiant,
			etudiantInfo: []
	    };

	    if (this.state.etudiantID !== undefined)
		{
			fetch(`/etudiant/information2?id=${this.state.etudiantID}`)
			.then(res => res.json())
			.then(info => 

				this.setState({
					etudiantInfo: info,
				}, () => 
					console.log("Information de l'Etudiant : ", this.state.etudiantInfo)
				)
			);
		}
		else if (this.state.etudiantPrenom !== undefined && this.state.etudiantNom !== undefined)
		{
			fetch(`/etudiant/chercher?prenom=${this.state.etudiantPrenom}&nom=${this.state.etudiantNom.toUpperCase()}`)
			.then(res => res.json())
			.then(info => 
				this.setState({
					etudiantInfo: info,
				}, () => 
					console.log("Etudiant trouve : ", this.state.etudiantInfo)
					
				)
			);
		}

	}

	toggle(tab)
	{
		if(this.state.activeTab !== tab)
		{
			this.setState({
				activeTab: tab
			});
		}
	}

	handleButtonClick(e)
	{
		console.log("Regarder Projet ID "+e.target.id);
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

		return(

			<div className="Etudiant">

				<div className="Information">
					{
					this.state.etudiantInfo.length > 0 ? (
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
							this.state.etudiantInfo.map((inf) =>

								<TabContent activeTab={this.state.activeTab} key={ inf.etudiant_id }>
									<TabPane tabId="1">
										<Row>
											<Col sm="12">
												<h1> { inf.etudiant } </h1>
											</Col>

											<Col sm="12">
												<Card body>
													<CardTitle>Information personnelle</CardTitle>
													<ul>
														<li><b>Formation : </b> { inf.formation }</li>
														<br/>
														<li><b>Situatuion : </b> { inf.situation }</li>
														<br/>
														<li><b>Dates : </b> { inf.debutEtudiant } - { inf.finEtudiant }</li>
														<br/>
														<li><b>Email : </b> { inf.etudiantEmail }</li>
													</ul>
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
													<ul>
														<li><b>Chef : </b>{ inf.chef } ({inf.email})</li>
														<br/>
														<li><b>Description : </b>{ inf.projet_description }</li>
														<br/>
														<li><b>Organisme : </b>{inf.organisme}</li>
														<br/>
														<li><b>DATES : </b>{ inf.debutProjet } - {inf.finProjet}</li>
													</ul>
													<input type="button" id={inf.projet_id} value="Voir Projet" onClick={this.handleButtonClick}/>
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
													<ul>
														<li><b>Type : </b> { inf.type }</li>
														<br/>
														<li><b>Date : </b>{ inf.date }</li>
														<br/>
														<li><b>No. des Pages : </b>{inf.pages}</li>
														<br/>
														<li><b>DATES : </b>{ inf.debutProjet } - {inf.finProjet}</li>
													</ul>
												</Card>
											</Col>

											<Col sm="12">
												<Card body>
													<h3>Resume</h3>
													<p> { inf.resume } </p>
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
	        				<p className="text-center">{this.state.etudiantCherche}</p>
	        			</div>
	        		)
	       		}


				
				</div>

			</div>
		);
	}

}

export default Etudiant;