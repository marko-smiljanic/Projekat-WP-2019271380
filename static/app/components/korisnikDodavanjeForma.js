export default {             
    data(){                                               
        return {                                              
            noviKorisnik: {}         
        }                                                      
    },                                                                                                                 
    template: `
        <form v-on:submit.prevent="napraviNovogKorisnika(noviKorisnik)" class="mt-3">
            <fieldset>
                <legend>Dodavanje novog korisnika</legend>
                <div class="mb-3">
                    <label for="korisnicko_ime">Korisnicko ime: </label>
                    <input type="text" name="korisnicko_ime" v-model="noviKorisnik.korisnicko_ime" class="form-control" placeholder="Korisnicko ime" required>
                </div>
                <div class="mb-3">
                    <label for="lozinka">Lozinka: </label>
                    <input type="password" name="lozinka" v-model="noviKorisnik.lozinka" class="form-control" placeholder="Lozinka" required>
                </div>
                <div class="mb-3">
                    <label for="email">Kontakt email: </label>
                    <input type="text" name="email" v-model="noviKorisnik.kontakt_email" class="form-control" placeholder="Kontakt email" required>
                </div>
                <div class="mb-3">
                    <label for="tip_korisnika">Tip korisnika: </label>
                    <select v-model="noviKorisnik.tip_korisnika_id" name="tip_korisnika" class="form-select">
                        <option value="1">Administrator</option>
                        <option value="2">Korisnik</option>
                    </select>
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-warning" value="Dodaj">
                </div>
            </fieldset>
        </form>
    `,
    methods: {
        napraviNovogKorisnika(kor){
            axios.post("api/korisnici", kor).then((response) => {
                this.$router.push("/korisnici");               //ovde imamo ponovno osvezenje koje se poziva odma pri prelasku (created), odnosno ucitavanje i prikaz svih korisnika
            });
        }
    }

}