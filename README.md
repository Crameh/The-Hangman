# The Hangman

# 🌟 Initialization

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

## 🌉 Create a network

We will create a network of type ‘bridge’ :

```
docker network create --driver bridge ${your_network_name}
```

## 📦 Create a volume

We will create our volume for our mongo database

```
docker volume create ${your_volume_name}
```

# 🚀 App launch

Thanks to docker compose, you only have to run one command to lanch the application : 

```
docker compose up -d --build
```
