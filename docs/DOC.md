# Követelményanalízis

## Funkcionális követelmények

- Vendégként recepteket megtekinteni.
- Felhasználóként(Receptszerkesztő) szeretnék recepteket megosztani másokkal: Recept hozzáadás
- Felhasználóként szeretnék módosítani a receptjeimen: Recept módosítás
- Felhasználóként szeretnék recepteimből törölni.
- Operátorként szeretném a felhasználókat törölni, ha szükséges.

## Nem funkcionális követelmények

- Felhasználóbarát ergonomikus elrendezés és kinézet
- Biztonságos működés: jelszavak tárolása, funkciókhoz való hozzáférés
- Gyors

## Használatieset-modell

-  Vendég: A főoldal tartalmához hozzáfér, receptet írni nem tud.
-  Receptszerkesztő: Vengég szerepkörén túl, receptet is írhat.
-  Operátor: Receptszerkesztő szerepkörén túl, törölheti bárkit.

## Használati eset diagramok:

## Folyamatok pontos menete:

# Tervezés

## Architektúra terv

### Komponensdiagram

### Oldaltérkép

Publikus:

- Főoldal(összes recept)
- Súgó
- Bejelentkező felület
- Regisztrációs felület
 
Recept szerkesztő:

- Receptek
    + új recept
    + (saját)recept szerkesztése
    + (saját)recept törlése
        
Operátor:
    + felhasználók listázása
    + felhasználók törlése

### Végpontok

GET /: főoldal: receptek listája
GET /about: leírás a használatról
GET /user/signin: bejelentkező oldal
POST /user/signin: bejelentkezési adatok felküldése
GET /user/signup: regisztrációs oldal
POST /user/signup: regisztrációs adatok felküldése
GET /user/edit/:id: felhasználói felület,felhasználó szerkesztése
GET /recipes/list: saját receptek oldala
GET /recipes/new: új recept felvitele
POST /recipes/new: új recept felvitele, adatok küldése
GET /recipes/edit/:id recept adatai szerkesztése
GET /recipes/del/:id recept adatai törlése
POST /recepies/:id/comment: új megjegyzés
GET /user/list: operátor felület, felhasználó lista
GET /user/del/:id: operátor felület,felhasználó törlése


## Felhasználóifelület-modell

### Oldalvázlatok

### Designterv (nem kell, elég a végső megvalósítás kinézete)

## Osztálymodell

### Adatmodell

### Adatbázisterv

### Állapotdiagram

## Dinamikus működés

### Szekvenciadiagram

# Implementáció

Fejlesztői környezet bemutatása
Könyvtárstruktúrában lévő mappák funkiójának bemutatása

# Tesztelés

Automatikus tesztek szükségesek. Nem kell teljeskörű tesztelés, a hallgató mutassa meg, hogy képes ilyen tesztek írására.

Tesztelési környezet bemutatása
Egységtesztek: legalább 1 adatmodell tesztelése
Funkcionális felületi tesztek: legalább 1 folyamat tesztelése
VAGY: Selenium IDE használatával
VAGY: zombie.js használatával
Tesztesetek felsorolása: milyen eseteket próbált végig a hallgató

# Felhasználói dokumentáció

A futtatáshoz ajánlott hardver-, szoftver konfiguráció
Telepítés lépései: hogyan kerül a Githubról a célgépre a program
A program használata