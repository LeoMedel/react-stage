import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './css/FormEtudiant.css'

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="6" sm="4">
              <ListGroup className="list-Mots">
                <ListGroupItem tag="a" href="#" action color="warning">Developpement</ListGroupItem>
                <ListGroupItem tag="a" href="#" action color="warning">Web</ListGroupItem>
                <ListGroupItem tag="a" href="#" action color="warning">ApplicationWeb</ListGroupItem>
                <ListGroupItem tag="a" href="#" action color="warning">HTML</ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs="6" sm="4">
              <ListGroup className="list-Mots">
                <ListGroupItem tag="a" href="#" action color="warning">Programmation</ListGroupItem>
                <ListGroupItem tag="a" href="#" action color="warning">JAVA</ListGroupItem>
                <ListGroupItem tag="a" href="#" action color="warning">C++</ListGroupItem>
                <ListGroupItem tag="a" href="#" action color="warning">C#</ListGroupItem>
              </ListGroup>
            </Col>
            <Col sm="4">
              <ListGroup className="list-Mots">
                <ListGroupItem tag="a" href="#" action color="warning">Mobile</ListGroupItem>
                <ListGroupItem tag="a" href="#" action color="warning">Android</ListGroupItem>
                <ListGroupItem tag="a" href="#" action color="warning">iOS</ListGroupItem>
                <ListGroupItem tag="a" href="#" action color="warning">Application</ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}