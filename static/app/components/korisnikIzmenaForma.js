export default {             
    data(){                                               
        return {                                              
            korisnik: {}         
        }                                                      
    },                                                                                                                 
    template: `
        <form v-on:submit.prevent="izmeniKorisnika(korisnik)" class="mt-3">
            <fieldset>
                <legend>Izmena postojeceg korisnika</legend>
                <div class="mb-3">
                    <label for="korisnicko_ime">Korisnicko ime: </label>
                    <input type="text" name="korisnicko_ime" v-model="korisnik.korisnicko_ime" class="form-control" placeholder="Korisnicko ime" required>
                </div>
                <div class="mb-3">
                    <label for="lozinka">Lozinka: </label>
                    <input type="password" name="lozinka" v-model="korisnik.lozinka" class="form-control" placeholder="Lozinka" required>
                </div>
                <div class="mb-3">
                    <label for="email">Kontakt email: </label>
                    <input type="text" name="email" v-model="korisnik.kontakt_email" class="form-control" placeholder="Kontakt email" required>
                </div>
                <div class="mb-3">
                    <label for="tip_korisnika">Tip korisnika: </label>
                    <select v-model="korisnik.tip_korisnika_id" name="tip_korisnika" class="form-select">
                        <option value="1">Administrator</option>
                        <option value="2">Korisnik</option>
                    </select>
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-primary" value="Izmeni">
                </div>
            </fieldset>
        </form>
    `,
    methods: {
        refreshData(){              
            axios.get(`/api/korisnici/${this.$route.params["id"]}`).then((response) => {  //kad smo se ulogovali, sve radi, kao sa sesijom i da otvorimo i zatvorimo browser imacemo prava pristupa, ili dok neko ne obrise local storage, ili ga ne izmeni
                this.korisnik = response.data;
            });
        },
        izmeniKorisnika(kor){
            axios.put(`/api/korisnici/${kor.id}`, kor).then((response) => {
                this.refreshData();                                     //ovo mozda i ne treba ovde jer imam refresh svih kada posle push-a ode na korisnici.js
                this.$router.push("/korisnici");
            });  
        },
    },
    created(){
        this.refreshData();
    }

}