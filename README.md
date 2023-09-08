# oQuiz - Challenge jour 2 : Le début du commencement

## Get/Set

Dans chaque classe, à commencer par `CoreModel`, coder un "getter" et un "setter" par propriété en y ajouter les instruction voulues.
(pas forcément TOUS !)

<details>
<summary>Un exemple </summary>

```JS
class CoreModel {
  id;

  get id() {
    return this.id;
  };

  set id(value) {
    this.id = value;
  };
};
```

</details>

## Bonus : ne pas autoriser de valeurs absurdes

Dans les "setters", rajouter des tests pour vérifier que la donnée passée en argument est au moins du bon type.

<details>
<summary>Un exemple</summary>

```js
class CoreModel {
  id;

  set id(value) {
    if(isNaN(parseInt(value, 10))) {
      throw Error("CoreModel.id must be a integer !");
      // on "lève" une erreur => ça arrête tout !
    }
    this.id = value;
  }
};
```

</details>


----------------------------------------------------


# oQuiz - challenge jour 1

En utilisant l'analyse préliminaire de la BDD, le MCD, et les fiches récap, écrire le MLD de l'application.

## Bonus

Écrire le fichier SQL pour créer les tables listées dans le MLD.


Fiches récap :

MCD : https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/

MLD : https://kourou.oclock.io/ressources/fiche-recap/mld/
