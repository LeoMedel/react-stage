
import React from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

import './css/FormEtudiant.css'

export default class Example extends React.Component {

  constructor()
  {
    super();
    this.state = {
      Mots: []
    };
  }
  componentDidMount()
  {
    fetch('/MotsCles/All')
    .then(res =>res.json())
    .then(mots => 
      this.setState({
        Mots:  mots
      }, () => 
        console.log("Mots-Cles : ", this.state.Mots)
      )
    );
  }


  render() {
    return (
        <div className="Mots-Cles">
          <h2>Mots-Clés</h2>
          <p>Voici, vous trouverez une petite liste avec quelque mots-clés et pouvoir trouver un projet aussi facilement</p>
          <Form onSubmit={this.props.click}>
            <FormGroup row>
              <Col sm={10} xs="6">
                <Input type="text" id="motsClesEcrit" value={this.props.motEcrit} onChange={this.props.inputs} placeholder="Developpement, Web, Application" />
              </Col>
              <Button sm={2}>Chercher</Button>
            </FormGroup>
          </Form>
          <br/>
          <br/>
          <Container>
            <Row>    
            {
                this.state.Mots.map((mots) =>
                  <Col xs="6" sm="4" className="list-Mots"  key={mots.mot_id} >
                    <Button block outline onClick={this.props.inputs} id={mots.mot_cle} color="info">{ mots.mot_cle } </Button>
                  </Col>
                )
              }
            
          </Row>  
        </Container>
      </div>
    );
  }
}