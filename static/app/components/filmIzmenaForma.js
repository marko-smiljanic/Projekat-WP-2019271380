export default {             
    data(){                                               
        return {                                              
            film: {}         
        }                                                      
    },                                                                                                                 
    template: `
        <form v-on:submit.prevent="izmeniFilm(film)" class="mt-3">
            <fieldset>
                <legend>Izmena postojeceg filma</legend>
                <div class="mb-3">
                    <label for="naziv">Naziv: </label>
                    <input type="text" name="naziv" v-model="film.naziv" class="form-control" placeholder="Naziv" required>
                </div>
                <div class="mb-3">
                    <label for="godina_izlaska">Godina izlaska: </label>
                    <input type="number" name="godina_izlaska" v-model="film.godina_izlaska" class="form-control" placeholder="Godina izlaska" required>
                </div>
                <div class="mb-3">
                    <label for="reziser">Reziser: </label>
                    <input type="text" name="reziser" v-model="film.reziser" class="form-control" placeholder="Reziser">
                </div>
                <div class="mb-3">
                    <label for="opis">Opis: </label>
                    <textarea name="opis" v-model="film.kratak_opis" class="form-control" placeholder="Opis"></textarea>
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-primary" value="Izmeni">
                </div>
            </fieldset>
        </form>
    `,
    methods: {
        refreshData(){              
            axios.get(`/api/filmovi/${this.$route.params["id"]}`).then((response) => {
                this.film = response.data;
            });
        },
        izmeniFilm(film){
            axios.put(`/api/filmovi/${film.id}`, film).then((response) => {
                this.refreshData();                                 
                this.$router.push("/filmovi");
            });  
        },
    },
    created(){
        this.refreshData();
    }

}