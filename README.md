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

## 🐍 Mongo container

We now have to run the mongo container

```
docker run -d -v ${your_volume_name}:/db --network ${your_network_name} --name ${your_mongo_container_name} mongo
```

You can now insert your elements in your database.

For example :

```
docker exec -it ${your_mongo_container_name} mongosh
use films
db.favoris.insertMany([{"name": "Spider man"}, {"name": "Super man"}])
```

## ⚓ Flask container

We now just have to build our image and run the container associated to it

```
docker build -t ${your_image_name}
docker run -d --network ${your_network_name} -v $(pwd)/text:/app/text -name ${your_app_container_name} -p 5000:5000 ${your_image_name}
```
