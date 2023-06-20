const express = require("express");
const ejs = require('ejs');
const path = require('path');
const {Pool} = require('pg');
const { json } = require("body-parser");


const app = express();

const pool = new Pool(
    {
        user: '',
        host: '',
        database: '',
        password: '',
        port: ,
    }
);

app.set('view engine', 'ejs');


//para servir arquivos estáticos ao CSS
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    //console.log(res.json);
    try {
        const result = await pool.query('select * from estabelecimentos');
        const dadosObtidos = result.rows;
        //console.log(dadosObtidos[0].titulo_card);
        //console.log(dadosObtidos.length);
        res.render('home', {titleTag: 'Home', estabelecimento: dadosObtidos});
    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
        res.sendStatus(500).send('Erro interno');
    }
});

app.get('/sobre', function(req, res){
    res.render('sobre', {titleTag: 'Sobre'});
});

app.get('/sobre/planos', function(req, res){
    res.render('planos', {titleTag: 'Planos'});
});

app.get('/estabelecimentos/x', function(req,res){
    res.render('estabelecimentos', {titleTag: 'Estabelecimentos'});
});

app.get('/estabelecimentos/:nome_estabelecimento', async (req,res) => {
    const nome = req.params.nome_estabelecimento;
    try {
        const result = await pool.query(`select * from estabelecimentos where titulo_card = '${nome}'`);
        const dadosObtidos = result.rows;
        const titleTag = dadosObtidos[0].titulo_card;
        //console.log(titleTag);
        //console.log(dadosObtidos);
        res.render('usuarios-comuns/render-estabelecimentos.ejs', {titleTag: titleTag, estabelecimento: dadosObtidos});
    } catch (error) {
        console.error('Erron ao buscar dados: ', error);
        res.sendStatus(500).send('Erro Interno');
    }
    //res.render('estabelecimentos', {titleTag: 'Estabelecimentos'});
});

app.get('/estabelecimentos/x/horarios', function(req,res){
    const horas = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'];
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const ocupados = [{dia: 'Segunda', hora:'18:00'}, {dia: 'Sexta', hora: '22:00'},
                    {dia: 'Sábado', hora: '21:00'}, {dia: 'Sábado', hora: '20:00'}];
    res.render('horarios', { horas, diasSemana, titleTag: 'Horários', ocupados});
});

//gets-logins
//login padrão
app.get('/login', function(req, res){
    res.render('login/inicial', {titleTag: 'Login'});
});

//login de usuário comum
app.get('/login-locatarios', function(req, res){
    res.render('login/login-usuarios', {titleTag: 'Login'});
})

//login de estabelecimentos
app.get('/login-estabelecimentos', function(req, res){
    res.render('login/login-estabelecimentos', {titleTag: 'Estabelecimentos'})
})

app.get('/perfil', function(req, res){
    res.render('perfil', {titleTag: 'Perfil'});
});

app.get('/cadastrar-usuario', function(req, res){
    res.render('cadastro-usuario', {titleTag: 'Cadastrar Usuário'});
});

app.get('/cadastrar-estabelecimento', function(req, res){
    res.render('estabelecimentos/cadastro-estabelecimentos.ejs', {titleTag: 'Cadastrar Estabelecimento'});
})

app.get('/redefinir-senha', function(req, res){
    res.render('redefinir-senha', {titleTag: 'Redefinir Senha'});
})

app.get('/x/gerenciar', function(req, res){
    res.render('alterar-perfil', {titleTag: 'Alterar Perfil'});
})

app.get('/x/locacoes', function(req, res){
    res.render('locacoes', {titleTag: 'Histórico de Locações'});
})



//gets de estabelecimentos
app.get('/login-estabelecimentos', function(req, res){
    res.render('login-estabelecimentos', {titleTag: 'Login'});
})

//tela inicial dos estabelecimentos
app.get('/local', function(req, res){
    //trocar o local para pegar o usuário pelo parâmetro
    res.render('estabelecimentos/home', {titleTag: 'Home'});
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
