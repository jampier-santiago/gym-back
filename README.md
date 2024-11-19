<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

Este es el repositorio del proyecto backend para la aplciación para el gimnasio, internamente se van a encontrar entidades que son:

- Roles
- Usuarios
- Categorias de los ejercicios
- Ejercicos

Entre las funcionalidades extras al `CRUD` que se pueden encontrar son `login` y `Seeders`

## Configuración inicial del proyecto

1. Instalar dependencias

```bash
$ npm install
```

2. Levantar el contenedor para la base de datos (se debe tener el entorno de Docker arriba)

```bash
$ docker-compose up -d
```

3. Colocar a correr el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

4. Correr los seeders del proyecto

```
Para esto hay un ednpoint que automaticamene pobla la base de datos con los datos iniciales

GET -> localhost:3000/api/seeders
```

## Creadores

- Author - Jampier Moreno y Alex Lozano

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
