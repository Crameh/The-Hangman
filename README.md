# The Hangman

## :construction_worker_woman: Prerequisites

Be sure to have docker and docker compose installed, check with

```
docker --version
docker-compose --version
```

## 🌟 Initialization

Create a new directory, open the terminal and run :

```
git clone <https://github.com/Crameh/The-Hangman.git>
```

## 🪄 Pull images

You have to install two images, one for mongo and the other for python :

```
docker pull mongo
docker pull python
```

## 🚀 App launch

Thanks to docker compose, you only have to run one command to launch the application : 

```
docker compose up -d --build
```
