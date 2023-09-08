# EXO

## 1. Wireframes

En autonomie : 
Faites les wireframes des pages suivantes : 
- Accueil
- catalogue de quiz
- Page de détail d'un quiz
- page de thèmes
- page de login

BONUS : 
Si vous avez terminé : réfléchissez aux version mobiles

BONUS ++ 
Vous pouvez commencer les maquettes graphiques (cette fois-ci avec les détails graphiques)


## 2. MCD

Dessinez le MCD de l'application.

On commence par définir les entités (les futures tables de la DB)
Rappel : toujours en miuscule, au singulier
- quiz
- question
- réponse
- utilisateur (ou admin, ou auteur)
- theme (ou catégorie)
- niveau (ou difficulté)

Les tables seront plutôt nommées en anglais :
- quiz
- question
- answer
- user
- tag
- level

Maintenant on définit les relations entre ces tables :

- quiz / tag
  - un quiz peut avoir combien de tag au minimum / au maximum ? => 0 / N
  - un tag peut être attribué à combien de quiz min / max ? => 0 / N

- quiz / question
  - un quiz est composé de combien de question au minimum et max ? => 0 / N
  - une question appartient à combien de quiz min / max => 1 / 1

- quiz / user
    - un quiz est créé par combien d'auteur min / max => 1, 1
    - un auteur peut créer combien de quiz min / max => 0, N

- question / level
    - une question a combien de niveaux min / max => 1, 1
    - un niveau est composé de combien de questions min / max => 0, N


- question / answer
  - une question possède combien de réponses possibles au min et max ? => 0, N
  - une réponse possible appartient à combien de questions min / max ? => 1, 1
ET
  - une question possède combien de réponse JUSTE au min / max => 1, 1
  - une réponse valide combien de question min / max => 0, 1
