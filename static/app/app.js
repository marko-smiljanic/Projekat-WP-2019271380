import Bioskop from "./components/bioskop.js"    //prazna komponenta, sluzi mi samo da uradim create app!!!
import TabelaKorisnika from "./components/korisnikTabela.js"
import Korisnici from "./components/korisnici.js"
import KorisnikDodavanjeForma from "./components/korisnikDodavanjeForma.js"
import KorisnikIzmenaForma from "./components/korisnikIzmenaForma.js"
import Login from "./components/login.js"
import Logout from "./components/logout.js"
import UlogovaniKorisnik from "./components/ulogovaniKorisnik.js"
import TabelaFilmova from "./components/filmTabela.js"
import Filmovi from "./components/filmovi.js"
import FilmDodavanjeForma from "./components/filmDodavanjeForma.js"
import FilmIzmenaForma from "./components/filmIzmenaForma.js"
import Karte from "./components/karte.js"
import KartaDodavanjeForma from "./components/kartaDodavanjeForma.js"
import KartaIzmenaForma from "./components/kartaIzmenaForma.js"
import Korpa from "./components/korpa.js"
import TabelaRezervacija from "./components/rezervacijaTabela.js"
import Komponente from "./components/pravaPristupaZaCeleKomponente.js"
import SignIn from "./components/sign-in.js"
import ZahtevZaKreiranjeNaloga from "./components/zahteviZaPravljenjeNalogaTabela.js"


axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    Object.assign(config.headers, {"Authorization": `Bearer ${token}`});
  
    return config;
});


const router = VueRouter.createRouter({  
    history: VueRouter.createWebHashHistory(),
    routes: [                                              //ideja je da korenska putanja budu filmovi, sto je valjda primaran entitet projekta
        {path: "/korisnici", component: Korisnici}, 
        {path: "/login", component: Login},
        {path: "/logout", component: Logout},
        {path: "/profil", component: UlogovaniKorisnik},   
        {path: "/dodajKorisnika", component: KorisnikDodavanjeForma},    
        {path: "/korisnici/:id", component: KorisnikIzmenaForma},
        {path: "/filmovi", component: Filmovi},
        {path: "/dodajFilm", component: FilmDodavanjeForma},
        {path: "/filmovi/:id", component: FilmIzmenaForma},
        {path: "/karte/:id", component: Karte},                     //ovde sam morao prikaz karte sa id-jem jer zelim samo da prikazem one karte za dati film
        {path: "/dodajKartu/:id", component: KartaDodavanjeForma},
        {path: "/izmeniKartu/:id", component: KartaIzmenaForma},
        {path: "/dodavanjeKarteUKorpu/:id", component: Korpa},
        {path: "/rezervacije", component: TabelaRezervacija},
        {path: "/", component: Filmovi},   //nisam dodao odma na pocetku da root putanja budu filmovi odnosno stranica koja se prva prikaze kada se pokrene aplikacija, zbog toga sam dodao sad jer me mrzi da menjam rutu /filmovi svuda u komponentama
        {path: "/sign-in", component: SignIn},
        {path: "/zahtevi", component: ZahtevZaKreiranjeNaloga},

        
    ],
  })





const app = Vue.createApp(Bioskop);
app.component("tabela-korisnika", TabelaKorisnika);
// app.component("korisnik-forma", KorisnikForma);  //ovako smo radili pre na vezbama da pravimo genericku formu, koja ce raditi i dodavanje i izmenu, sad vise nema smisla to da radimo jer smo uveli rutiranje a i na ovom predmetu nije obavezno
app.component("tabela-filmova", TabelaFilmova);
app.component("komponente", Komponente);



app.use(router)
app.mount("#app");