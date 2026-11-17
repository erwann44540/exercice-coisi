# Exercice 3 

## Choix d'architecture

### Diagramme de l'architecture

Pour aborder cet exercice, j'ai tout d'abord commencé par réfléchir à une architecture qui pourrait être adaptée au projet. Au premier abord, je savais que le design pattern Publish/Subscribe était intéressant pour permettre l'envoi de notifications aux utilisateurs.

Afin d'organiser l'architecture autour de ce design pattern, j'ai d'abord réfléchi aux architectures que je connaissais et à celles qui seraient les plus adaptées.

API REST : je trouvais que l'utilisation d'une API REST seule n'était pas suffisante pour gérer la distribution asynchrone des événements et des notifications aux utilisateurs.

Architecture hexagonale : je pense que cette architecture aurait pu être intéressante pour isoler le cœur métier des services externes de notification. Cependant, l'architecture hexagonale me semble davantage adaptée à un projet plus complet, dans lequel les règles métier sont susceptibles d'évoluer. Je pense donc qu'elle serait trop complexe pour les attentes de cet exercice.

N'étant pas satisfait de ces deux architectures, j'ai recherché une architecture qui pourrait mieux correspondre au pattern Publish/Subscribe. C'est ainsi que j'ai trouvé l'Event-Driven Architecture, qui permet notamment de mettre en place un mécanisme de distribution des événements.

Cette réflexion m'a conduit à proposer l'architecture suivante :

![Event-Driven Architecture](diagram/exo3-pubsub-archi.drawio.png)

Dans cette architecture, nous avons une couche Controller qui reçoit les requêtes HTTP et transmet les informations au service concerné.

L'EventService applique les règles métier nécessaires avant de publier un événement auprès du MessageBroker.

Le MessageBroker se charge ensuite de distribuer cet événement aux services de notification concernés (Email, SMS et Push Mobile), qui assurent l'envoi des notifications aux utilisateurs.

### Automate des états d'une commande

Afin de suivre au mieux les états qu'une commande peut avoir j'ai défini cet automate : 

![Automate des états d'une commande](diagram/order-state-automate.drawio.png)

Une commande ne peut se trouver que dans un seul état à la fois et ne peut passer à un autre état que lorsqu'un événement spécifique se produit.

Dans cet automate, une commande passée ne peut pas directement passer à l'état "livrée" sans être passée par l'état "expédiée".

### Diagramme d'activité du fonctionnement d'une notification

Afin de suivre le fonctionnement d'une notification, j'ai fais ce diagramme d'activité ci-joint : 

![Diagramme d'activité](diagram/notification-activity-diagram.png)

Tout d'abord, concernant le Client, nous allons poser l'hypothèse qu'il effectue simplement un appel API pour signaler un événement (suite à la réponse à la question 2 reçu par mail). 

L'API reçoit la requête HTTP et la transmet au Controller, qui se charge de vérifier la validité des données reçues.

Deux cas sont alors possibles :

- Si les données sont invalides, le Controller renvoie directement une réponse HTTP avec le code 400 au client.

- Si les données sont valides, le Controller les transmet à l'EventService, qui applique les règles métier nécessaires avant de créer la notification adaptée. Celle-ci est ensuite publiée auprès du MessageBroker, qui se charge de la distribuer aux différents services de notification.

L'envoi des notifications dépend des préférences de l'utilisateur et doit respecter les règles suivantes (suite à la réponse à la question 6 reçue par mail) :

- Notification de commande toujours envoyées sur un canal minimum.

- Les promotions demandent le consentement explicite.

Dans le cadre de cet exercice, la gestion des préférences utilisateur ne sera pas implémentée dans le prototype.

### Diagramme de séquence pour une commande passée

Enfin, afin d'obtenir une vue globale du fonctionnement du système lors du passage d'une commande, j'ai réalisé le diagramme de séquence suivant :

![Diagramme de Séquence](diagram/diagram_sequence_order_placed.png)

Tout d'abord, l'API reçoit un événement indiquant qu'une commande a été passée (ORDER_PLACED).

La suite du traitement reste identique au fonctionnement présenté dans les diagrammes précédents.

Concernant l'envoi des notifications, en cas d'échec, plusieurs tentatives seront effectuées avant de considérer l'envoi comme définitivement échoué (suite à la réponse à la question 5 reçue par mail).

## Liste de questions

- Il y a t-il des contraintes particuliers pour les états des commandes ? (Une commande passée, peut-il passer à livrée sans passer par expédiée)

Réponse : 

```
Considérons un cycle linéaire : Passé => Expédié => Livré.
Une commande ne peut pas sauter d'étape. Nous ne considérons pas non plus de compensation dans le cadre de l'exercice.

Rejeter une transition invalide est un plus, mais ce n’est pas obligatoire. L’annulation et le retour sont hors périmètre.
```

- Quels acteurs (livreur, client, organisme, ...) peuvent impacter le changement d'état d'une commande (expédiée, livrée) ?

Réponse :

```
Très pertinent, cependant c'est hors périmètre. Nous allons considérer que les changements d'état arrivent sous forme d'event, par exemple un simple appel HTTP venant du système de commande ou du transporteur. Inutile de modéliser le livreur ou le client.
```

- Les notifications possibles sont-ils un choix pour un seul canal d'envoie. Ou l'ensemble des canaux peuvent être effectués.

Réponse :

```
Un même event peut partir sur plusieurs canaux, selon la préférence de l'utilisateur.
```

- Le délai d'émission d'une notification doit-il effectué instannément après le changement d'un état de commande ou d'une promotion ?

Réponse :

```
Les notifications de commande doivent partir en quasi temps réel, soit quelques secondes. Un traitement async convient

Les promotions ne sont pas urgentes : elles peuvent être différées ou regroupées
```

- En cas d'erreur d'envoi de notification, doit-il réessayer dans l'immédiat, après un certains délai, ou ne jamais réessayer ?

Réponse :

```
Classiquement, les nouvelles tentatives (3 à 5) avec un délai croissant. Au-delà, l'échec est journalisé ou mis de côté (DLQ). Pour l'exercice, des fournisseurs simulés (faux e-mail, SMS et push) suffisent
```

- L'activation notification sur chaque canal est-il une décision d'un utilisateur ou déjà fixé ?

Réponse :

```
Cela revient à l'utilisateur :

Notification de commande toujours envoyées sur un canal minimum

Les promotions demandent le consentement explicite
```

- Pour les produits récemment consulté, combien de temps sont-il conservé pour envoyer les notifications de promotion ?

Réponse :

```
30 jours. Limiter le nombre de promotions envoyées, par exemple une par jour et par utilisateur, est un plus apprécié mais facultatif.
```
