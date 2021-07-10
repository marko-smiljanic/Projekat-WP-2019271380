export default {     //sada ovde pisemo template
    template:   `
        <div class="alert alert-primary d-flex align-items-center mb-4 mt-3" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div>
                Pre nego sto dodate u korpu i rezervisete, odaberite kolicinu.
            </div>
        </div>

        <div class="card text-dark bg-light mb-3 mt-3 shadow mx-auto" style="max-width: 20rem;">
            <div class="card-header">{{film.naziv}}</div>
            <div class="card-body">
                <h5 class="card-title">Vreme pocetka: {{karta.vreme_pocetka_projekcije}}</h5>
                <h5 class="card-title">Vreme zavrsetka: {{karta.vreme_zavrsetka_projekcije}}</h5>
                <h5 class="card-title">Cena: {{karta.cena}}</h5>
                
                <form v-on:submit.prevent="dodajUKorpu()"> 
                <div class="card-tittle">
                    <label for="kolicina">Kolicina: </label>
                    <input type="number" min="1" name="kolicina" class="form-control" placeholder="kolicina" v-model="kolicina" required>
                </div>
                
                <h4 class="card-title mt-3">Ukupna cena: <span style="color: red">{{kolicina * karta.cena}} din</span></h4>

                <div class="mb-3" v-if="kliknut == false">
                    <input type="submit" class="btn btn-success" value="Dodaj">
                </div>
                
                <h4 class="card-title mb-3 mt-2" v-if="kliknut == true" style="color: red">Zelite li da potrvrdite rezervaciju? </h4>
                <div class="mb-3" v-if="kliknut == true">
                    <button class="btn btn-danger" v-on:click="napraviNovuKartuUrezervaciji()">Rezervisi</button>
                </div>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            karta: {},
            film: {},
            kolicina: 0,
            kliknut: false,
            ulogovani_korisnik: [],
        }
    },
    methods: {                     
        refreshKarta(){
            axios.get(`/api/karte/${this.$route.params["id"]}`).then((response) => {   //mozda je malo cudno sto ovako prikazujem komponentu karte, tj. sa id-jem filma, ali poenta mi je da ne prikazujem sve postojece karte nego kada se u filmu klikne na dodaj kartu u korpu
                this.karta = response.data;
                //ovde mi se prvi put javlja problem sa datumom zato samo kastujem u javascript objekat Date
                // this.karta["vreme_pocetka_projekcije"] = new Date(this.karta["vreme_pocetka_projekcije"]).toISOString().split("Z")[0];
                // this.karta["vreme_zavrsetka_projekcije"] = new Date(this.karta["vreme_zavrsetka_projekcije"]).toISOString().split("Z")[0];
                //mogao sam i ovde dodeliti film id this karta

                axios.get(`/api/filmovi/${this.karta.film_id}`).then((response) => {
                    this.film = response.data;
                });
            });
        },
        refreshUlogovaniKorisnik(){              
            axios.get("/api/korisnici/ulogovani").then((response) => {
                if (localStorage.getItem("token") != null) {
                    this.ulogovani_korisnik = response.data;
                    this.ulogovan = true;
                }else{
                    ulogovan = false;
                }
            });
        },
        dodajUKorpu(){
            this.kliknut = true;            //ovo znaci da samo jednom moze da doda u korpu i posle toga se gubi funkcija za ponovno dodavanje i daju mu opcije za rezervaciju
            this.kolicina = parseInt(this.kolicina);
            let kartaUKorpi = {"kolicina": this.kolicina, "karta_id": this.karta.id};

            localStorage.setItem("karta_u_korpi", JSON.stringify(kartaUKorpi));

            //trebao bih da omogucim izmenu i brisanje sadrzaja iz korpe (localStorage-a), ali posto sam zamislio da korpu ne cuvam trajno (u bazi)
            //nego da je cuvam privremeno u localStorage ne znam to da uradim jer ne znam kako da nadodajem vrednost u local storage a da ne brisem postojecu
            //pokusao sam sa: prvo ucitam vrednosti iz local storage, na to dodam novu i vratim ponovo u local storage, ali kada se stranica refresh-uje gubim ono sto sam imao u
            //npr. promenljivoj koju sam ovde zvao noviNiz, i onda bi sledece dodavanje u local storage bilo ponistavanje svega i u korpi bi bila samo npr. ta jedna nova karta
            //moj glavni problem je sto ne mogu da sacuvam vec postojece vrednosti u localstorage ako se refresh-uje strnaica, tj. ova komponenta
        },
        napraviNovuKartuUrezervaciji(){  //ovde moram imati i rezervaciju u json-u, to ce biti i poslednji korak kreiranja rezervacije!
            //sada odradim za rezervaciju, kreiram novu (tako sto uvezem sve iz local storage-a), i prosledim
            
            //imao sam entitet u bazi karta_u_rezervaciji, ali ne vidim svrhu da kad se klikne dodaj u rezervaciju da pravim dva entiteta automatski.

            let karta_iz_korpe = JSON.parse(localStorage.getItem("karta_u_korpi"));
            //console.log(rezervacija.kolicina);

            let kolicina = karta_iz_korpe["kolicina"];
            let karta_id = parseInt(karta_iz_korpe["karta_id"]);  //ili this.karta.id, ali bolje ovako jer dohvatamo sve iz local storage-a
            let ukupna_cena = (kolicina * this.karta.cena);

            let rezervacija = {"kolicina": kolicina, "ukupna_cena": ukupna_cena, "korisnik_id": this.ulogovani_korisnik.id, "karta_id": karta_id};
            
            axios.post("api/rezervacije", rezervacija).then((response) => {

            });
            this.$router.push("/filmovi");
        },


    },
    created(){
        this.refreshKarta();
        this.refreshUlogovaniKorisnik();
    }
}