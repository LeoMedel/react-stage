var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({

	//Properties...

	host: 'localhost',
	user: 'root',
	password: '',
	database: 'react'

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

//requete qui affiche tous les etudiant trouver dans la basse de donnees
app.get('/etudiants/resultats', function(req, res) {
	//MySQL information   
	connection.query("SELECT * FROM etudiants", function(error, rows, fields){
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


//Chercher un(e) etudiant(e) avec son prenom et son nom
app.get('/etudiant/chercher', function(req, res) {
	//MySQL information

	const { prenom, nom } = req.query;
	console.log("Etudiant a chercher : "+prenom+" "+nom);

	const CHERCHER_ETUDIANT_QUERY = `SELECT * FROM etudiants WHERE prenom='${prenom}' AND nom='${nom}'`
	
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

//Chercher un(e) etudiant(e) especifique avec son ID
app.get('/etudiant/information2', function(req, res) {
	//MySQL information

	const { id } = req.query;
	console.log("Etudiant a chercher avec l'ID : "+id);

	//QUERY SELECT * FROM etudiants AS e, projets AS p WHERE prenom='Leonel' AND nom='MEDEL ILHUICATZI' AND e.projet_ID = p.ID
	const INFORMATION2_ETUDIANT_QUERY = `SELECT * FROM etudiants AS e, projets AS p WHERE ${id} = e.ID`
	
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


//Afficher tous les projet trouves
app.get('/projets/resultats', function(req, res) {
	//MySQL information
	//QUERY => Etudiant + Projet  ===   SELECT * FROM `projets` AS pro, `etudiants` AS etu WHERE pro.ID = etu.Projet_ID
	connection.query("SELECT * FROM projets", function(error, rows, fields){
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


//Chercher un projet avec son titre
app.get('/projet/chercher', function(req, res) {
	//MySQL information

	const { titre } = req.query;
	console.log("Projet a chercher : "+titre);

	//Query
	const CHERCHER_PROJET_QUERY = `SELECT * FROM projets WHERE Titre='${titre}'`
	
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
	const INFORMATION_ETUDIANT_QUERY = `SELECT * FROM etudiants AS e, projets AS p WHERE p.ID=${id} AND e.projet_ID = p.ID`
	
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