# Ft_transcendance

## Project Overview:

<p>This is a website where you can play pong with other players. There are accounts, chat rooms, spectating mode, and a match-making system.</p>

## Technical details:

This project is fully coded in Typescript and could be deployed with docker-compose.

- For the front framework, we choose ReactJS.
- For the back framework, NestJS was imposed.
- As a database, Postgres was imposed too.

If you are more curious, you could find our Notion documentation below.

## User Account :

### Authentication:

Authentication is a crucial part of almost every web application. There are many ways to approach it. In our case, The user must log in using the OAuth system of 42 Intranet. We aim to restrict the application to only authenticated users, a simple way to do so is to use JSON Web Tokens.

# 1. API with NestJS #1. Controllers, routing and the module structure:

NestJS is a framework for building Node.js applications. It is somewhat opinionated and forces us to follow its vision of how an application should look like to some extent. That might be viewed as a good thing that helps us to keep consistency across our application and forces us to follow good practices.

NestJS uses Express.js under the hood by default. If you’re familiar with my [![TypeScript Expres series](https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/)](https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/) and you’ve enjoyed it, there is a great chance you will like NestJS too. Also, knowledge of the Express framework will come in handy.

An important note is that the [![documentation of NestJS] (https://docs.nestjs.com)]is comprehensive, and you would benefit from looking it up. Here, we attempt to put the knowledge in order, but we also sometimes link to the official docs. We also refer to the Express framework to highlight the advantages of using NestJS. To benefit from this article more, some experience with Express might be useful, but not necessary.