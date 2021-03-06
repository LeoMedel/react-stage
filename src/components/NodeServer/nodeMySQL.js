var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({

	//Properties...

	host: 'localhost',
	user: 'root',
	password: '',
	database: 'application_stage'

});

//Connection avec la Basse de Donnes
connection.connect(function(error){

	if(!!error)
	{
		console.log('ERROR avec la connection !');
	}
	else
	{
		console.log('Connection realise avec la Basse de Donnees !');
	}
})



//REQUETES --------------------------------------------------------------------------------------------------------------------------------------

//Chercher un(e) etudiant(e) avec son prenom et son nom
app.get('/etudiant/id', function(req, res) {
	//MySQL information

	const { prenom, nom } = req.query;
	console.log("Etudiant a chercher : "+prenom+" "+nom);

	const CHERCHER_ID_ETUDIANT_QUERY = `SELECT e.etudiant_id FROM etudiant AS e WHERE e.prenom='${prenom}' AND e.nom='${nom}'`

	
	connection.query(CHERCHER_ID_ETUDIANT_QUERY, function(error, rows, fields) {
		if (!!error) {
			console.log('Error in the Query');
			console.log(error);
		}
		else
		{
			console.log('Successful Query\n');
			console.log('Search student ...');
			console.log(rows);
			
		}

		res.json(rows);
	});

})
//__________________________________________________________ MENU HOME ____________________________________________________________________________

//------------------------------------ F O R M U L A I R E ------------------------ E T U D I A N T------------------------------------------------

//Chercher un(e) etudiant(e) avec son prenom et son nom
app.get('/etudiant/chercher', function(req, res) {
	//MySQL information

	const { prenom, nom } = req.query;
	console.log("Etudiant NAME a chercher : "+ prenom+ " "+nom);

	//QUERY =>
	const CHERCHER_ETUDIANT_QUERY = `SELECT e.etudiant_id, CONCAT(e.prenom, " ", e.nom) AS etudiant, e.formation, e.situation, 
									 DATE_FORMAT(e.date_debut, "%d %M %Y") AS debutEtudiant, DATE_FORMAT(e.date_fin, "%d %M %Y") AS finEtudiant, 
									 e.email as etudiantEmail, p.projet_id, p.titre AS projet, p.organisme, 
									 DATE_FORMAT(p.date_debut, "%d %M %Y") AS debutProjet, DATE_FORMAT(p.date_fin, "%d %M %Y") AS finProjet, 
									 p.description AS projet_description, pu.publication_id, pu.titre AS publication, pu.type, pu.date, pu.pages, 
									 pu.resume, CONCAT(c.prenom, " ",c.nom) AS chef, c.email 

									 FROM etudiant AS e,projet AS p, publication AS pu, chefs As c WHERE e.prenom='${prenom}' AND e.nom='${nom}' 
									 AND e.projet_id = p.projet_id AND p.chef_id = c.chef_id AND e.publication_id = pu.publication_id`

	
	connection.query(CHERCHER_ETUDIANT_QUERY, function(error, rows, fields) {
		if (!!error) {
			console.log('Error in the Query');
			console.log(error);
		}
		else
		{
			console.log('Successful Query\n');
			console.log('Search student ...');
			console.log(rows);
			
		}

		res.json(rows);
	});

})

//------------------------------------ F O R M U L A I R E ------------------------ P R O J E T ------------------------------------------------------


//Chercher un projet avec un Formulaire. Maintenant avec son titre
app.get('/projet/chercher', function(req, res) {
	
	//Parametres
	const { titre, chef, organisme } = req.query;
	console.log("Projet a chercher : "+titre);
	console.log("chef : "+chef);
	console.log("organisme : "+organisme);

	//Query 
	const CHERCHER_PROJET_QUERY = `SELECT p.projet_id, p.titre AS projet, p.organisme, 
								   DATE_FORMAT(p.date_debut, "%d %M %Y") AS date_debut, DATE_FORMAT(p.date_fin, "%d %M %Y") AS date_fin, 
								   p.description, CONCAT(c.prenom, " ", c.nom) AS chef, c.email AS chef_email 

								   FROM projet AS p, chefs AS c WHERE titre='${titre}' AND c.prenom = '${chef}' AND p.organisme = '${organisme}'`
	
	connection.query(CHERCHER_PROJET_QUERY, function(error, rows, fields) {
		if (!!error) {
			console.log('Error in the Query');
		}
		else
		{
			console.log('Successful Query\n');
			console.log('Search Projet ...');
			console.log(rows);
		}
		res.json(rows);
	});
})


//__________________________________________________________ MENU ETUDIANTS ____________________________________________________________________________

//------------------------------------------- P A G E ------------------------ E T U D I A N T S ------------------------------------------------------

//requete qui affiche tous les etudiant trouver dans la basse de donnees
app.get('/etudiants/resultats', function(req, res) {
	
	//Query
	const QUERY_ETUDIANT = `SELECT *, DATE_FORMAT(e.date_debut, "%d %M %Y") AS date_debut, 
									  DATE_FORMAT(e.date_fin, "%d %M %Y") AS date_fin 

								FROM etudiant AS e`

	connection.query(QUERY_ETUDIANT, function(error, rows, fields){
		
		if (!!error) {
			console.log('Error in the Query');
		}
		else
		{
			console.log('Successful Query\n');
			console.log(rows);
		}
		res.json(rows);
	});

})


//__________________________________________________________ MENU PROJETS ____________________________________________________________________________

//------------------------------------------- P A G E ------------------------ P R O J E T S ---------------------------------------------------------

//Afficher tous les projet trouves dans le Menu des PROJETS
app.get('/projets/resultats', function(req, res) {
	//query
	const QUERY_PROJETS =`SELECT *, DATE_FORMAT(p.date_debut, "%d %M %Y") AS date_debut, DATE_FORMAT(p.date_fin, "%d %M %Y") AS date_fin 
							FROM projet AS p, chefs AS c WHERE p.chef_id = c.chef_id`
	connection.query(QUERY_PROJETS, function(error, rows, fields){

		if (!!error) {
			console.log('Error in the Query');
		}
		else
		{
			console.log('Successful Query\n');
			console.log(rows);
		}
		res.json(rows);
	});

})

//__________________________________________________________ INFORMATIONS  ____________________________________________________________________________

//------------------------------------------- C H O I S I R ------------------------ E T U D I A N T ---------------------------------------------------------

//Chercher un(e) etudiant(e) especifique avec son ID, Selon l'etudiant choisi
app.get('/etudiant/information2', function(req, res) {

	//Paramettre
	const { id } = req.query;
	console.log("Etudiant a chercher avec l'ID : "+id);

	const INFORMATION_ID_ETUDIANT_QUERY = `SELECT e.etudiant_id, CONCAT(e.prenom, " ", e.nom) AS etudiant, e.formation, e.situation, 
											DATE_FORMAT(e.date_debut, "%d %M %Y") AS debutEtudiant, DATE_FORMAT(e.date_fin, "%d %M %Y") AS finEtudiant,
											e.email AS etudiantEmail, p.projet_id, p.titre AS projet, p.organisme, 
											DATE_FORMAT(p.date_debut, "%d %M %Y") AS debutProjet, DATE_FORMAT(p.date_fin, "%d %M %Y") AS finProjet, 
											p.description AS projet_description, pu.publication_id, pu.titre AS publication, pu.type, 
											DATE_FORMAT(pu.date, "%d %M %Y") AS date, pu.pages, pu.resume, CONCAT(c.prenom, " ", c.nom) AS chef, c.email 

											FROM etudiant AS e,projet AS p, publication AS pu, chefs As c 
											WHERE e.etudiant_id = ${id} 
											AND e.projet_id = p.projet_id AND p.chef_id = c.chef_id AND e.publication_id = pu.publication_id`
	
	connection.query(INFORMATION_ID_ETUDIANT_QUERY, function(error, rows, fields) {
		if (!!error) {
			console.log('Error in the Query');
			console.log(error);
		}
		else
		{
			console.log('Successful Query\n');
			console.log('Search ID student ...');
			console.log(rows);
		}
		res.json(rows);
	});
})

//----------------------------------- E T U D I A N T S ---- D A N S ---- L E ------- M E M E ----------P R O J E T-----------------------------------

//Query pour faire la recherche des etudiants dans le meme Projet
app.get('/projet/etudiants', function(req, res) {
	//MySQL information

	const { projet } = req.query;
	console.log("Projet NAME a chercher : "+projet);

	//QUERY =>    SELECT * FROM etudiants AS e, projets AS p WHERE p.ID=1 AND e.projet_ID = p.ID
	const INFORMATION_ETUDIANT_QUERY = `SELECT p.projet_id, e.etudiant_id, e.projet_id, e.prenom, e.nom 
										FROM etudiant AS e, projet AS p WHERE p.titre = '${projet}' AND e.projet_id = p.projet_id`
	
	console.log("Query etudiants dans un projet ::::     "+INFORMATION_ETUDIANT_QUERY);


	connection.query(INFORMATION_ETUDIANT_QUERY, function(error, rows, fields) {
		if (!!error) {
			console.log('Error in the Query');
			console.log(error);
		}
		else
		{
			console.log('Successful Query\n');
			console.log('Search student ...');
			console.log(rows);
			
		}

		res.json(rows);
	});


})

//----------------------------------- E T A P E S ---- D A N S ---- L E ------- M E M E ----------P R O J E T-----------------------------------
//Query pour faire la recherche des etudiants dans le meme Projet
app.get('/projet/etapes', function(req, res) {
	//MySQL information

	const { projetID } = req.query;
	console.log("etapes du Projet a chercher : "+projetID);

	//QUERY =>    SELECT * FROM etudiants AS e, projets AS p WHERE p.ID=1 AND e.projet_ID = p.ID
	const ETAPES_QUERY = `SELECT * FROM etapes WHERE projet_id = ${projetID}`
	console.log("Query etudiants dans un projet ::::     "+ETAPES_QUERY);


	connection.query(ETAPES_QUERY, function(error, rows, fields) {
		if (!!error) {
			console.log('Error in the Query');
			console.log(error);
		}
		else
		{
			console.log('Successful Query\n');
			console.log('Search student ...');
			console.log(rows);
			
		}

		res.json(rows);
	});


})


//Chercher un projet avec un ID.
app.get('/chercherProjet/chercherID', function(req, res) {
	
	//Parametres
	const { projetid } = req.query;
	console.log("Projet ID a chercher : "+projetid);

	//Query 
	const PROJETID_QUERY = `SELECT 
	p.projet_id AS ID, p.titre AS projet, p.organisme, 
	DATE_FORMAT(p.date_debut, "%d %M %Y") AS date_debut, DATE_FORMAT(p.date_fin, "%d %M %Y") AS date_fin, p.description, 
    CONCAT(c.prenom, " ", c.nom) AS chef, c.chef_id, c.email AS chef_email
    FROM projet AS p, chefs AS c
    WHERE p.projet_id ='${projetid}'
    AND p.chef_id = c.chef_id
    
    `
	
	connection.query(PROJETID_QUERY, function(error, rows, fields) {
		if (!!error) {
			console.log('Error in the Query');
		}
		else
		{
			console.log('Successful Query\n');
			console.log('Search Projet ...');
			console.log(rows);
		}
		res.json(rows);
	});
})




//Afficher tous les projet trouves dans le Menu des PROJETS
app.get('/projets/MotsCles', function(req, res) {

	//Parametres
	const { mots } = req.query;
	console.log("Mots-Cles a chercher : "+mots);

	//query
	const QUERY_MOT_PROJET =`SELECT *, DATE_FORMAT(p.date_debut, "%d %M %Y") AS date_debut, DATE_FORMAT(p.date_fin, "%d %M %Y") AS date_fin FROM mots_cles AS mc, projet as p, chefs as c WHERE mc.mot_cle ='${mots}' AND mc.mot_projet = p.mot_projet AND p.chef_id = c.chef_id`
	connection.query(QUERY_MOT_PROJET, function(error, rows, fields){

		if (!!error) {
			console.log('Error in the Query');
			console.log(QUERY_MOT_PROJET);
		}
		else
		{
			console.log('Successful Query\n');
			console.log(rows);
		}
		res.json(rows);
	});

})


//Afficher tous les projet trouves dans le Menu des PROJETS
app.get('/MotsCles/All', function(req, res) {

	//Parametres
	const { motCle } = req.query;
	console.log("Projet ID a chercher : "+motCle);

	//query
	const QUERY_PROJETS =`SELECT * FROM mots_cles`
	connection.query(QUERY_PROJETS, function(error, rows, fields){

		if (!!error) {
			console.log('Error in the Query');
		}
		else
		{
			console.log('Successful Query\n');
			console.log(rows);
		}
		res.json(rows);
	});

})


//------------------------------------------- C H O I S I R ------------------------ P R O J E T ---------------------------------------------------------


//       Il faut ajouter la function dans le bouton pour choisir un projet, et modifier le query 

/*

//Chercher un projet avec son titre selon l'etudiant
app.get('/projet/information', function(req, res) {
	//MySQL information

	const { id } = req.query;
	console.log("ID Projet a chercher : "+id);

	//QUERY =>    SELECT * FROM etudiants AS e, projets AS p WHERE p.ID=1 AND e.projet_ID = p.ID
	const INFORMATION_ETUDIANT_QUERY = `SELECT * FROM etudiant AS e, projet AS p WHERE p.projet_id = ${id} AND e.projet_id = p.projet_id`
	
	connection.query(INFORMATION_ETUDIANT_QUERY, function(error, rows, fields) {
		if (!!error) {
			console.log('Error in the Query');
			console.log(error);
		}
		else
		{
			console.log('Successful Query\n');
			console.log('Search student ...');
			console.log(rows);
			
		}

		res.json(rows);
	});


})

*/

app.listen(process.env.PORT || 3001);