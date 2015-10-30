
function RecipesController(){

        this.init = function(app,express){
           
            var router = express.Router();
            initRoutes(router);
            initActions(router);
            console.log('RecipesController::init() DONE.');
        }

        function initActions(router){
            
        }

        function initRoutes(router){  
            
            
            var rndList = function (req, res) {
                        console.log("Rendering recipe list.");
                        res.render('recipe/list',{
            recipes: [{
            rcpname:"Teszt recept 1",
            rcpdesc: "------leírás.....1",
            rcpimgurl:"http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                    },
                    {
            rcpname:"Teszt recept 2",
            rcpdesc: "------leírás.....2",
            rcpimgurl:"http://superdevresources.com/wp-content/uploads/sites/7/2014/09/colorful-food-icons.jpg"
                    },
                    {
            rcpname:"Teszt recept 3",
            rcpdesc: "------leírás.....3",
            rcpimgurl:"http://superdevresources.com/wp-content/uploads/sites/7/2014/09/colorful-food-icons.jpg"
                    },
                    {
            rcpname:"Teszt recept 4",
            rcpdesc: "Tésztához:\
            A tészta hozzávalóit összegyúrjuk. Majd kettévesszük úgy, hogy egyik része kicsivel nagyobb legyen.\
            Nagyobbik részét hűtőbe, kisebbik részét fagyasztóba tesszük, amíg a tölteléket elkészítjük.\
            Töltelékhez:\
            Az almákat meghámozzuk, legyaluljuk. Margarinon a cukorral félpuhára pároljuk. A pudingport kevés vízzel elkeverjük, az almára öntjük, és besűrűsítjük. Langyosra hűtjük.\
            A tojásfehérjét kemény habbá verjük, és óvatosan beleforgatjuk az almás krémbe.\
            Egy nagyobb tepsit sütőpapírral kibéleljük, a nagyobbik tésztát tepsi méretűre nyújtjuk, a kihűlt krémet elterítjük rajta, a fagyasztós tésztát ráreszeljük, és készre sütjük.\
            Baradlay Kazimir, a fiúk atyja, ki Habsburg-hű, végrendelkezik. A felesége azonban megesküszik, hogy végakaratának ellenkezőjét teszi, s hazahívja a pétervári követet, Baradlay Ödönt.\
            Legidősebb fiam, Ödön, maradjon a szentpétervári udvarnál. Most még csak követségi titkár, idővel magasabbra lesz hivatva. Az a hely jó iskola neki. A természet és a ferde hajlamok sok rajongást oltottak szívébe, ami fajunkat nem üdvözíti. Ott kigyógyítják mindabból. Az orosz udvar jó iskola.\
            Második fiam, Richárd, még egy évig marad a királyi testőrségnél. De ez nem életpálya. Kezdetnek jó. Innen lépjen át a lovassághoz; ott szolgáljon ismét egy évig, s akkor igyekezzék a táborkarba bejutni. Ügyesség, vitézség és hűség három nagy lépcső a magasba jutáshoz. Mind a hármat a gyakorlat hozza meg.\
            Harmadik fiam, a legifjabb, Jenő: az én kedvencem. Nem tagadom, hogy a legjobban szeretem őt mind a három között. Ő nem fogja azt soha tudni. Mert hiszen úgy bántam vele, mintha mostohája volnék. Tovább is úgy bánjék ön vele. Maradjon Bécsben és szolgáljon a hivatalban és tanulja magát fokról fokra felküzdeni. Ez a küzdelem neveli őt simának, okosnak és eszesnek.\
            Richárd Plankenhorsték házában megismeri Liedenwall Editet, s bejelenti házassági szándékát. Ezt követően zárdába küldik Editet. Jenő a Plankenhorst-ház állandó vendége, mivel fülig szerelmes a szép Alphonsine-ba. Fogalma sincsen arról, hogy a nő Palvicz Ottó szeretője.\
            Jenő őrülten szerelmes volt Alphonsineba. Az igaz, hogy igen szép hölgy volt, eszményi arc, alak. Finom, tökéletes vonások, nemes hajadoni tekintet, báj és kellem minden arcjátéka. De milyen sötét lélek lakott ez angyalarcon belül!  Baradlayné kézfogót szervez hat héttel a férje halála után. Nem a sajátját Rideghváry BencéveI, hanem Ödönét Arankával, s fiának szánja a főispáni széket. Rideghváry abban a hiszemben volt, hogy Baradlayné neki nyújtja majd a kezét. Összegyűlt az egész megye, Tallérossy Zebulon is. A násznagyok beszédéből derült csak ki, hogy a vőlegény Baradlay Ödön, s a menyasszony Lánghy Aranka.\
            Március 13-án Bécsben kitör a forradalom. Plankenhorsték látszólag szimpatizánsok. Jenő minden nap a ház vendége. Jenő már teljesen hozzászokott, hogy Plankenhorsték házában tartózkodik naphosszat, sőt mindenki elfogadta viszonyukat. Editék kolostorát, a Brigitta-szűzek zárdáját megtámadja a csőcselék, de Richárd hősiesen megmenti a kolostor lakóit. Richárdot anyja és szerelme azonban arra veszi rá, hogy meneküljön el Bécsből, mivel itt halálos veszedelemben van. Kis csapatával szerencsésen jutnak át Magyarországra. Három akadályba ütköztek: Palvicz Ottó nehézlovasaiba, két folyóba: a Dunába és a Marchba, valamint a Kárpátokba. Szinte lehetetlennek tűnt a menekülés. A Duna felé indultak, félnapi előnyük volt az üldözőik előtt. Jelzőtüzekkel adták a környékbeliek tudtára, hogy menekülő sereg. Egy mély völgy felé fordultak, de elöntötte a víz, s alkalmi hídon, nagyon lassan csak egyesével tudtak átjutni. Palvicz Ottó nehézvértesei utolérték őket, gyorsan pusztították el az alkalmi hidat, hogy az üldözőiktől megszabaduljanak. Palvicz pisztolypárbajra hívta ki Richárdot, de egyikőjük sem sebesült meg.\
            Délutánra ismét beérték az üldözők a huszárokat. Palvicz messziről arra biztatta Richárdot, hogy adják meg magukat, mert nincs semmi esélyük. A magyarok azonban vakmerően a March megáradt jeges vizébe vetették magukat, ahová a nehézvértesek nem követték őket.\
            Alphonsine szerelmet vall Baradlay Jenőnek, aki ezért megkéri anyjától a kezét, de kosarat  kap. Rideghváry másnap pétervári pozíciót ajánl fel neki, így a második lánykérés már sikeres. Baradlayné addig könyörög Jenőnek, míg sikerül, hogy utazzon vele haza Magyarországra Bécsbő1, mivel itt halálos veszedelemben van.\
            A szabadságharcban a két nagyobb fiú: Richárd és Ödön teljes lelkével részt vesz. Ödön kormánybiztos, Richárd huszártiszt. Az isaszegi ütközetben fényes győzelmet arat a magyar sereg a császáriakon. Richárd megküzd Palvicz Ottóval, akit a párviadalban legyőz. A haldokló osztrák tiszt utolsó kívánsága az, hogy Richárd kutassa fel Károly nevű fiát, s gondoskodjon a neveltetéséről. Elárulja, hogy a gyermek anyja Plankenhorst Alphonsine, de megesketi, hogy az anya nevét senkinek sem árulja el.\
            Amikor megérkezik Ottó halálhíre szerelméhez, Alphonsine-hoz, a lány - Edit füle hallatára bosszút esküszik a gyilkosa, Richárd ellen.\
            Richárd és Ödön azon vitatkoznak, hogy érdemes-e megtámadni Budát, s végül forradalmi párbajt vívnak. Aki előbb ér fel a vár tetejére, az a győztes. Ödönnek sikerül, de Richárd nem kisebb hőstettet hajt végre, minthogy megakadályozza a Lánchíd felrobbantását. A két testvér boldogan összeölelkezik.\
            Mihály mester, a csizmadia elhatározza, hogy kideríti, ki az, aki a császáriakat informálja. Az egyetlen épségben maradt Duna-parti palota padlásán meg is találta a gonosztevőt, ki egy gyertyával jelzett az ablakból az ellenségnek. A bátor csizmadia egy merész mozdulattal kitaszítja a besúgót az ablakból. De hogy ki volt az, csak találgatni lehet. Richárd betartja Palvicz Ottónak tett ígéretét, s nehezen, de felkutatja Károly fiát. A gyermek rossz állapotban van.\
            Rideghváry is közreműködik, hogy az orosz cár beavatkozzon a szabadságharcba, az orosz csapatok élén vonul Magyarországra, a vésztörvényszék tagja. A szabadságharc bukásra van ítélve .Ödön külföldre készül szökni, de - egykori barátja, Ramiroff segítségével - az oroszok elfogják. Egy másik régi ismerőse, egy orosz kocsis segít neki megszökni, s a Kőrös-szigetre siet, ahol felesége, valamint két gyermeke is tartózkodik. Felesége hiába könyörög, nem hajlandó menekülni tovább.\
            Hadbírói idézés érkezik Baradlayékhoz. Ödönnek szól, de Jenő jelenik meg a bíróság előtt, s mivel nem ismerik bátyját, elhiszik neki, hogy ő a vádlott (Eugen=Jenő). Magára vállal mindent, s hamarosan kivégzik. Búcsúlevélben köszön el családjától.\
            A szép Alphonsine mindent elkövet, hogy szerelme gyilkosát, Richárdot vérpadra juttassa. Felkeresi a teljhatalmú kormányzót, s megkéri, hogy ítélje halálra a középső Baradlay fiút, amíg nem késő, mert másnap eltávolítják a kormányzói székből. Rosszul számít, Haynau felmenti, s elküldi Alphonsine-hoz, hogy köszönje meg a hölgynek a kegyelmet.\
            Richárd Bécsbe siet, hogy végre feleségül vegye Editet, de Plankenhorsték nem hajlandók beleegyezni a házasságba. Amikor értesülnek róla, hogy Palvicz Ottó elmondta, ki a gyermeke édesanyja, akkor már kénytelenek elfogadni a helyzetet.\
            Editról kiderül, hogy komoly vagyon örököse. Ez az oka annak, hogy Plankenhorsték a zárdába „dugása” mellett voltak. Palvicz Károlyt Richárd neveli, Alphonsine nem egyszer áskálódik a fiú nevelőapja ellen. Amikor a fiú felnő, anyja koldusszegényen keresi fel, hogy segítsen rajta, de ő megtagadta. Ezt követően Alphonsine egy szegény kórházba megy, ahol az alapító Baradlayné éppen jelen van, s tőle tudja meg, hogy Jenő, egykori rajongója áldozta fel magát bátyja, Ödön helyett. Ettől teljesen összeroppan.",
            rcpimgurl:"http://superdevresources.com/wp-content/uploads/sites/7/2014/09/colorful-food-icons.jpg"
                    }
                    
                    
                    ]
            });
            };
            
            router.get('/', rndList );
            router.get('/list', rndList );
        router.get('/new', function (req, res) {
            console.log("Rendering recipe new.");
            res.render('recipe/new');
        });
        router.get('/edit', function (req, res) {
            console.log("Rendering recipe edit.");
            res.render('recipe/edit');
        });
    } 
    
}
module.exports= new RecipesController();