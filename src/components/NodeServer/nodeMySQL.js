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

//__________________________________________________________ MENU HOME ____________________________________________________________________________

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


//Chercher un(e) etudiant(e) avec son prenom et son nom
app.get('/etudiant/chercher', function(req, res) {
	//MySQL information

	const { prenom, nom } = req.query;
	console.log("Etudiant NAME a chercher : "+ prenom+ " "+nom);

//QUERY =>			
/*				
SELECT 
	e.etudiant_id, CONCAT(e.prenom, " ", e.nom) AS etudiant, e.formation, e.situation, e.date_debut, e.date_fin, e.email, 
	p.titre AS projet, p.organisme, p.date_debut, p.date_fin, p.description AS projet_description, 
    pu.publication_id, pu.titre AS publication, pu.type, pu.date, pu.pages, pu.resume, 
    CONCAT(c.prenom, c.nom) AS chef, c.email
	FROM etudiant AS e,projet AS p, publication AS pu, chefs As c 
	WHERE e.prenom='Leonel' AND e.nom='MEDEL ILHUICATZI' AND e.projet_id = p.projet_id AND p.chef_id = c.chef_id AND e.publication_id = pu.publication_id

*/

	const CHERCHER_ETUDIANT_QUERY = `SELECT e.etudiant_id, CONCAT(e.prenom, " ", e.nom) AS etudiant, e.formation, e.situation, e.date_debut AS debutEtudiant, e.date_fin AS finEtudiant, e.email, p.titre AS projet, p.organisme, p.date_debut AS debutProjet, p.date_fin AS finProjet, p.description AS projet_description, pu.publication_id, pu.titre AS publication, pu.type, pu.date, pu.pages, pu.resume, CONCAT(c.prenom, " ",c.nom) AS chef, c.email FROM etudiant AS e,projet AS p, publication AS pu, chefs As c WHERE e.prenom='${prenom}' AND e.nom='${nom}' AND e.projet_id = p.projet_id AND p.chef_id = c.chef_id AND e.publication_id = pu.publication_id`

	
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




//requete qui affiche tous les etudiant trouver dans la basse de donnees
app.get('/etudiants/resultats', function(req, res) {
	//MySQL information
	const QUERY_ETUDIANT = "SELECT * FROM `etudiant`"
	connection.query(QUERY_ETUDIANT, function(error, rows, fields){
		//CallBack

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


//Chercher un(e) etudiant(e) especifique avec tout ses information detaille
app.get('/etudiant/information', function(req, res) {
	//MySQL information

	const { prenom, nom } = req.query;
	console.log("Etudiant a chercher : "+prenom+" "+nom);

	//QUERY SELECT * FROM etudiants AS e, projets AS p WHERE prenom='Leonel' AND nom='MEDEL ILHUICATZI' AND e.projet_ID = p.ID
	const INFORMATION_ETUDIANT_QUERY = `SELECT * FROM etudiants AS e, projets AS p WHERE prenom='${prenom}' AND nom='${nom}' AND e.projet_ID = p.ID`
	
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

//Chercher un(e) etudiant(e) especifique avec son ID, Selon l'etudiant choisi
app.get('/etudiant/information2', function(req, res) {
	//MySQL information

	const { id } = req.query;
	console.log("Etudiant a chercher avec l'ID : "+id);

	//QUERY SELECT * FROM etudiant AS e, projet AS p WHERE 1 = e.etudiant_id AND e.projet_id  = p.projet_id
	const INFORMATION2_ETUDIANT_QUERY = `SELECT * FROM etudiant AS e, projet AS p WHERE ${id} = e.etudiant_id AND e.projet_id  = p.projet_id`
	console.log("QUERY  =>   "+INFORMATION2_ETUDIANT_QUERY);
	
	connection.query(INFORMATION2_ETUDIANT_QUERY, function(error, rows, fields) {
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


//Afficher tous les projet trouves dans le Menu des PROJETS
app.get('/projets/resultats', function(req, res) {
	//MySQL information
	//QUERY => Etudiant + Projet  ===   SELECT * FROM `projets` AS pro, `etudiants` AS etu WHERE pro.ID = etu.Projet_ID
	connection.query("SELECT * FROM projet", function(error, rows, fields){
		//CallBack

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


//Chercher un projet avec un Formulaire. Maintenant avec son titre
app.get('/projet/chercher', function(req, res) {
	//MySQL information

	const { titre, chef, organisme } = req.query;
	console.log("Projet a chercher : "+titre);
	console.log("chef : "+chef);
	console.log("organisme : "+organisme);


	//Query SELECT p.titre AS projet, p.organisme, p.date_debut, p.date_fin, p.description, 
				//CONCAT(c.prenom, " ", c.nom) AS Chef, c.email AS chef_email 
				//FROM projet AS p, chefs AS c WHERE titre='Application SoccerAPI' AND c.prenom = 'Emmanuel'
	const CHERCHER_PROJET_QUERY = `SELECT p.projet_id AS ID, p.titre AS projet, p.organisme, p.date_debut, p.date_fin, p.description, CONCAT(c.prenom, " ", c.nom) AS chef, c.email AS chef_email FROM projet AS p, chefs AS c WHERE titre='${titre}' AND c.prenom = '${chef}'`
	
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


app.get('/projet/etudiants', function(req, res) {
	//MySQL information

	const { projet } = req.query;
	console.log("Projet NAME a chercher : "+projet);

	//QUERY =>    SELECT * FROM etudiants AS e, projets AS p WHERE p.ID=1 AND e.projet_ID = p.ID
	const INFORMATION_ETUDIANT_QUERY = `SELECT p.projet_id, e.etudiant_id, e.projet_id, e.prenom, e.nom FROM etudiant AS e, projet AS p WHERE p.titre = '${projet}' AND e.projet_id = p.projet_id`
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


app.listen(5000);