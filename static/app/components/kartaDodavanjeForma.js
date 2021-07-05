export default {             
    data(){                                               
        return {                                              
            novaKarta: {},
            film: {},

        }                                                      
    },                                                                                                                 
    template: `
        <form v-on:submit.prevent="napraviNovuKartu(novaKarta)">
            <fieldset>
                <legend>Dodavanje nove karte za film {{film.naziv}}</legend>
                <div class="mb-3">
                    <label for="vreme_pocetka">Vreme pocetka projekcije: </label>
                    <input type="datetime-local" name="vreme_pocetka" v-model="novaKarta.vreme_pocetka_projekcije" class="form-control" placeholder="Vreme pocetka projekcije" required>
                </div>
                <div class="mb-3">
                    <label for="vreme_kraja">Vreme kraja projekcije: </label>
                    <input type="datetime-local" name="vreme_kraja" v-model="novaKarta.vreme_zavrsetka_projekcije" class="form-control" placeholder="Vreme kraja projekcije">
                </div>
                <div class="mb-3">
                    <label for="cena">Cena: </label>
                    <input type="number" name="cena" v-model="novaKarta.cena" class="form-control" placeholder="Cena" required>
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-warning" value="Dodaj">
                </div>
            </fieldset>
        </form>
    `,
    methods: {
        napraviNovuKartu(karta){
            karta["film_id"] = this.film.id;
            axios.post("api/karte", karta).then((response) => {
                this.$router.push(`/karte/${this.film.id}`);
            });
        },
        refreshFilm(){              
            axios.get(`/api/filmovi/${this.$route.params["id"]}`).then((response) => {   //mozda je malo cudno sto ovako prikazujem komponentu karte, tj. sa id-jem filma, ali poenta mi je da ne prikazujem sve postojece karte nego kada se u filmu klikne na dodaj kartu u korpu
                this.film = response.data;
                //mogao sam i ovde dodeliti film id this karti
            });
        }

    },
    created(){
        this.refreshFilm();
    }

}