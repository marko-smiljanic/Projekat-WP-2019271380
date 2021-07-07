export default {     //sada ovde pisemo template
    template:   `
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container-fluid">
          <!-- <a class="navbar-brand" href="">Bioskop</a>  ovde staviti pocetnu, tj. prikaz filmova na rutu "/" -->
          <router-link to="/filmovi" class="navbar-brand">Bioskop</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/profil" class="nav-link" v-if="ulogovan == true">Informacije o profilu</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/filmovi" class="nav-link">Filmovi</router-link>
              </li> 
              <li class="nav-item">
                <router-link to="/korisnici" class="nav-link" v-if="ulogovani_korisnik['tip_korisnika_id'] == 1">Korisnici</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/rezervacije" class="nav-link" v-if="ulogovani_korisnik['tip_korisnika_id'] == 1">Rezervacije</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link" v-if="ulogovan == false">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/logout" class="nav-link" v-if="ulogovan == true">Logout</router-link>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li> -->
            </ul>
          </div>
        </div>
      </nav>

    </div>
    `,
    data() {
        return {
            ulogovani_korisnik: [],
            ulogovan: false,
        }
    },
    methods: {                      //ovo bi bilo bolje da odradim sve u undex html tj. da mu se uopste ne prikazuje opciju da klikne na profil u nav-baru ako nije ulogovan
        refreshUlogovaniKorisnik(){              
            axios.get("/api/korisnici/ulogovani").then((response) => {
                if (localStorage.getItem("token") != null) {
                    this.ulogovani_korisnik = response.data;
                    this.ulogovan = true;
                }else{
                    ulogovan = false;
                }
            });
        },
    },
    created(){
        this.refreshUlogovaniKorisnik();
    }
}