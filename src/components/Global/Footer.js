
//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Style
import './css/Footer.css';

class Footer extends Component {

  //Ici on recoie les valeur pour creer le component 
  static propTypes = {
    //Voici, on peut supprimer l'option isRequired
    copyright: PropTypes.string
  };

  render() {
    {/*Quand on supprimet le isRequired, on doit ajouter un valeur par default, s'il n'y a pas de valeur dans la variable*/}
    const { copyright = "&copy; stage Leonel MEDEL ILHUICATZI" } = this.props;
    return (
      <div className="Footer">
      {/*Avec dangerouslySetInnerHTML, il va prends l'information pour l'implementer comme HTML pas securité*/}
        <p dangerouslySetInnerHTML={{__html: copyright }} />
      
      </div>
    );
  }
}

export default Footer;
