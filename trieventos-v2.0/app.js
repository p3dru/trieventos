const express = require("express");
const ejs = require('ejs');
const path = require('path');
const {Pool} = require('pg');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcryptjs');
const match = require('assert');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const chave = '3eventsxcz';
const chaveEstab = 'qw,ckdsl';
const chaveAdm = 'ccmsdcdsmcmdklsmdklscldm,.mh';

const app = express();

app.set('view engine', 'ejs');


app.use(express.json());
//para servir arquivos estáticos ao CSS
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const pool = new Pool(
    {
        user: 'postgres',
        password: 'bd_!s_for_d4t4',
        host: 'localhost',
        port: 5432,
        database: 'testes_tabelas'
    }
);

function generateToken(user) {
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    return token;
  }
  

  function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    //console.log(token);

    if (!token) {
      return res.redirect('/login');
    }

    try {
      const decoded = jwt.verify(token, chave);
      req.user = decoded;
      next();
    } catch (error) {
      return res.redirect('/login');
    }
  }

  function autenthicateTokenEstab(req, res, next){
    const token = req.cookies.token;
    //console.log(token);

    if (!token) {
      return res.redirect('/login');
    }

    try {
      const decoded = jwt.verify(token, chaveEstab);
      req.user = decoded;
      next();
    } catch (error) {
      return res.redirect('/login');
    }
  }

  function authenticateTokenAdm(req, res, next){
    const token = req.cookies.token;
    //console.log(token);

    if (!token) {
      return res.redirect('/administracao');
    }

    try {
      const decoded = jwt.verify(token, chaveAdm);
      req.user = decoded;
      next();
    } catch (error) {
      return res.redirect('/administracao');
    }
  }


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
        const result = await pool.query(`select * from estabelecimentos where estabelecimento_nome = '${nome}'`);
        const dadosObtidos = result.rows;
        const titleTag = dadosObtidos[0].estabelecimento_nome;
        //console.log(titleTag);
        //console.log(dadosObtidos);
        res.render('usuarios-comuns/render-estabelecimentos.ejs', {titleTag: titleTag, estabelecimento: dadosObtidos});
    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
        res.sendStatus(500).send('Erro Interno');
    }
    //res.render('estabelecimentos', {titleTag: 'Estabelecimentos'});
});

app.get('/estabelecimentos/:nome_estabelecimento/horarios', async (req,res) => {
    const nome = req.params.nome_estabelecimento;

    try {
      const result = await pool.query(`select horario_funcionamento, horario_disponibilidade from horarios inner join estabelecimentos
      on horarios.estabelecimento_id = estabelecimentos.estabelecimento_id where estabelecimento_nome = '${nome}'`);
      const dadosObtidos = result.rows;
      var dadosSorted = dadosObtidos.sort();
      //console.log(dadosObtidos);
      console.log(dadosObtidos.length);
      var horarios = [];
      //console.log(dadosSorted);
      for (let i = 0; i < dadosObtidos.length; i++){
        let combo = []
        combo.push(dadosObtidos[i].horario_funcionamento);
        combo.push(dadosObtidos[i].horario_disponibilidade);
        horarios.push(combo);
      }

      horarios = horarios.sort();
      


      console.log(horarios);
      const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      res.render('usuarios-comuns/horarios', {titleTag: 'Horários', dias: dias, horarios: horarios, nome: nome}); 
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
      res.sendStatus(500).send('Erro Interno');
    }
    //Os horários de cada local são definidos pelo estabelecimento, sendo assim, armazenaremos no banco de dados;
});

//gets-logins
//login padrão
app.get('/login', function(req, res){
    res.render('login/inicial', {titleTag: 'Login'});
});

//login de usuário comum
app.get('/login-locatarios', async(req, res) => {
    const erro = '';
    res.render('login/login-usuarios', {titleTag: 'Login', erro: erro, sucesso: ''});
});

//redefinir senha usuário comum
app.get('/locatarios/redefinir-senha', async(req, res) => {
  res.render('login/redefinir-senha-usuarios', {titleTag: 'Redefinir Senha', erro: 'E-mail', sucesso: ''});
})

app.post('/redefinir-senha-usuarios', async(req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const confirmarSenha = req.body.confirmarSenha;
  //console.log(email, senha, confirmarSenha);

  if (!email){
    return res.render('login/redefinir-senha-usuarios', {titleTag: 'Redefinir Senha', erro: 'E-mail', sucesso: ''});
  }
  
  if (!senha){
    return res.render('login/redefinir-senha-usuarios', {titleTag: 'Redefinir Senha', erro: 'Senha', sucesso: ''});
  }

  if (!confirmarSenha) {
    return res.render('login/redefinir-senha-usuarios', {titleTag: 'Redefinir Senha', erro: 'Confirmar Senha', sucesso: ''});
  }

  if (senha != confirmarSenha){
    return res.render('login/redefinir-senha-usuarios', {titleTag: 'Redefinir Senha', erro: 'Diferentes', sucesso: ''});
  }

  const hashSenha = await bcrypt.hash(senha, 10);

  try{
    const result = await pool.query(`select * from usuarios where usuario_email = '${email}'`);
    const dadosObtidos = result.rows;
    const dados = JSON.stringify(dadosObtidos);
    
    if (dados == '[]'){
      return res.render('login/redefinir-senha-usuarios', {titleTag: 'Redefinir Senha', erro: 'Não Encontrado'});
    } else {
      const insertQuery = await pool.query(`update usuarios set usuario_senha = '${hashSenha}' where usuario_email = '${email}'`);
      return res.render('login/login-usuarios', {titleTag: 'Redefinir Senha', erro: '', sucesso: 'Atualizado'})
    }


  } catch (error) {
    console.error('Erro ao buscar dados: ', error);
    res.sendStatus(500).send('Erro Interno');
  }
})

//redefinir senha estabelecimentos
app.get('/redefinir-senha/estabelecimentos', function(req, res){
  res.render('login/redefinir-senha-estabelecimentos', {titleTag: 'Redefinir Senha', erro: ''});
});

app.post('/redefinir-senha-estabelecimentos', async(req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const confirmarSenha = req.body.confirmarSenha;

  //console.log(email, senha, confirmarSenha);
  if (!email){
    return res.render('login/redefinir-senha-estabelecimentos', {titleTag: 'Redefinir Senha', erro: 'E-mail'});
  }

  if (!senha){
    return res.render('login/redefinir-senha-estabelecimentos', {titleTag: 'Redefinir Senha', erro: 'Senha'});
  }

  if (!confirmarSenha){
    return res.render('login/redefinir-senha-estabelecimentos', {titleTag: 'Redefinir Senha', erro: 'Confirmar Senha'});
  }

  if (senha != confirmarSenha){
    return res.render('login/redefinir-senha-estabelecimentos', {titleTag: 'Redefinir Senha', erro: 'Diferentes'});
  }

  const hashSenha = await bcrypt.hash(senha, 10);

  try{
    const result = await pool.query(`select * from estabelecimentos where estabelecimento_email = '${email}'`);
    const dadosObtidos = result.rows;
    const dados = JSON.stringify(dadosObtidos);

    //console.log(dadosObtidos);
    //console.log(dados);
    
    if (dados == '[]'){
      return res.render('login/redefinir-senha-estabelecimentos', {titleTag: 'Redefinir Senha', erro: 'Não Encontrado'});
    } else {
      const insertQuery = await pool.query(`update estabelecimentos set estabelecimento_senha = '${hashSenha}' where estabelecimento_email = '${email}'`);
      return res.render('login/login-estabelecimentos', {titleTag: 'Redefinir Senha', erro: '', sucesso: 'Atualizado'})
    }

  } catch(error){
    console.error('Erro ao buscar dados: ', error);
    res.sendStatus(500).send('Erro Interno');
  }

});

//login de estabelecimentos
app.get('/login-estabelecimentos', async(req, res) => {
    res.render('login/login-estabelecimentos', {titleTag: 'Estabelecimentos', erro: '', sucesso: ''});

});

app.get('/perfil', authenticateToken, function(req, res){
    console.log(req.id + 'chamou a rota');
    res.render('perfil', {titleTag: 'Perfil'});
});

app.get('/cadastrar-usuario', function(req, res){
    res.render('cadastro-usuario', {titleTag: 'Cadastrar Usuário', erro: '', sucesso: ''});
});

app.get('/cadastrar-estabelecimento', function(req, res){
    res.render('estabelecimentos/cadastro-estabelecimentos.ejs', {titleTag: 'Cadastrar Estabelecimento', erro: '', sucesso: ''});
})

app.get('/redefinir-senha', function(req, res){
    res.render('redefinir-senha', {titleTag: 'Redefinir Senha'});
})

//gerenciar perfil
app.get('/usuario/gerenciar', authenticateToken, function(req, res){
    const infos = req.cookies.infos;
    //const nome_usuario = req.params.locatario;
    //console.log(infos)
    res.render('alterar-perfil', {titleTag: 'Alterar Perfil', sucesso: '', erro: ''});
})

app.post('/usuario/gerenciar', authenticateToken, async(req, res) => {
  const infos = req.cookies.infos;
  const email = req.body.email;
  const senha = req.body.senha;
  const confirmarSenha = req.body.confirmarSenha;
  console.log(infos);
  console.log(email, senha, confirmarSenha);

  console.log(typeof(email), typeof(senha), typeof(confirmarSenha));

  if (!email){
    if (!senha){
      return res.render('alterar-perfil', {titleTag:'Alterar Perfil', sucesso:'Nada', erro: ''});
    } else {
      if (senha != confirmarSenha){
        return res.render('alterar-perfil', {titleTag:'Alterar Perfil', sucesso:'', erro: 'Diferentes'});
      } else {

        const hashSenha = await bcrypt.hash(senha, 10);

        try {
          const result = await pool.query(`select * from usuarios where usuario_id = '${infos[0]}'`);
          const dadosObtidos = result.rows;
          console.log(dadosObtidos);
          if (dadosObtidos.length > 0){
            const updateQuery = await pool.query(`update usuarios set usuario_senha = '${hashSenha}' where usuario_id = '${infos[0]}'`);
          }

          return res.render('alterar-perfil', {titleTag:'Alterar Perfil', sucesso:'Atualizado Senha', erro: ''});
        } catch(error){
          console.error('Erro ao buscar dados: ', error);
          res.sendStatus(500).send('Erro Interno');
        }
      }
    }
  } else {
    if (!senha) {
      try {
        const result = await pool.query(`select * from usuarios where usuario_id = '${infos[0]}'`);
        const dadosObtidos = result.rows;
        
        if(dadosObtidos.length > 0){
          const updateQuery = await pool.query(`update usuarios set usuario_email = '${email}' where usuario_id = '${infos[0]}'`);
        }

        return res.render('alterar-perfil', {titleTag:'Alterar Perfil', sucesso:'Atualizado Email', erro: ''});
      } catch(error){
        console.error('Erro ao buscar dados: ', error);
        res.sendStatus(500).send('Erro Interno');
      }
    } else {
      if (senha != confirmarSenha){
        return res.render('alterar-perfil', {titleTag:'Alterar Perfil', sucesso:'', erro: 'Diferentes'});
      } else {
        const hashSenha = await bcrypt.hash(senha, 10);

        try{
          const result = await pool.query(`select * from usuarios where usuario_id = '${infos[0]}'`);
          const dadosObtidos = result.rows;

          if (dadosObtidos.length > 0){
            const updateQuery = await pool.query(`update usuarios set usuario_email = '${email}', usuario_senha = '${hashSenha}' where
            usuario_id = '${infos[0]}'`);
          }

          return res.render('alterar-perfil', {titleTag: 'Alterar Perfil', sucesso:'Atualizado', erro:''});

        } catch(error){
          console.error('Erro ao buscar dados: ', error);
          res.sendStatus(500).send('Erro Interno');
        }
      }
    }
  }
})

app.get('/x/locacoes', authenticateToken, function(req, res){
    res.render('locacoes', {titleTag: 'Histórico de Locações'});
})

app.get('/gerenciar-estabelecimento', autenthicateTokenEstab, function(req, res){
  const infos = req.cookies.infos;
  console.log(infos);
  res.render('estabelecimentos/alterar-perfil-estabelecimentos', {titleTag: 'Alterar Perfil', erro: '', sucesso: ''});

})

app.post('/gerenciar-estabelecimento', autenthicateTokenEstab, async(req, res) => {
  //console.log('oi')
  const infos = req.cookies.infos;
  //console.log(infos);
  const email = req.body.email;
  const senha = req.body.senha;
  const confirmarSenha = req.body.confirmarSenha;

  //console.log(email, senha, confirmarSenha);


});

// Posts
app.post('/login-locatarios', async (req, res) => {
    const email = req.body.nome;
    const senha = req.body.senha;

    if(!email){
        const erro = 'Usuário';
        return res.render('login/login-usuarios', {titleTag: 'Login', erro: erro, sucesso: ''});
        //return res.status(400).json({ message: 'Campo "Usuário" não preenchido' });
    }

    if(!senha){
      const erro = 'Senha';
        return res.render('login/login-usuarios', {titleTag: 'Login', erro: erro, sucesso: ''});
    }
    

    try {
      const result = await pool.query(`SELECT * FROM usuarios WHERE usuario_email = '${email}'`);
      const user = result.rows[0];

      if (user === undefined){
        const erro = 'Cadastro'
        return res.render('login/login-usuarios', {titleTag: 'Login', erro: erro, sucesso: ''});
      }


      //console.log(user);

      //if (user.length < 1){}
  
      // Comparar a senha fornecida com a senha armazenada no banco de dados
      const compararSenha = await bcrypt.compare(senha, user.usuario_senha);

      if (compararSenha === false) {
        const erro = 'Inválida';
        return res.render('login/login-usuarios', {titleTag: 'Login', erro: erro, sucesso: ''});
      }
  
      const token = jwt.sign({ id: user.usuario_id, tipo: 'usuario' }, chave, {expiresIn: 1800});
      const infos = [user.usuario_id, user.usuario_nome];
      res.cookie('infos', infos, { maxAge: 1800000, httpOnly: true});
      res.cookie('token', token, { maxAge: 1800000, httpOnly: true});
      //res.json({auth: true, token });
      //console.log(token);
      res.redirect('/');
    } catch (error) {
      console.error('Erro de autenticação', error);
      res.sendStatus(500);
    }
  });
  
  

//gets de estabelecimentos

app.post('/login-estabelecimentos', async (req, res) => {
  const email = req.body.nome;
  const senha = req.body.senha;

  if(!email){
    const erro = 'Usuário';
    return res.render('login/login-estabelecimentos', {titleTag: 'Estabelecimentos', erro: erro, sucesso: ''});
    //return res.status(400).json({ message: 'Campo "Usuário" não preenchido' });
  }

  if(!senha){
    const erro = 'Senha';
    return res.render('login/login-estabelecimentos', {titleTag: 'Estabelecimentos', erro: erro, sucesso: ''});
  }

  try {
    const result = await pool.query(`SELECT * FROM estabelecimentos WHERE estabelecimento_email = '${email}'`);
    const estabelecimento = result.rows[0];
    //console.log(estabelecimento);
    

    if (estabelecimento === undefined || estabelecimento.length == 0){
      const erro = 'Cadastro';
      return res.render('login/login-estabelecimentos', {titleTag: 'Estabelecimentos', erro: erro, sucesso: ''});
    }

    const estabelecimentoNome = estabelecimento.estabelecimento_nome;

    const compararSenha = await bcrypt.compare(senha, estabelecimento.estabelecimento_senha);

    if (compararSenha === false) {
      const erro = 'Inválida';
      return res.render('login/login-estabelecimentos', {titleTag: 'Estabelecimentos', erro: erro, sucesso: ''});
    }

    const token = jwt.sign({id: estabelecimento.estabelecimento_id, tipo: 'estabelecimento'}, chaveEstab, {expiresIn: 1800});
    const infos = [estabelecimento.estabelecimento_id, estabelecimento.estabelecimento_nome,
      estabelecimento.estabelecimento_descricao_card];
    res.cookie('infos', infos, { maxAge: 1800000, httpOnly: true});
    res.cookie('token', token, { maxAge: 1800000, httpOnly: true});

      
    res.redirect(`/estabelecimento/${estabelecimentoNome}`);

  } catch (error) {
    console.error('Erro ao autentificar estabelecimento', error);
    res.sendStatus(500);
  }
});

//tela inicial dos estabelecimentos
app.get('/estabelecimento/:nome', autenthicateTokenEstab, async (req, res) => {
    const nome = req.params.nome;
    
    try {
      const result = await pool.query(`select * from estabelecimentos where estabelecimento_nome = '${nome}'`);
      const dadosObtidos = result.rows;
      const titleTag = dadosObtidos[0].estabelecimento_nome;
      //console.log(titleTag);
      console.log(dadosObtidos);
      res.render('estabelecimentos/home', {titleTag: titleTag, estabelecimento: dadosObtidos, aviso: ''});
    } catch (error) {
        console.error('Erron ao buscar dados: ', error);
        res.sendStatus(500).send('Erro Interno');
    }

    //trocar o local para pegar o usuário pelo parâmetro
    //res.render('/', {titleTag: 'Home'});
})

//posts
app.post('/cadastrar-usuario', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const confirmarSenha = req.body.confirmarSenha;

    //console.log(nome, email, senha, confirmarSenha)
    
    // Verificar se todos os campos foram preenchidos
    if (!nome) {
      const erro = 'Nome';
      return res.render('cadastro-usuario', {titleTag: 'Cadastrar Usuário', erro: erro, sucesso: ''});
    }

    if (!email) {
      const erro = 'E-mail';
      return res.render('cadastro-usuario', {titleTag: 'Cadastrar Usuário', erro: erro, sucesso: ''});
    }

    if (!senha) {
      const erro = "Senha";
      return res.render('cadastro-usuario', {titleTag: 'Cadastrar Usuário', erro: erro, sucesso: ''});
    }
    if (!confirmarSenha) {
      const erro = 'Confirmar Senha';
      return res.render('cadastro-usuario', {titleTag: 'Cadastrar Usuário', erro: erro, sucesso: ''});
    }
    // Verificar se a senha e a confirmação de senha são iguais
    if (senha !== confirmarSenha) {
      const erro = 'Não confere';
      return res.render('cadastro-usuario', {titleTag: 'Cadastrar Usuário', erro: erro, sucesso: ''});
    }
  
    const hashSenha = await bcrypt.hash(senha, 10);

    // Verificar se o usuário já está cadastrado (exemplo com consulta no banco de dados)
    const query = `SELECT * FROM usuarios WHERE usuario_email = '${email}'`;
  
    pool.query(query, (error, result) => {
      if (error) {
        console.error('Erro ao verificar usuário no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno' });
      }
  
      if (result.rows.length > 0) {
        const erro = 'Já Cadastrado';
        return res.render('cadastro-usuario', {titleTag: 'Cadastrar Usuário', erro: erro, aviso: ''});
        //return res.status(400).json({ message: 'Usuário já cadastrado' });
      }
  
      // Cadastrar o usuário (exemplo com inserção no banco de dados)
      const insertQuery = `INSERT INTO usuarios (usuario_nome, usuario_email, usuario_senha) VALUES ('${nome}', '${email}', '${hashSenha}')`;
      //const insertValues = [nome, email, senha];
  
      pool.query(insertQuery, (insertError, insertResult) => {
        if (insertError) {
          console.error('Erro ao cadastrar usuário no banco de dados:', insertError);
          return res.status(500).json({ message: 'Erro interno' });
        }

        //CRIAR UM MODELO QUE POSSA ENVIAR A MENSAGEM DE CADASTRO ENVIADO COM SUCESSO E A TELA DE LOGIN (FEITO)
        return res.render('login/login-usuarios', {titleTag: 'Login', erro: '', sucesso: 'Enviado'});
      });
    });
  });
  
  app.post('/cadastrar-estabelecimento', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const confirmarSenha = req.body.confirmarSenha;



    //console.log(nome, email, senha, confirmarSenha)
    
    // Verificar se todos os campos foram preenchidos
    if (!nome) {
      return res.render('estabelecimentos/cadastro-estabelecimentos', {titleTag: 'Cadastrar Estabelecimento', erro: 'Nome', sucesso: ''});
    }

    if (!email) {
      return res.render('estabelecimentos/cadastro-estabelecimentos', {titleTag: 'Cadastrar Estabelecimento', erro: 'E-mail', sucesso: ''});
    }

    if (!senha) {
      return res.render('estabelecimentos/cadastro-estabelecimentos', {titleTag: 'Cadastrar Estabelecimento', erro: 'Senha', sucesso: ''});
    }
    if (!confirmarSenha) {
      return res.render('estabelecimentos/cadastro-estabelecimentos', {titleTag: 'Cadastrar Estabelecimento', erro: 'Confirmar Senha', sucesso: ''});
    }
    // Verificar se a senha e a confirmação de senha são iguais
    if (senha !== confirmarSenha) {
      return res.render('estabelecimentos/cadastro-estabelecimentos', {titleTag: 'Cadastrar Estabelecimento', erro: 'Não Confere', sucesso: ''});
    }
  
    const hashSenha = await bcrypt.hash(senha, 10);

    // Verificar se o estabelecimento já está cadastrado
    const query = `SELECT * FROM estabelecimentos WHERE estabelecimento_email = '${email}'`;

    pool.query(query, (error, result) => {
      if (error) {
        console.error('Erro ao verificar estabelecimento no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno' });
      }

      if (result.rows.length > 0) {
        return res.render('estabelecimentos/cadastro-estabelecimentos', {titleTag: 'Cadastrar Estabelecimento', erro: 'Já Cadastrado', sucesso: ''});
      }

      const insertQuery = `INSERT INTO estabelecimentos (estabelecimento_nome, estabelecimento_email, estabelecimento_senha, tipo_usuario) VALUES ('${nome}', '${email}', '${hashSenha}', 'estabelecimentos')`;
      //const insertValues = [nome, email, senha, 'estabelecimentos'];
  
      pool.query(insertQuery, (insertError, insertResult) => {
        if (insertError) {
          console.error('Erro ao cadastrar usuário no banco de dados:', insertError);
          return res.status(500).json({ message: 'Erro interno' });
        }

        res.render('login/login-estabelecimentos', {titleTag: 'Cadastrar Estabelecimento', erro: '', sucesso: 'Enviado'});
      });
    });
  });

app.post('/', function(req, res){
    //aqui, devemos pegar os dados passados pelo login e buscar no banco de dados para ver se o usuário e a senha estão certos
    //se tiver tudo certo: redireciona para a tela home, se não, exibe uma mensagem de erro e permanece na tela de login
    res.redirect('/');
})

//PATCHES
app.patch('/estabelecimentocard', (req, res) => {
  const dadosAtualizados = req.body;
  const token = req.cookies.token;
  const infos = req.cookies.infos;
  console.log(dadosAtualizados);
  //console.log(token);
  console.log('Essas são as informações: ',  infos);
  
  var query = '';

  if (dadosAtualizados.novoEmail != '' && dadosAtualizados.descricaoCard != ''){
    query = `update estabelecimentos set estabelecimento_email = ${dadosAtualizados.novoEmail},
      estabelecimento_descricao_card = ${dadosAtualizados.descricaoCard} where estabelecimento_id = ${infos[0]}`;
  } else {
    if (dadosAtualizados.novoEmail != '' && dadosAtualizados.descricaoCard == ''){
      query = `update estabelecimentos set estabelecimento_email = ${dadosAtualizados.novoEmail}
      where estabelecimento_id = ${infos[0]}`;
    } else {
      if (dadosAtualizados.novoEmail == '' && dadosAtualizados.descricaoCard != ''){
        query = `update estabelecimentos set estabelecimento_descricao_card = ${dadosAtualizados.descricaoCard}
        where estabelecimento_id = ${infos[0]}`;
      }
    }
  }

  console.log('Essa é a query: ', query);

  //SE A QUERY ESTIVER VAZIA, APENAS LANÇA UM ALERT
  //Se não, faz a alteração e informa ao usuário com o Alert 

  /*try{
    

    
  }
  catch(error){
    console.error('Erron ao buscar dados: ', error);
    res.sendStatus(500).send('Erro Interno');
  }*/
});

app.post('/local', function(req, res){
    //aqui devemos pegar as informações de login e buscar no banco de dados
    res.redirect('/local');
})

//adm
app.get('/administracao', function(req, res){
  res.render('login/login-adm', {titleTag: 'Administração', erro: '', sucesso: ''});
});

app.post('/login-adm', async(req, res) => {
  const email = req.body.nome;
  const senha = req.body.senha;

  //console.log(email, senha);

  if(!email){
    const erro = 'Usuário';
    return res.render('login/login-adm', {titleTag: 'Administração', erro: erro, sucesso: ''});
    //return res.status(400).json({ message: 'Campo "Usuário" não preenchido' });
  }

  if(!senha){
    const erro = 'Senha';
    return res.render('login/login-adm', {titleTag: 'Administração', erro: erro, sucesso: ''});
  }

  try {
    const result = await pool.query(`SELECT * FROM adm WHERE adm_email = '${email}'`);
    const adm = result.rows[0];
    //console.log(dadosObtidos);
    

    if (adm === undefined || adm.length == 0){
      const erro = 'Cadastro';
      return res.render('login/login-adm', {titleTag: 'Administração', erro: erro, sucesso: ''});
    }

    const admNome = adm.adm_nome;

    const compararSenha = await bcrypt.compare(senha, adm.adm_senha);

    if (compararSenha === false && senha != adm.adm_senha) {
      const erro = 'Inválida';
      return res.render('login/login-adm', {titleTag: 'Administração', erro: erro, sucesso: ''});
    }

    const token = jwt.sign({id: adm.adm_id, tipo: 'adm'}, chaveAdm, {expiresIn: 1800});
    const infos = [adm.adm_id, adm.adm_nome, adm.adm_email];
    res.cookie('infos', infos, { maxAge: 1800000, httpOnly: true});
    res.cookie('token', token, { maxAge: 1800000, httpOnly: true});

      
    res.redirect(`/adm/home`);

  } catch (error) {
    console.error('Erro ao autentificar estabelecimento', error);
    res.sendStatus(500);
  }
  
})

app.get('/adm/redefinir-senha', function(req, res){
  res.render('login/redefinir-senha-adm', {titleTag: 'Redefinir Senha', erro: '', sucesso: ''});
});

app.post('/redefinir-senha-adm', async(req, res) => {
  const infos = req.cookies.infos;
  console.log(infos);
  const email = req.body.email;
  const senha = req.body.senha;
  const confirmarSenha = req.body.confirmarSenha;

  //console.log(email, senha, confirmarSenha);
  if (!email){
    if (!senha){
      return res.render('login/redefinir-senha-adm', {titleTag:'Redefinir Senha', sucesso:'Nada', erro: ''});
    } else {
      if (senha != confirmarSenha){
        return res.render('login/redefinir-senha-adm', {titleTag:'Redefinir Senha', sucesso:'', erro: 'Diferentes'});
      } else {

        const hashSenha = await bcrypt.hash(senha, 10);

        try {
          const result = await pool.query(`select * from adm where adm_id = '${infos[0]}'`);
          const dadosObtidos = result.rows;
          console.log(dadosObtidos);
          if (dadosObtidos.length > 0){
            const updateQuery = await pool.query(`update adm set adm_senha = '${hashSenha}' where adm_id = '${infos[0]}'`);
          }

          return res.render('login/redefinir-senha-adm', {titleTag:'Redefinir Senha', sucesso:'Atualizado Senha', erro: ''});
        } catch(error){
          console.error('Erro ao buscar dados: ', error);
          res.sendStatus(500).send('Erro Interno');
        }
      }
    }
  } else {
    if (!senha) {
      try {
        const result = await pool.query(`select * from adm where adm_id = '${infos[0]}'`);
        const dadosObtidos = result.rows;
        
        if(dadosObtidos.length > 0){
          const updateQuery = await pool.query(`update adm set adm_email = '${email}' where adm_id = '${infos[0]}'`);
        }

        return res.render('login/redefinir-senha-adm', {titleTag:'Redefinir Senha', sucesso:'Atualizado Email', erro: ''});
      } catch(error){
        console.error('Erro ao buscar dados: ', error);
        res.sendStatus(500).send('Erro Interno');
      }
    } else {
      if (senha != confirmarSenha){
        return res.render('login/redefinir-senha-adm', {titleTag:'Redefinir Senha', sucesso:'', erro: 'Diferentes'});
      } else {
        const hashSenha = await bcrypt.hash(senha, 10);

        try{
          const result = await pool.query(`select * from adm where adm_id = '${infos[0]}'`);
          const dadosObtidos = result.rows;

          if (dadosObtidos.length > 0){
            const updateQuery = await pool.query(`update adm set adm_email = '${email}', adm_senha = '${hashSenha}' where
            adm_id = '${infos[0]}'`);
          }

          return res.render('login/redefinir-senha-adm', {titleTag: 'Redefinir Senha', sucesso:'Atualizado', erro:''});

        } catch(error){
          console.error('Erro ao buscar dados: ', error);
          res.sendStatus(500).send('Erro Interno');
        }
      }
    }
  }
})

app.get('/adm/home', authenticateTokenAdm, async (req, res) => {
  const infos = req.cookies.infos;
  console.log(infos);

  try{
    const resultEstab = await pool.query(`select * from estabelecimentos`);
    const estabelecimentosObtidos = resultEstab.rows;

    const resultUsuario = await pool.query(`select * from usuarios`);
    const usuariosObtidos = resultUsuario.rows;

    console.log(estabelecimentosObtidos);
    //console.log();
    console.log(usuariosObtidos);
    res.render('adm/inicial', {titleTag: 'Home', estabelecimentos: estabelecimentosObtidos, usuarios: usuariosObtidos});

  } catch(error){
    console.error('Erro ao buscar dados: ', error);
    res.sendStatus(500).send('Erro Interno');
  }
});


app.listen(3000, function(req, res){
    console.log('Server running on 3000');
})
