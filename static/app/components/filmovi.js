export default {     //sada ovde pisemo template
    template:   `
    <div>
        <div class="d-inline-flex me-3 mt-2 mb-3"><h1>Filmovi</h1></div>
        <div class="d-inline-flex mb-3 mt-2" v-if="ulogovani_korisnik['tip_korisnika_id'] == 1"><button class="btn btn-warning mx-3" v-on:click="predjiNaDodavanje">Dodaj novi film</button></div>

        <tabela-filmova v-bind:filmovi="filmovi" v-on:uklanjanje="deleteFilm" v-on:izmena="setFilmZaIzmenu"></tabela-filmova> 
        <!-- <button class="btn btn-warning" v-on:click="predjiNaDodavanje()">Dodaj novog korisnika</button> -->     
    </div>
    `,
    data() {
        return {
            filmovi: [],
            filmZaIzmenu: {},
            ulogovani_korisnik: {},
            ulogovan: false,
        }
    },
    methods: {                     
        refreshData(){              
            axios.get("/api/filmovi").then((response) => {
                this.filmovi = response.data;
            });
        },
        deleteFilm(id){
            axios.delete(`/api/filmovi/${id}`).then((response) => {
                this.refreshData();
            });
        },
        setFilmZaIzmenu(film){    
            this.$router.push(`/filmovi/${film.id}`);
        },
        predjiNaDodavanje(){
            this.$router.push("/dodajFilm");
        },
        //napraviti komponente za prikaz karata izmenu i brisanje i onda obezbediti ovde funkcionalnost da se karte dodaju u korpu, tj. prvo prikaz jedne karte, onda upit, pravljenje karte u korpi i dodavanje u korpu, potrvrda za rezervaciju ?????
        refreshUlogovaniKorisnik(){              
            axios.get("/api/korisnici/ulogovani").then((response) => {
                if (localStorage.getItem("token") != null) {
                    this.ulogovani_korisnik = response.data;
                    this.ulogovan = true;
                }else{
                    this.ulogovan = false;
                }
            });
        },

    },
    created(){
        this.refreshData();
        this.refreshUlogovaniKorisnik();
    }
}