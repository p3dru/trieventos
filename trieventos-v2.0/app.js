const express = require("express");
const ejs = require('ejs');
const path = require('path');
const {Pool} = require('pg');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcryptjs');
const match = require('assert');

const app = express();

const pool = new Pool(
    {
        user: '',
        password: '',
        host: 'localhost',
        port: 5432,
        database: ''
    }
);

function generateToken(user) {
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    return token;
  }
  

  function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' });
      }
  
      req.user = user;
      next();
    });
  }
  
  
app.set('view engine', 'ejs');

app.use(express.json());
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
app.get('/login-locatarios', async(req, res) => {
    res.render('login/login-usuarios', {titleTag: 'Login'});
});

//login de estabelecimentos
app.get('/login-estabelecimentos', async(req, res) => {
    res.render('login/login-estabelecimentos', {titleTag: 'Estabelecimentos'})

});

app.get('/perfil', authenticateToken, function(req, res){
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

app.get('/x/gerenciar', authenticateToken, function(req, res){
    res.render('alterar-perfil', {titleTag: 'Alterar Perfil'});
})

app.get('/x/locacoes', authenticateToken, function(req, res){
    res.render('locacoes', {titleTag: 'Histórico de Locações'});
})

// Posts
app.post('/login-locatorio', async (req, res) => {
    const { nome, senha } = req.body;
  
    try {
      const result = await pool.query('SELECT * FROM usuario WHERE nome = $1', [nome]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(401).json({ message: 'Credenciais Inválidas' });
      }
  
      // Comparar a senha fornecida com a senha armazenada no banco de dados
      if (senha !== user.senha) {
        return res.status(401).json({ message: 'Credenciais Inválidas' });
      }
  
      const token = jwt.sign({ id: user.id_usuario, tipo: 'usuario' }, 'chave-secreta');
      res.json({ token });
    } catch (error) {
      console.error('Erro de autenticação', error);
      res.sendStatus(500);
    }
  });
  
  

//gets de estabelecimentos

app.post('/login-estabelecimentos', async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuario_estabelecimento WHERE nome = $1', [nome]);
    const estabelecimento = result.rows[0];

    if (!estabelecimento) {
      return res.status(401).json({ message: 'Credenciais Inválidas' });
    }

    const match = await bcrypt.compare(senha, estabelecimento.senha);

    if (match) {
      const token = jwt.sign({ id: estabelecimento.id_estab, tipo: 'estabelecimento' }, 'chave-secreta');
      res.json({ token });
    } else {
      return res.status(401).json({ message: 'Credenciais Inválidas' });
    }
  } catch (error) {
    console.error('Erro ao autentificar estabelecimento', error);
    res.sendStatus(500);
  }
});

//tela inicial dos estabelecimentos
app.get('/local', function(req, res){
    //trocar o local para pegar o usuário pelo parâmetro
    res.render('estabelecimentos/home', {titleTag: 'Home'});
})

//posts
app.post('/cadastrar-usuario', function(req, res) {
    const { nome, email, senha, confirmarSenha } = req.body;
  
    // Verificar se todos os campos foram preenchidos
    if (!nome || !email || !senha || !confirmarSenha) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
    }
  
    // Verificar se a senha e a confirmação de senha são iguais
    if (senha !== confirmarSenha) {
      return res.status(400).json({ message: 'A senha e a confirmação de senha não correspondem' });
    }
  
    // Verificar se o usuário já está cadastrado (exemplo com consulta no banco de dados)
    const query = 'SELECT * FROM usuarios WHERE nome = $1';
    const values = [nome];
  
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('Erro ao verificar usuário no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno' });
      }
  
      if (result.rows.length > 0) {
        return res.status(400).json({ message: 'Usuário já cadastrado' });
      }
  
      // Cadastrar o usuário (exemplo com inserção no banco de dados)
      const insertQuery = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';
      const insertValues = [nome, email, senha];
  
      pool.query(insertQuery, insertValues, (insertError, insertResult) => {
        if (insertError) {
          console.error('Erro ao cadastrar usuário no banco de dados:', insertError);
          return res.status(500).json({ message: 'Erro interno' });
        }
  
        res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
      });
    });
  });
  
  

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

