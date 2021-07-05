export default {     //sada ovde pisemo template
    template:   `
        <div class="card text-dark bg-light mb-3" style="max-width: 20rem;">
            <div class="card-header">{{film.naziv}}</div>
            <div class="card-body">
                <h5 class="card-title">Vreme pocetka: {{karta.vreme_pocetka_projekcije}}</h5>
                <h5 class="card-title">Vreme zavrsetka: {{karta.vreme_zavrsetka_projekcije}}</h5>
                <h5 class="card-title">Cena: {{karta.cena}}</h5>
                
                <form v-on:submit.prevent="dodajUKorpu()"> 
                <div class="card-tittle">
                    <label for="kolicina">Kolicina: </label>
                    <input type="number" name="kolicina" class="form-control" placeholder="kolicina" v-model="kolicina" required>
                </div>
                
                <h5 class="card-title mt-3">Ukupna cena: {{kolicina * karta.cena}}</h5>

                <div class="mb-3">
                    <input type="submit" class="btn btn-success" value="Dodaj">
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
            noviNiz: [],
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
        dodajUKorpu(){
            this.kolicina = parseInt(this.kolicina);
            let kartaUKorpi = {"kolicina": this.kolicina, "karta_id": this.karta.id};

            
            this.noviNiz.push(kartaUKorpi);
            localStorage.setItem("karta_u_korpi", JSON.stringify(this.noviNiz));

            //this.noviNiz = JSON.parse(localStorage.getItem("karta_u_korpi"));
            //namestio sam da radi, ali ako se refresuje i ponovo se klikne na dodaj sve se gubi sto je bilo

            
        }
        // napraviNovuKartuUrezervaciji(){  //ovde moram imati i rezervaciju u json-u, to ce biti i poslednji korak kreiranja rezervacije!
            //sada odradim za rezervaciju, kreiram novu (tako sto uvezem sve iz local storage-a), i prosledim
        // },


    },



    created(){
        this.refreshKarta();
    }
}