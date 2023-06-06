# Documentação da API

## Url base:  

![image](https://github.com/p3dru/projeto_integrador_I/assets/61830482/c34a6a07-5425-4d0b-af40-065caecb6ae0)

## Endpoints
### "/"

Method: Get '/'

Tela principal do projeto, retorna todos os estabelecimentos cadastrados no sistema.

Parâmetros de caminho:

Sem parâmetros

Exemplo de resposta (futuro):

![image](https://github.com/p3dru/projeto_integrador_I/assets/61830482/3415d4f9-e985-4501-80b8-8f96838cbb60)

### "/estabelecimentos/{nome_estabelecimento}"

Method: Get '/estabelecimentos/{nome_estabelecimento}'

Retorna informações sobre um estabelecimento em específico

Parâmetros de caminho:

"nome_estabelecimento": Nome do estabelecimento cadastrado

Exemplo de resposta (futuro):

![image](https://github.com/p3dru/projeto_integrador_I/assets/61830482/b388f40d-bb27-4201-afdb-e8c8c59f0665)


### "/estabelecimentos/{nome_estabelecimento}/horarios"

Method: Get '/estabelecimentos/{nome_estabelecimento}/horarios'

Retorna informações sobre horários de um estabelecimento em específico

Parâmetros de caminho:

"nome_estabelecimento": Nome do estabelecimento cadastrado

Exemplo de resposta (futuro):

![image](https://github.com/p3dru/projeto_integrador_I/assets/61830482/30dae370-adfc-4c1d-808d-010d3c6176a5)

### "/cadastrar-usuario"

Method: Get '/cadastrar-usuario'

Retorna uma página de criação de usuário na plataforma

Parâmetros do caminho:

Sem parâmetros

Method: Post '/cadastrar-usuario'

Insere um novo usuário ou estabelecimento

Parâmetros do caminho:

Sem parâmetros

Exemplo se solicitação:

![image](https://github.com/p3dru/projeto_integrador_I/assets/61830482/ad1561de-1219-4a87-8470-db6d2f0d125b)

Exemplo de resposta (futuro):

![image](https://github.com/p3dru/projeto_integrador_I/assets/61830482/4ed45c78-27ac-48c0-98e2-e50477ecf2b4)
