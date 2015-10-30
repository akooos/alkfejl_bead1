# Követelményanalízis

## Funkcionális követelmények

- Vendégként recepteket megtekinteni.
- Felhasználóként(Receptszerkesztő) szeretnék recepteket megosztani másokkal: Recept hozzáadás
- Felhasználóként szeretnék módosítani a receptjeimen: Recept módosítás
- Felhasználóként kommenteket hozzáfűzni a receptekhez.
- Operátorként szeretném a kommenteket törölni, ha szükséges.

## Nem funkcionális követelmények

- Felhasználóbarát ergonomikus elrendezés és kinézet
- Biztonságos működés: jelszavak tárolása, funkciókhoz való hozzáférés
- Gyors

## Használatieset-modell

-  Vendég: A főoldal tartalmához hozzáfér, receptet megosztani nem tud.
-  Receptszerkesztő: Vengég szerepkörén túl, receptet is megoszthat.
-  Operátor: Receptszerkesztő szerepkörén túl, törölheti bárki megjegyzését, receptét.

## Használati eset diagramok:

## Folyamatok pontos menete:

# Tervezés

## Architektúra terv

### Komponensdiagram

### Oldaltérkép

Publikus:

- Főoldal
- Help
- Login

Bejelentő

- Főoldal
- Help
- Login/Logout
- Receptek
    + új recept
    + recept megtekintése
        * megjegyzés hozzáfűzése

Operátor

### Végpontok

GET /: főoldal
GET /help: leírás a használatról
GET /login: bejelentkező oldal
POST /login: bejelentkezési adatok felküldése
GET /recepies/list: saját hibalista oldal
GET /recepies/new: új hiba felvitele
POST /recepies/new: új hiba felvitele, adatok küldése
GET /recepies/:id: hiba adatai
POST /recepies/:id/comment: új megjegyzés
GET /operator/list: operátor felület, hibalista
GET /operator/errors/:id: operátor felület,
POST /operator/errors/:id/status: 

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