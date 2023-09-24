# Building a quiz App :boom:

## What's in there ?

Oriented object programmation project with MVC arch and some node packages.
- [node](https://nodejs.org/fr)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [postgres](https://www.npmjs.com/package/pg)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [express](https://www.npmjs.com/package/express)
- [ejs](https://www.npmjs.com/package/ejs)
- [express-session](https://www.npmjs.com/package/express-session)
- [email validator](https://www.npmjs.com/package/email-validator)

<br/>

## How to check this out ?

*Don't forget to create the **table**, the **user** that owns the table and to fill in the **.env file**.*

Install the dependencies
```bash
npm i
```

Create and populate the database
```bash
npm run db:rebuild
```

Launch the server
```bash
npm start
```

**Enjoie!**

<br/>

## Admin account Logs

email : **admin@admin.io**

password : **Azerty92!**

<br/>

## Project History
1. [Init & Architecture deployment](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/db948a63ad50190e960bf13e40bf20ecde342a48)
2. Local database creation (+ tables and datas imports)
3. [Postgres Init](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/edbd72d5e6ce30b84b7c79166a448e25e6118165)
4. [Entities Definition](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/05c5cb67f2793827379f7a3445652bc5b95b9bf8)
5. [Classes Setters(with errors hundlers) & Getters](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/42507d254f48e507eccea343e058e6ac1124002f)
6. [Models Definition with Sequelize](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/b347aa6471a63fefe555c67509ecf6aa08d421e1)
7. [Models Association and validation](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/09c35ea3bfa33b590648ca4eb0205863ef939642)
8. [Express/Ejs Init and Deployment](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/a38a035af3cd7b54c518ec029bf2cf099c5db6f6)
9. [User Signup](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/bda9c2f6f73ada5d0f455fbfc9667b51eee6a875)
10. [User Login](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/c617401badc92048b3fe9430a4b10151503c7358)
11. [User session with express-session](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/ee7517d6aee3c0a2257802fa061e5d4050fb4cf3)
12. [User Logout](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/efb6f3722dc20927d24305e18c1da803da5709c7)
13. [Admin Delete controller](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/916096cf0df47c31242f057e78fd0014cec9665e)
14. [Admin Add controller](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/a99f0dae2cfc7c73b9af33ff6286b4f04990c230)
15. [Pages Roles Restrictions](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/4bd396640403404bca9e608e070543b256173019)
16. [Admin Update controller](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/d635e8f6d184f68454c55995312d29032b624864)
17. [Profile User Edit](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/d4175a6bb66ab9c1b851c2036368ed228e9b512c)
18. [Quiz CRUD](https://github.com/O-clock-Cheesecake/oQuiz-mMormin/commit/4ddd138b44e1b847ec023d8bfad5c312162bbeef)
19. (WIP | QUESTIONS CRUD with Answers and good answer)
20. GOOD ANSWER VALIDATION
21. QUIZ TIMER (question by question)
22. SCORE (by quiz, all members, profile etc.)

<br/>

## Hotlinks
*Les objets en JS* : https://kourou.oclock.io/ressources/fiche-recap/les-objets-en-js/

*Ton meilleur ami* :
https://kourou.oclock.io/ressources/fiche-recap/this/

*El Famoso Mélange Vodka Coco* :
https://kourou.oclock.io/ressources/fiche-recap/architecture-mvc-model-view-controller/

*👉🏾❔🧄💤* :
https://sequelize.org/

*Rapide, Léger & Puissant* :
https://expressjs.com/
