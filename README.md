# Gerenciador de Finanças para Empresas

Este projeto é um **Gerenciador de Finanças** para empresas, desenvolvido utilizando **Next.js** no front-end e **Hono.js** no back-end. O aplicativo permite que empresas gerenciem suas finanças de forma eficiente, com recursos como controle de despesas, receitas, relatórios financeiros e muito mais.

## Índice

- [Recursos](#recursos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Recursos

- Gerenciamento de receitas e despesas
- Relatórios financeiros detalhados
- Suporte para múltiplas contas e categorias
- Controle de fluxo de caixa
- Interface amigável e responsiva
- API robusta com autenticação JWT

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   ```
   git clone https://github.com/mangareira/finance.git
   ```

2. Entre no diretório do projeto:
```
cd finance
```

3. Instale as dependências do projeto:
```
npm install
```

## Configuração

Antes de iniciar a aplicação, você precisará configurar algumas variáveis de ambiente. Crie um arquivo `.env.local` na raiz do projeto com as seguintes informações:

# Configurações do Next.js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = sua key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Configurações do Clerk
CLERK_PUBLISHABLE_KEY=sua key
CLERK_SECRET_KEY=sua key

# Configuração da Database
O repositorio esta usando Neon como banco de dados
DATABASE_URL=postgresql://<nome_do_banco>:<senha_do_banco>@localhost:5432/finance

Certifique-se de configurar corretamente o banco de dados e ajustar as variáveis conforme seu ambiente de desenvolvimento.

## Como usar

### Rodar o Front-end (Next.js)

```
npm run dev
```
