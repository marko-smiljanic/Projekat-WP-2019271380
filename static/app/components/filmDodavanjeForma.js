export default {             
    data(){                                               
        return {                                              
            noviFilm: {}         
        }                                                      
    },                                                                                                                 
    template: `
        <form v-on:submit.prevent="napraviNoviFilm(noviFilm)" class="mt-3">
            <fieldset>
                <legend>Dodavanje novog filma</legend>
                <div class="mb-3">
                    <label for="naziv">Naziv: </label>
                    <input type="text" name="naziv" v-model="noviFilm.naziv" class="form-control" placeholder="Naziv" required>
                </div>
                <div class="mb-3">
                    <label for="godina_izlaska">Godina izlaska: </label>
                    <input type="number" name="godina_izlaska" v-model="noviFilm.godina_izlaska" class="form-control" placeholder="Godina izlaska" required>
                </div>
                <div class="mb-3">
                    <label for="reziser">Reziser: </label>
                    <input type="text" name="reziser" v-model="noviFilm.reziser" class="form-control" placeholder="Reziser">
                </div>
                <div class="mb-3">
                    <label for="opis">Opis: </label>
                    <textarea name="opis" v-model="noviFilm.kratak_opis" class="form-control" placeholder="Opis"></textarea>
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-warning" value="Dodaj">
                </div>
            </fieldset>
        </form>
    `,
    methods: {
        napraviNoviFilm(film){
            axios.post("api/filmovi", film).then((response) => {
                this.$router.push("/filmovi");
            });
        }
    }

}