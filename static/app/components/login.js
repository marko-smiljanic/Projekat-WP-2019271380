export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="neuspesanLogin == true">
        Neuspesna prijava na sistem
    </div> 

    <form v-on:submit.prevent="prijava" v-if="ulogovan == false">
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

    <div v-if="ulogovan == true">
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
            Vec ste ulogovani!
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
            }, _ => {
                this.neuspesanLogin = true;
            });
        },
        proveraUlogovanosti(){
            if (localStorage.getItem("token") == null) {
                this.ulogovan = false;
            }
        },

    
    },
    created() {
        this.proveraUlogovanosti();
    }
}

// #########################  KOMENTARI VEZANI ZA PROJEKAT  ##########################


//TODO:  (ispraviti u ulogovani korisnik linije: 7 i 8 i prikaz u tabeli korisnika kolone tip korisnika, i dalje stoji 1 ili 2) nisam odradio nista sto je vezano za proveru tipa korisnika u smislu da sam trebao da listam i tu bazu (za to moram imati refreshData funkciju za tipove korisnika). for petljom prodjem kroz ucitani tip korisnika i gde mi se poklopi id iz tipa korisnika sa tip_korisnika_id u datom korisniku, i kada nadjem tip korisnika ucitam njegovo polje-tekst

//TODO: KAKOO? resiti da nema prikaza cele komponente korisnika kada nije niko prijavljen i kada korisnik nije administrator?

//kako da kontrolisem kada istice validnost jwt?
//Da li mi je prazna komponenta Bioskop suvisna, na sta bih odradio create app da nje nema? Da li moze na neku drugu komponentu
//ako local storage token nije null onda znam da je prijavljen i onda mogu da pravim novu komponentu za prikaz profila, to sve radim u v-if-u u komponenti za prikaz logovanog korisnika, to sam mogao odraditi i za logout, tj. da ga skloni ako nije niko ulogovan      
//dodam u karte komponentu, kad se klikne na dodaj u korpu dugme, dohvatim korpu iz local storage appendujem i vratim nazad, kad klikne rezervisi onda se kreira rezervacija sa podacima iz korpe
//ideja je da nemam izmenu i brisanje u tabeli tipa korisnika jer zelim da postoje samo dva, i da se ne komplikuje dodatno oko toga
//treba obraditi zasto se komponenta korisnici ne prikazuje ako npr. neko nije logovan? KAKO???
//karte_blueprint.py  f-ja:izmena: necu da menjam film_id                film_id=%(film_id)s, ovo sam mogao izostaviti i u insert-u, manje bih koda imao u dodavanju i ne bih morao da ucitavam dati film!!!!!!!!!!!! glup sam.





