# Execution de l'application

Voici la commande pour lancer l'application : 

```
npm run start 
```

Pour lancer les tests : 

```
npm run test
```

# Test de route API

### Réussite de route

- Une commande passée : 

```
curl -i -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ORDER_PLACED",
    "orderId": "ORDER-1"
  }'
``` 

- Une commande expédiée : 

```
curl -i -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ORDER_SHIPPED",
    "orderId": "ORDER-2"
  }'
```

- Une commande livrée : 

```
curl -i -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ORDER_DELIVERED",
    "orderId": "ORDER-3"
  }'
```

- Promotion de produit : 

```
curl -i -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "type": "PRODUCT_PROMOTION"
  }'
```


### Echec de route

- Evènement invalides : 

```
curl -i -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "type": "INVALID_EVENT",
    "orderId": "ORDER-1"
  }'
```

- Type manquant : 

```
curl -i -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER-1"
  }'
```


