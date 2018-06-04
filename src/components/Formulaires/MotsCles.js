
import React from 'react';

import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './css/FormEtudiant.css'

export default class Example extends React.Component {

  constructor()
  {
    super();
    this.state = {
      Mots: [],
      redirectMotsCles: false,
      motsChoisi: ''
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
          
          <Container>
            <Row>    
            {
                this.state.Mots.map((mots) =>
                  <Col xs="6" sm="4" className="list-Mots"  key={mots.mot_id} >
                    <Button block outline onClick={this.props.click} id={mots.mot_cle} color="info">{ mots.mot_cle } </Button>
                  </Col>
                )
              }
            
          </Row>  
        </Container>
      </div>
    );
  }
}