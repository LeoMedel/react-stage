
//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

//Assets, style
import icon from './images/stageIcon.png';
import './css/Header.css';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  //Ici on recoie les valeur pour creer le component 
  static propTypes = {
    //isRequired dit que on doit avoir ces valeurs pour creer le component
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  };


  render() {
    /*Avec this.props on peut avoir les valuer donnent dans le moment qu'on creet le component*/
    console.log(this.props);

    /*On peut recevoir les valeur comme ca, d'une facon plus facil*/
    const { title, data } = this.props

    return (
      <div className="Header">
        
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/" className="mr-auto"><img src={icon} className="Logo" alt="logo" /> { title }</NavbarBrand>
                <NavbarToggler onClick={this.toggle} className="mr-2"/>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    {
                      data && data.map((item, key) =>
                        
                        <NavItem key={key}>
                          <NavLink href={item.url} className="selected" >{item.title}</NavLink>
                        </NavItem>
                      )
                    }
                  </Nav>
                </Collapse>
              </Navbar>
        
      </div>
    );
  }
}

export default Header;
