export default {     //sada ovde pisemo template
    template:   `
    <div>
        <h1>Korisnici</h1>
        <tabela-korisnika v-bind:korisnici="korisnici" v-on:uklanjanje="deleteKorisnik" v-on:izmena="setKorisnikZaIzmenu"></tabela-korisnika> 
        
        <div class="text-center">
            <button class="btn btn-warning" v-on:click="predjiNaDodavanje()">Dodaj novog korisnika</button> 
        </div>
    
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
        // napraviNovogKorisnika(kor){
        //     axios.post("api/korisnici", kor).then((response) => {
        //         this.refreshData();

        //     });
        // },
        setKorisnikZaIzmenu(kor){    //trenutno radi samo prelazak na drugu komponentu, ovo moram odraditi preko podataka iz komponente tabele da bi znao koji je korisnik odabran za izmenu!!!
            //this.kupacZaIzmenu = {...kupac};

            this.$router.push(`/korisnici/${kor.id}`);
        },
        // izmeniKorisnika(kor){
        //     axios.put(`/api/korisnici/${kor.id}`, kor).then((response) => {
        //         this.refreshData();
        //     });  
        // },


        predjiNaDodavanje(){
            this.$router.push("/dodajKorisnika");
        },
        // predjiNaIzmenu(){
        //     this.$router.push(`/korisnici/${kor.id}`);
        // }

    },
    created(){
        this.refreshData();
    }
}