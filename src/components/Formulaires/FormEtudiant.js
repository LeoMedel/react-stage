import React from 'react';

import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './css/FormEtudiant.css';

class FormEtudiant extends React.Component {

  render() {
    return (
        <div className="Formulaire-Etudiant">
          <h2>Formulaire Etudiant</h2>
          <p>Vous devez remplir les champs dans le formulaire d'etudiant, pour trouver l'information de l'etudiant</p>

          <Form className="Form-etudiant" onSubmit={this.props.chercher}>
            <FormGroup row>
              <Label for="exampleText" sm={2}>Prenom: </Label>
              <Col sm={10}>
                <Input id="prenom" type="text" value={ this.props.prenom } onChange={this.props.inputs} placeholder="First Name"/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleText" sm={2}>Nom : </Label>
              <Col sm={10}>
                <Input id="nom" type="text" value={ this.props.nom } onChange={this.props.inputs} placeholder="Last Name"/>
              </Col>
            </FormGroup>
        
            <Button className="btnEtudiant" color="secondary" block >Chercher</Button>
          </Form>
        </div>
    );
  }
}

export default FormEtudiant;