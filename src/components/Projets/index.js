
//Dependencies
import React, { Component }from 'react';
import './Projets.css'
import Cards from './Cards'

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
			projetCle: MotCle
		};


		

	}

	componentDidMount()
	{
		if(this.state.projetCle !== undefined )
		{
			fetch(`/projets/MotsCles?mots=${this.state.projetCle}`)
			.then(res =>res.json())
			.then(projets => 
				this.setState({
					projets:  projets
				}, () => 
					console.log("projets MotsCles : ", projets)
				)
			);
		}

		if(this.state.projetCle === undefined )
		{
			fetch('/projets/resultats')
			.then(res =>res.json())
			.then(projets => 
				this.setState({
					projets:  projets,
					
				}, () => 
					console.log("projets : ", projets)
				)
			);
		}
	}

	render()
	{
		return(

			<div className="Projets">
				<Cards projets = {this.state.projets} motsCles={this.state.projetCle}/>
			</div>
		);
	}

}

export default Projets;