<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

# How to build

- Set environment variables in .env file or throw it via docker-compose, for example:

```environment
PORT=8080
# setup versions for ios and android
VER_IOS='1'
VER_ANDROID='1'
# setup store links for ios and android
LINK_APPSTORE='https://some-uri.com/'
LINK_GPLAY='https://some-uri.com/'
# security
SEC_API_KEY='qweQWEqwe123!'
```

- Use attached dockerfile like:

```bash
docker build -t NAME .
```

- run the docker container

```bash
docker run -p PORT:PORT NAME
```
