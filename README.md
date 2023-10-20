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

An important note is that the [![documentation of NestJS](https://docs.nestjs.com)](https://docs.nestjs.com) is comprehensive, and you would benefit from looking it up. Here, we attempt to put the knowledge in order, but we also sometimes link to the official docs. We also refer to the Express framework to highlight the advantages of using NestJS. To benefit from this article more, some experience with Express might be useful, but not necessary.

> If you want to look into the core of Node.js, I recommend checking out the Node.
> js TypeScript series. It covers topics such as streams, event loop, multiple >
> processes and multithreading with worker threads. Also, knowing how to create an 
> API without any frameworks such as Express and NestJS makes us apprieciate them 
> even more.

## Getting started with NestJS

The most straightforward way of getting started is to clone the official TypeScript starter repository. Nest is built with TypeScript and fully supports it. You could use JavaScript instead, but here we focus on TypeScript.

```sh
git clone git@github.com:nestjs/typescript-starter.git
```

A thing worth looking into in the above repository is the  ```sh tsconfig.jso ``` file. I highly recommend adding the  alwaysStrict and  noImplicitAny options

The above repository contains the most basic packages. We also get the fundamental types of files to get us started, so let’s review them.

> All of the code from this series can be found in [this repository](https://github.com/. 
> mwanago/nestjs-typescript). Hopefully, it can later serve as a NestJS boilerplate with some
> built-in features.It is a fork of an official [typescript-starter](https://github.com/ 
> nestjs/typescript-starter). Feel free to give both of them a star.

# Controllers

Controllers handle incoming requests and return responses to the client. The  ```sh typescript-starter ``` repository contains our first controller. Let’s create a more robust one:

```sh

import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    @Post('signup')
    signup(@Req() req:Request) {
        console.log(req);
        return this.authService.signup();
    }

    @Post('signin')
    signin() {
        return this.authService.signin();
    }
}

```

The first thing that we can notice is that NestJS uses decorators a lot. To mark a class to be a controller, we use the  @Controller() decorator. We pass an optional argument to it. It acts as a path prefix to all of the routes within the controller.

# Routing

The next set of decorators connected to routing in the above controller are  @Get(),  @Post(),  Delete(),  and  @Put(). They tell Nest to create a handler for a specific endpoint for HTTP requests. The above controller creates a following set of endpoints:

```sh 
GET /posts 
```
> Returns all posts

```sh 
GET /posts/{id}
```

```sh
POST /posts
```