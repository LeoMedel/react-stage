
//Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom'

//Components
import App from './components/App';
import Etudiants from './components/Etudiants';
import Projets from './components/Projets';
import Home from './components/Home';
import Page404 from './components/Page404';

import Recherche from './components/Information';
import ProjetDefini from './components/Information/ProjetDefini';


const AppRoutes = () =>


<App>
	<Switch>
		<Route exact path="/" component={ Home } />
		<Route exact path="/Home" component={ Home } />
		<Route exact path="/etudiants" component={ Etudiants } />
		<Route path="/projets/" component={ Projets } />
		<Route path="/projets_results/:MotCle" component={ Projets } />
		<Route path="/etudiant/:userId" exact component={Recherche} />
		<Route path="/etudiant/:userPrenom/:userNom" exact component={Recherche} />
		<Route path="/projet/:projetName/:chef/:organisme" exact component={Recherche} />
		<Route path="/projetDetails/:projetid" exact component={ProjetDefini} />
		
		<Route component={ Page404 } />
	</Switch>
</App>;

export default AppRoutes;