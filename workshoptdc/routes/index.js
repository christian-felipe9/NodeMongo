var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Chris:Chris@cluster0-xxkhi.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("ProjectTeste").collection("Users");
//   // perform actions on the collection object
//   var ins = {nome:'Christian', idade:'27'};

//   collection.insertOne(ins, function(err, res){
//     console.log("data inserted");
//   })
//   client.close();
// });




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET MONGOOSE NEW USER */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'Novo Cadastro' });
});

/* POST MONGOOSE NEW USER */
router.post('/new', function (req, res) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.insert({ nome, idade }, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/');
  })
})

/* GET MONGOOSE USER LIST*/
// router.get('/userlist', function(req, res) {
//   global.db.findAll((e, docs) => {
//       if(e) { return console.log(e); }
//       res.render('userlist', { title: 'Lista de Clientes', docs: docs });
//   })
// })

/*GET MONGODB ATLAS*/
router.get('/testepost', function (req, res, next) {
  res.render('testepost', { title: 'Novo Cadastro' });
});

/*POST MONGODB ATLAS*/
router.post('/testepost', function (req, res, next) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);

  client.connect(err => {
    const collection = client.db("ProjectTeste").collection("Users");
    // perform actions on the collection object
    var ins = { nome: nome, idade: idade };

    collection.insertOne(ins, function (err, res) {
      console.log("data inserted");
    })
    client.close();
    res.redirect('/');
  });
});

/*FIND MONGODB ATLAS*/
router.get('/userlist', function (req, res, next) {
  client.connect(err => {
    const collection = client.db("ProjectTeste").collection("Users");
    // perform actions on the collection object
    collection.find().toArray(function (err, result) {
      if (err) {throw err};
      console.log(result);
      res.render('userlist', { title: 'Lista de Clientes', docs: result });
      client.close();
    });
  });
});

module.exports = router;