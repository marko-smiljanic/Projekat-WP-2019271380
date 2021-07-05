export default {     //sada ovde pisemo template
    template:   `
    <div>
        <div class="d-inline-flex me-3 mt-2" ><h1>Filmovi</h1></div>
        <div class="d-inline-flex mb-3 mt-2"><button class="btn btn-warning mx-3" v-on:click="predjiNaDodavanje">Dodaj novi film</button></div>

        <tabela-filmova v-bind:filmovi="filmovi" v-on:uklanjanje="deleteFilm" v-on:izmena="setFilmZaIzmenu"></tabela-filmova> 
        <!-- <button class="btn btn-warning" v-on:click="predjiNaDodavanje()">Dodaj novog korisnika</button> -->     
    </div>
    `,
    data() {
        return {
            filmovi: [],
            filmZaIzmenu: {},
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
        //napraviti komponente za prikaz karata izmenu i brisanje i onda obezbediti ovde funkcionalnost da se karte dodaju u korpu, tj. prvo prikaz jedne karte, onda upit, pravljenje karte u korpi i dodavanje u korpu, potrvrda zarezervaciju ?????

    },
    created(){
        this.refreshData();
    }
}