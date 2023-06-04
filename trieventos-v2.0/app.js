const express = require("express");
const ejs = require('ejs');



const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('home');
});

app.get('/sobre', function(req, res){
    res.render('sobre');
});

app.get('/sobre/planos', function(req, res){
    res.render('planos');
});

app.get('/estabelecimentos/x', function(req,res){
    res.render('estabelecimentos');
});

app.get('/estabelecimentos/x/horarios', function(req,res){
    res.render('horarios');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/perfil', function(req, res){
    res.render('perfil');
});

app.get('/cadastrar-usuario', function(req, res){
    res.render('cadastro-usuario');
});

app.get('/redefinir-senha', function(req, res){
    res.render('redefinir-senha');
})

app.listen(3000, function(req, res){
    console.log('Server running on 3000');
})