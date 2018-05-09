
//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Style
import './css/Content.css';

class Content extends Component {

	static propTypes = {

		body: PropTypes.object.isRequired
	};


	render() {
		console.log("RENDER APP");
		console.log(" ");

		const { body } = this.props

		return (
			<div className="Content">
				
				{ body }

			</div>
		);
	}
}

export default Content;
