//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';

//Menu data
import data from './data/menu';


class App extends Component {

  static propTypes = {

    children: PropTypes.object.isRequired

  };

  render() {

    const { children } = this.props;

    return (
      <div className="App">
        {/*Depuis le nom du Component on peut envoyer des valeurs avec des variables*/}
        <Header title="React Stage" data={data}/>
        <Content body={ children }/>
        <Footer copyrigth="&copy; Stage2018 Leonel MEDEL ILHUICATZI" />
      </div>
    );
  }
}

export default App;
