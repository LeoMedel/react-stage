
//Dependencies
import React, { Component } from 'react';
import { Table } from 'reactstrap';


class Etapes extends Component
{
	constructor(props)
	{
		super(props);

		console.log("Whats props : "+props.projetID);
		
		this.state = {
			etapes:[],
			projetID: props.projetID
		}
	}


	componentDidMount()
	{
		console.log("ETAPES du projet ID =>   " +this.state.projetID);
		fetch(`/projet/etapes?projetID=${this.state.projetID}`)
		.then(res =>res.json())
		.then(etapes => 
			this.setState({
				etapes:  etapes
			}, () => 
				console.log("Etapes dans le projet : ", etapes)
			)
		);

	}

	render()
	{
		return(

			<Table striped>
				<thead>
					<tr>
						<th></th>
						<th className="text-center">Etape</th>
						<th className="text-center">Resultat de l'Etape</th>
					</tr>
				</thead>

				<tbody>
				{
				this.state.etapes.map((etape, index) =>
					<tr key={ index } >
						<th scope="row">{ index+1 }</th>
						<td className="text-center">{ etape.etape }</td>
						<td className="text-center"><p>{ etape.resultat }</p></td>
					</tr>
				)
				}	
				</tbody>
			</Table>

		);
	}
}

export default Etapes;