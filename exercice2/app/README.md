# Commandes pour lancer l'application

```
mvn spring-boot:run
```


# Quelques appels API

- Création d'une tâche : 

```
curl -i -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "TODO1",
    "description": "Description TODO1",
    "priority": "HIGH",
    "idOwner": 1
  }'
```

- Récupérer toutes les tâches : 

```
curl -i http://localhost:8080/tasks
```

- Récupérer les tâches en cours :

```
curl -i "http://localhost:8080/tasks?status=IN_PROGRESS"
```

- Récupérer les tâches terminés :

```
curl -i "http://localhost:8080/tasks?status=DONE"
```

- Terminer une tâche :

```
  curl -i -X PATCH http://localhost:8080/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
  "status": "DONE"
  }'
```

