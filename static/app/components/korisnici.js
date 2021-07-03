export default {     //sada ovde pisemo template
    template:   `
    <div>
        <h1>Korisnici</h1>
        <tabela-korisnika v-bind:korisnici="korisnici" v-on:uklanjanje="deleteKorisnik" v-on:izmena="setKorisnikZaIzmenu"></tabela-korisnika>       
        <korisnik-forma v-on:sacuvaj="napraviNovogKorisnika" v-bind:tekst="'Dodaj'" v-bind:tekst2="'Dodaj korisnika'"></korisnik-forma>
        <!-- <korisnik-forma v-bind:korisnik="korisnikZaIzmenu" v-bind:tekst="'Izmeni'" v-bind:tekst2="'Izmeni korisnika'" v-on:sacuvaj="izmeniKorisnika"></korisnik-forma> -->
    </div>
    `,
    data() {
        return {
            korisnici: [],
            korisnikZaIzmenu: {},
        }
    },
    methods: {                     
        refreshData(){              
            axios.get("/api/korisnici").then((response) => {  //kad smo se ulogovali, sve radi, kao sa sesijom i da otvorimo i zatvorimo browser imacemo prava pristupa, ili dok neko ne obrise local storage, ili ga ne izmeni
                this.korisnici = response.data;
            });
        },
        deleteKorisnik(id){
            axios.delete(`/api/korisnici/${id}`).then((response) => {
                this.refreshData();
            });
        },
        napraviNovogKorisnika(kor){
            axios.post("api/korisnici", kor).then((response) => {
                this.refreshData();

            });
        },
        setKorisnikZaIzmenu(kor){
            //this.kupacZaIzmenu = {...kupac};

            this.$router.push(`/korisnici/${kor.id}`);
        },
        izmeniKorisnika(kor){
            axios.put(`api/korisnici/${kor.id}`, kor).then((response) => {
                this.refreshData();
            });  
        },

    },
    created(){
        this.refreshData();
    }
}