export default {             
    data(){                                               
        return {                                              
            karta: {},
            film: {},
            id_filma: 0,

        }                                                      
    },                                                                                                                 
    template: `
        <form v-on:submit.prevent="izmeniKartu(karta)" class="mt-3">
            <fieldset>
                <legend>Izmena karte za film: {{film.naziv}}</legend>
                <div class="mb-3">
                    <label for="vreme_pocetka">Vreme pocetka projekcije: </label>
                    <input type="datetime-local" name="vreme_pocetka" v-model="karta.vreme_pocetka_projekcije" class="form-control" placeholder="Vreme pocetka projekcije" required>
                </div>
                <div class="mb-3">
                    <label for="vreme_kraja">Vreme kraja projekcije: </label>
                    <input type="datetime-local" name="vreme_kraja" v-model="karta.vreme_zavrsetka_projekcije" class="form-control" placeholder="Vreme kraja projekcije">
                </div>
                <div class="mb-3">
                    <label for="cena">Cena: </label>
                    <input type="number" name="cena" v-model="karta.cena" class="form-control" placeholder="Cena" required>
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-primary" value="Izmeni">
                </div>
            </fieldset>
        </form>
    `,
    methods: {
        refreshKarta(){
            axios.get(`/api/karte/${this.$route.params["id"]}`).then((response) => {   //mozda je malo cudno sto ovako prikazujem komponentu karte, tj. sa id-jem filma, ali poenta mi je da ne prikazujem sve postojece karte nego kada se u filmu klikne na dodaj kartu u korpu
                this.karta = response.data;

                //ovde mi se prvi put javlja problem sa datumom zato samo kastujem u javascript objekat Date
                this.karta["vreme_pocetka_projekcije"] = new Date(this.karta["vreme_pocetka_projekcije"]).toISOString().split("Z")[0];
                this.karta["vreme_zavrsetka_projekcije"] = new Date(this.karta["vreme_zavrsetka_projekcije"]).toISOString().split("Z")[0];
                //mogao sam i ovde dodeliti film id this karta
                axios.get(`/api/filmovi/${this.karta.film_id}`).then((response) => {
                    this.film = response.data;
                });
            });

        },
        izmeniKartu(karta){
            axios.put(`/api/karte/${karta.id}`, karta).then((response) => {
                this.refreshKarta();                                 
                this.$router.push(`/karte/${this.karta.film_id}`);
            });  
        },
        // refreshFilm(){      //iz backend-a sam sklonio iz funkcije izmeni da se radi update film_id, ali mi ucitani filmovi svakako trebaju zbog prikaza        
        // axios.get(`/api/filmovi/${this.karta.film_id}`).then((response) => {  
        //     this.film = response.data;
        // });

        //nije mi jasno zasto moram zahtev za citanje filmova da pozovem u zahtevu za citanje karata, kada ga stavim na drugo mesto uopste ne vidi parametar koji prosledjujem u rutu, da nije do toka zahteva? jer mi za izvrsavanje tog zahteva treba komplet izvrsen zahtev za citanje karte????

    },
    created(){
        this.refreshKarta();
        //this.refreshFilm();
    }

}