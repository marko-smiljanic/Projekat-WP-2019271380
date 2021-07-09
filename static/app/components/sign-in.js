export default {             
    data(){                                               
        return {                                              
            noviKorisnik: {},
            korisnici: [],
            postojiTakvoKorisnickoIme: false,
            postojiTakvaEmailAdresa: false,
            uspesnoPoslat: false,

        }                                                      
    },                                                                                                                 
    template: `
        <div class="mt-3" v-if="postojiTakvoKorisnickoIme == true">
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

            <div class="alert alert-warning d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                    Takvo korisnicko ime vec postoji. Pokusajte ponovo!
                </div>
            </div>
        </div>

        <div class="mt-3" v-if="postojiTakvaEmailAdresa == true">
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

            <div class="alert alert-warning d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                    Nalog sa tom email adresom vec postoji. Pokusajte ponovo!
                </div>
            </div>
        </div>

        <form v-on:submit.prevent="napraviNoviZahtevZaNalog()" class="mt-3">
            <fieldset>
                <legend>Unesite podatke za vas nalog</legend>
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
                    <input type="submit" class="btn btn-warning" value="Dodaj">
                </div>
            </fieldset>
        </form>

        <div class="mt-3" v-if="uspesnoPoslat == true">
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
                    Vas zahtev za kreiranje korisnickog naloga je uspesno poslat. Sacekajte na odobrenje administratora!
                </div>
            </div>
        </div>
    `,
    methods: {
        // napraviNovogKorisnika(kor){
        //     axios.post("api/korisnici", kor).then((response) => {
        //         this.$router.push("/korisnici");               //ovde imamo ponovno osvezenje koje se poziva odma pri prelasku (created), odnosno ucitavanje i prikaz svih korisnika
        //     });
        // },
        refreshKorisnici(){
            axios.get("/api/korisnici/dohvatiKorisnike").then((response) => {
                this.korisnici = response.data;
            });
        },
        napraviNoviZahtevZaNalog(){    //mogu samo da se prave korisnici, nikako administratori, jedino administrator moze da dodaje aministratora
            if(this.noviKorisnik != null || this.korisnici != null){
                for(let i = 0; i < this.korisnici.length; i++){
                    if(this.korisnici[i]["korisnicko_ime"] == this.noviKorisnik["korisnicko_ime"]){
                        this.postojiTakvoKorisnickoIme = true;
                        return;
                    }else if(this.korisnici[i]["kontakt_email"] == this.noviKorisnik["kontakt_email"]){
                        this.postojiTakvaEmailAdresa = true;
                        return;
                    }
                }
                let zahtev = {"korisnicko_ime": this.noviKorisnik["korisnicko_ime"], "lozinka": this.noviKorisnik["lozinka"], kontakt_email: this.noviKorisnik["kontakt_email"]};
                if(this.postojiTakvoKorisnickoIme != true && this.postojiTakvaEmailAdresa != true){
                    axios.post("api/korisnici/dodajZahtev", zahtev).then((response) => {
                        this.uspesnoPoslat = true;
                    });
                }
            }
        },




    },
    created(){
        this.refreshKorisnici();
    }

}