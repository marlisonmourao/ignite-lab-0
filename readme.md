# Ignite Lab 0

Este repositório contém o projeto desenvolvido durante o Ignite Lab 0, uma iniciativa da Rocketseat focada em desenvolvimento Node.js.

## Sobre o Projeto

O Ignite Lab 0 é um evento prático onde desenvolvemos uma aplicação backend utilizando tecnologias modernas do ecossistema Node.js. O projeto é dividido em três microserviços principais:

### Classroom

Microserviço responsável pelo gerenciamento de cursos e conteúdos educacionais:

- Cadastro e gestão de alunos
- Criação e organização de cursos
- Gerenciamento de matrículas
- Controle de progresso dos alunos

### Purchases

Microserviço que lida com toda a parte financeira e de compras:

- Processamento de pagamentos
- Geração de faturas
- Histórico de compras
- Assinaturas e planos

### Gateway

Microserviço que atua como ponto de entrada da aplicação:

- Roteamento de requisições para os microserviços apropriados
- Autenticação centralizada
- Cache de respostas
- Balanceamento de carga

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma

## Funcionalidades

- Autenticação de usuários
- CRUD de recursos
- Validação de dados
- Testes automatizados

## Como Executar

1. Clone o repositório

```bash
git clone https://github.com/marlisonmourao/ignite-lab-0.git
```

2. Instale as dependências

```bash
cd ignite-lab-0
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

4. Execute o projeto

```bash
npm run dev
```

## Licença

Este projeto está sob a licença MIT.
