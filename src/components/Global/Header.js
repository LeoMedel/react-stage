
//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Assets, style
import logo from './images/logo.svg';
import './css/Header.css';

class Header extends Component {

  //Ici on recoie les valeur pour creer le component 
  static propTypes = {
    //isRequired dit que on daoit avoir ces valeurs pour creer le component
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  };

  render() {
    {/*Avec this.props on peut avoir les valuer donnent dans le moment qu'on creet le component*/}
    console.log(this.props);

    {/*On peut recevoir les valeur comme ca, d'une facon plus facil*/}
    const { title, data } = this.props
    
    {/*Voici c'est le meme chose pour recevoir les valeur*/}
    //const title = this.props.title;
    //const data = this.props.data;


    return (
      <div className="Header">
        <div className="Logo">
          
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="App-title">{ title }</h2>
          
            
            <ul className="Menu">
            {
              data && data.map((item, key) =>
                <li key={ key }><Link to={item.url}> {item.title} </Link></li>
              )
            }
          </ul>
          

          
        </div>
      </div>
    );
  }
}

export default Header;
