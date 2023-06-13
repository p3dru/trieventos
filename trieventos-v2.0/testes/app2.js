const express = require('express');
const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  const dropdownOptions = [
    {key: 'Opção 1',
    value: 'google.com'},
    {key: 'Opção 2',
    value: 'twitter.com'},
    {key: 'Opção 3',
    value: 'instagram.com'},
]
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
