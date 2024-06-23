# Projeto: Gerador de Prêmios para Tatuador
Link em produção: [Genio da Tattoo](https://geniodatattoo.com.br)

## Descrição
Este projeto tem como objetivo criar um site para gerar prêmios para um tatuador e gravar essas informações em um banco de dados para controle e gestão do próprio tatuador. O site permite ao tatuador criar, gerenciar e visualizar os prêmios oferecidos aos seus clientes.

## Funcionalidades
Geração de Prêmios: Interface para criar novos prêmios com detalhes específicos.
Visualização de Prêmios: Lista de prêmios disponíveis, permitindo ao tatuador visualizar e gerenciar os prêmios.
Gravação em Banco de Dados: Armazenamento seguro das informações dos prêmios em um banco de dados MySQL.
## Tecnologias Utilizadas
### Hospedagem:

* KingHost (para hospedagem do servidor)
    * Servidor:

* Node.js (para o backend)

* Frontend:
    * HTML
    * CSS
    * JavaScript

* Ambiente de Configuração:

    * Arquivos .env (para configuração de variáveis de ambiente)
* Frameworks e Bibliotecas:

    * Express (para a criação do servidor e gerenciamento de rotas)
    * Body-parser (para o parsing das requisições HTTP)
* Banco de Dados:

    * MySQL (para armazenamento dos dados dos prêmios)
* Outros:

    * Requisições HTTPS (para comunicação segura)
    * Roteamento de Domínio (para gerenciamento das rotas do site)
    * Estrutura do Projeto

```` bash 
/genio
│
├── /apps_nodejs
│   ├── server.js              # Arquivo principal do servidor
│
├── /www
│   ├── /public
│   │   ├── /css
│   │   │   └── styles.css     # Arquivos de estilo CSS
│   │   ├── /img               # Arquivos de imagem
│   │   ├── /js
│   │   │   └── db.js          # Arquivo JavaScript principal
│   ├── index.html             # Página HTML principal
│
└── README.md                  # Documentação do projeto
└── .gitignore                 # Arquivo .gitignore
````

## Instalação e Configuração
1. Clonar o Repositório:
```` bash 
git clone https://github.com/sidneyjfg/genio.git
cd genio
````
2. Instalar Dependências:
```` bash
npm install
````
3. Configurar Variáveis de Ambiente:

    * Crie um arquivo .env na pasta config e configure as variáveis conforme o exemplo abaixo:

```` makefile
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
````

4. Iniciar o Servidor:
````bash
npm start
````
5. Acessar o Site:

Abra o navegador e acesse http://seu-dominio.com para visualizar o site.

## Contribuição
1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (git checkout -b feature/sua-feature)
3. Commit suas mudanças (git commit -m 'Adiciona nova feature')
4. Faça um Push para a Branch (git push origin feature/sua-feature)
5. Abra um Pull Request
## Licença
Este projeto está licenciado 