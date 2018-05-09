
//Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom'

//Components
import App from './components/App';
import Etudiants from './components/Etudiants';
import Projets from './components/Projets';
import Home from './components/Home';
import Page404 from './components/Page404';

import EtudiantInfo from './components/EtudiantInfo';


const AppRoutes = () =>

<App>
	<Switch>
		<Route exact path="/" component={ Home } />
		<Route exact path="/etudiants" component={ Etudiants } />
		<Route exact path="/projets" component={ Projets } />
		<Route exact path="/etudiant/:userId" component={ EtudiantInfo} />
		<Route component={ Page404 } />
	</Switch>
</App>;

export default AppRoutes;