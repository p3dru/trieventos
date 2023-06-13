const express = require("express");
const ejs = require('ejs');



const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    //console.log(res.json);
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

//gets-logins
//login padrão
app.get('/login', function(req, res){
    res.render('login/login');
});

//login de usuário comum
app.get('/login-locatarios', function(req, res){
    res.render('login/login-usuarios');
})

//login de estabelecimentos
app.get('/login-estabelecimentos', function(req, res){
    res.render('login/login-estabelecimentos')
})

app.get('/perfil', function(req, res){
    res.render('perfil');
});

app.get('/cadastrar-usuario', function(req, res){
    res.render('cadastro-usuario');
});

app.get('/redefinir-senha', function(req, res){
    res.render('redefinir-senha');
})

app.get('/x/gerenciar', function(req, res){
    res.render('alterar-perfil');
})

app.get('/x/locacoes', function(req, res){
    res.render('locacoes');
})



//gets de estabelecimentos
app.get('/login-estabelecimentos', function(req, res){
    res.render('login-estabelecimentos');
})

//tela inicial dos estabelecimentos
app.get('/local', function(req, res){
    //trocar o local para pegar o usuário pelo parâmetro
    res.render('estabelecimentos/home');
})

//posts
app.post('/cadastrar-usuario', function(req, res){
    //pegar todos os dados passados e inserir no banco de dados para fazer a validação de inserção do usuário
    res.redirect('/login');
})

app.post('/', function(req, res){
    //aqui, devemos pegar os dados passados pelo login e buscar no banco de dados para ver se o usuário e a senha estão certos
    //se tiver tudo certo: redireciona para a tela home, se não, exibe uma mensagem de erro e permanece na tela de login
    res.redirect('/');
})

app.post('/local', function(req, res){
    //aqui devemos pegar as informações de login e buscar no banco de dados
    res.redirect('/local');
})

app.listen(3000, function(req, res){
    console.log('Server running on 3000');
})