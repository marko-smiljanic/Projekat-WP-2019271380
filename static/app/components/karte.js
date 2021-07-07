export default {     //sada ovde pisemo template
    template:   `
    <div class="text-center" v-if="ulogovani_korisnik['tip_korisnika_id'] == 1">
        <button class="btn btn-warning mt-4" v-on:click="predjiNaDodavanjeKarte()">Dodaj novu kartu</button>
    </div>   <!-- greska sto mi se nije prikazala komponenta je tta sto nisam bio zatvorio div tag pa je sve ovo posmatralo da je jedan div tag-->
    
    <div v-if="imaKarata == true">
        <h3 class="mb-4 mt-3 text-center">Dostupne karte za film: {{film.naziv}} {{film.godina_izlaska}}</h3>
        <div v-for="k in karte">
            <div class="card text-dark bg-light mb-3 shadow mx-auto" style="max-width: 20rem;" v-if="k.film_id == film.id">
                <div class="card-header">{{film.naziv}}</div>
                <div class="card-body">
                    <h5 class="card-title">Vreme pocetka: {{k.vreme_pocetka_projekcije}}</h5>
                    <h5 class="card-title">Vreme zavrsetka: {{k.vreme_zavrsetka_projekcije}}</h5>
                    <h5 class="card-title">Cena: {{k.cena}}</h5>
                    <button class="btn btn-success mx-1 mb-3" v-on:click="predjiNaDodavanjeUKorpu(k.id)" v-if="ulogovani_korisnik['tip_korisnika_id'] == 2">Dodaj u korpu</button>
                    <button class="btn btn-primary mx-1 mb-3" v-on:click="predjiNaIzmenuKarte(k.id)" v-if="ulogovani_korisnik['tip_korisnika_id'] == 1">Izmeni</button>
                    <button class="btn btn-danger mx-1 mb-3" v-on:click="deleteKarta(k.id)" v-if="ulogovani_korisnik['tip_korisnika_id'] == 1">Ukloni</button>
                </div>
            </div>    
        </div>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
    </svg>
  
    <div class="alert alert-primary d-flex align-items-center mt-4" role="alert" v-if="imaKarata == false">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
        <div>
            Trenutno nema dostupnih karata za ovaj film.
        </div>
    </div>

    `,
    data() {
        return {
            film: {},    //ucitavamo jedan film ciji je id prosledjen u komponenti filmovi tabela u ruter push, jer bitan nam je jedan film i da za njega prikazemo sve njegove karte
            karte: [],
            imaKarata: false,
            ulogovani_korisnik: {},
            ulogovan: false,
        }
    },
    methods: {                     
        refreshFilm(){              
            axios.get(`/api/filmovi/${this.$route.params["id"]}`).then((response) => {   //mozda je malo cudno sto ovako prikazujem komponentu karte, tj. sa id-jem filma, ali poenta mi je da ne prikazujem sve postojece karte nego kada se u filmu klikne na dodaj kartu u korpu
                this.film = response.data;
            });
        },
        refreshKarte(){
            axios.get("/api/karte").then((response) => {
                this.karte = response.data;

                if(this.karte.length != 0){
                    for(let i = 0; i < this.karte.length; i++){
                        if(this.karte[i].film_id == this.film.id){   //ako ucitani film ima bar jednu svoju kartu
                            this.imaKarata = true;
                            break;
                        }
                    }
                }

            });
        },
        refreshKorisnici(){
            axios.get("/api/korisnici/ulogovani").then((response) => {
                if (localStorage.getItem("token") != null) {
                    this.ulogovani_korisnik = response.data;
                    this.ulogovan = true;
                }else{
                    ulogovan = false;
                }
            });
        },
        predjiNaDodavanjeKarte(){
            this.$router.push(`/dodajKartu/${this.film.id}`);   //prikaz karata samo za jedan film
        },
        deleteKarta(id){
            axios.delete(`/api/karte/${id}`).then((response) => {
                this.refreshKarte();
            });
        },
        predjiNaIzmenuKarte(id){
            this.$router.push(`/izmeniKartu/${id}`);
        },
        predjiNaDodavanjeUKorpu(id){
            this.$router.push(`/dodavanjeKarteUKorpu/${id}`);
        }
        // napraviNovogKorisnika(kor){
        //     axios.post("api/korisnici", kor).then((response) => {
        //         this.refreshData();

        //     });
        // },
        // setKorisnikZaIzmenu(kor){    //trenutno radi samo prelazak na drugu komponentu, ovo moram odraditi preko podataka iz komponente tabele da bi znao koji je korisnik odabran za izmenu!!!
        //     //this.kupacZaIzmenu = {...kupac};

        //     this.$router.push(`/korisnici/${kor.id}`);
        // },
        // izmeniKorisnika(kor){
        //     axios.put(`/api/korisnici/${kor.id}`, kor).then((response) => {
        //         this.refreshData();
        //     });  
        // },

        // predjiNaDodavanje(){
        //     this.$router.push("/dodajKorisnika");
        // },
        // predjiNaIzmenu(){
        //     this.$router.push(`/korisnici/${kor.id}`);
        // }

    },
    created(){
        this.refreshFilm();
        this.refreshKarte();
        this.refreshKorisnici();
    }
}
