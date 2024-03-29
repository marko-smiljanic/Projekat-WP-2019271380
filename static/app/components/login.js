export default {
    template: `
    <div class="alert alert-danger mt-3" role="alert" v-if="neuspesanLogin == true">
        Neuspesna prijava, pokusajte ponovo!
    </div> 

    <form v-on:submit.prevent="prijava" v-if="ulogovan == false" class="mt-3">
        <fieldset>
            <legend>Prijava</legend>

            <div class="mb-3">
            <label for="korisnickoIme">Unesite korisnicko ime: </label>
            <input type="text" name="korisnickoIme" class="form-control" placeholder="Korisnicko ime" v-model="korisnik.korisnicko_ime" required>
            </div>

            <div class="mb-3">
            <label name="lozinka">Unesite lozinku: </label>
            <input type="password" name="lozinka" class="form-control" placeholder="lozinka" v-model="korisnik.lozinka" required>
            </div>

            <div class="mb-3">
            <input type="submit" class="btn btn-info" value="Prijavi se">
            </div>
        </fieldset>
    </form>

    <div class="text-center mt-3" v-if="ulogovan == false">
        <h5>Nemate nalog?</h5>
        <button class="btn btn-warning" v-on:click="napraviNalog()">Napravi nalog</button>
    </div>

    <div class="mt-3" v-if="ulogovan == true">
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

        <div class="alert alert-success d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
            Ulogovani ste!
        </div>
        </div>
    </div>

    `,
    data(){
        return {
            korisnik: {"korisnicko_ime": "", "lozinka": ""},
            neuspesanLogin: false,
            ulogovan: true,
        };
    },
    methods: {
        prijava(){
            axios.post("/api/login", this.korisnik).then((response) => {
                localStorage.setItem("token", response.data);
                this.ulogovan = true;
                this.$router.push("/profil");
                window.location.reload();  //odradim refresh da bi se odradio refresh prikaza komponenti koje npr. vidi samo administrator
            }, _ => {
                this.neuspesanLogin = true;
            });
        },
        proveraUlogovanosti(){
            if (localStorage.getItem("token") == null) {
                this.ulogovan = false;
            }
        },
        napraviNalog(){
            this.$router.push("/sign-in")
        },

    
    },
    created() {
        this.proveraUlogovanosti();
    }
}


