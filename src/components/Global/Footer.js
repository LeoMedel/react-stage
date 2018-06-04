
//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap';

//Style
import './css/Footer.css';

class Footer extends Component {

  //Ici on recoie les valeur pour creer le component 
  static propTypes = {
    //Voici, on peut supprimer l'option isRequired
    copyright: PropTypes.string
  };

  render() {

    /*Quand on supprimet le isRequired, on doit ajouter un valeur par default, s'il n'y a pas de valeur dans la variable*/
    const { copyright = "&copy; Stage Laboratoire d'Informatique de Grenoble, Bâtiment IMAG" } = this.props;

    return (
      
      <div className="Footer">
        <Container>
          <Row>
            <Col xs="6" sm="4">Leonel Medel Ilhuicatzi</Col>
            <Col xs="6" sm="4">leonel.ilhuicatzi07@gmail.com</Col>
            <Col sm="4">Institut Universitaire Technologie de Grenoble Alpes, Departement MMI </Col>
          </Row>
        </Container>
        <br/>
        {/*Avec dangerouslySetInnerHTML, il va prends l'information pour l'implementer comme HTML pas securité*/}
        <p dangerouslySetInnerHTML={{__html: copyright }} />
      
      </div>
    );
  }
}

export default Footer;
