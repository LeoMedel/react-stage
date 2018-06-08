import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './css/FormEtudiant.css';

export default class FormProjet extends React.Component {
  render() {
    return (
        <div className="Formulaire-Projet">
          <h2>Formulaire Projet</h2>
          <p>Comme le Formulaire des Etudiants, ici vous devez également remplir tout les champs dans le formulaire de projet et vous trouverez l'information detaillé d'un projet</p>

          <Form className="Form-Projet" onSubmit={this.props.chercher}>
            <FormGroup row>
              <Label for="exampleText" sm={2}>Titre: </Label>
              <Col sm={10}>
                <Input type="text" name="text" id="titre" value={ this.props.titre } onChange={this.props.inputs} placeholder="Projet Name"/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleText" sm={2}>Chef : </Label>
              <Col sm={10}>
                <Input type="text" name="text" id="chef" value={ this.props.chef } onChange={this.props.inputs} placeholder="Chef Name"/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleText" sm={2}>Organisme : </Label>
              <Col sm={10}>
                <Input type="text" name="text" id="organisme" value={ this.props.organisme } onChange={this.props.inputs} placeholder="University, Entreprise, Agency"/>
              </Col>
            </FormGroup>
            <Button className="btnEtudiant" color="secondary" block >Chercher</Button>
          </Form>
        </div>
    );
  }
}