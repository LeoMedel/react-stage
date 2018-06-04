//Dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import AppRoutes from './routes'; 

import { Button } from 'reactstrap';

class Login extends Component {

  constructor()
  {
    super();

    this.state = {
      user: '',
      password: '',
      redirect: false
    }
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  handleClickLogin()
  {
    this.setState({
      redirect: true
    })
    console.log(this.state.redirect)
  }

  render() {

    if (this.state.redirect) {
        return <Redirect to={"/Home"}/>   
      }
    return (

      <Button onClick={this.handleClickLogin}>Login</Button>
        
    );
  }
}

export default Login;
