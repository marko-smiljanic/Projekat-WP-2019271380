export default {                        
    data(){                                      
        return {
            rezervacije: [],
            korisnici: [],
            karte: [],
        }
    },
    template: `   
        <h1>Rezervacije</h1>   
        <table class="table table-striped">
        <thead>
                <tr>
                    <th>Kolicina</th>
                    <th>Ukupna cena</th>
                    <th>Korisnik</th>
                    <th>Film</th>
                    <th>Pocetak</th>
                    <th>Kraj</th>
                    <th colspan="2">Akcije</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="rr in rezervacije">
                    <td>{{rr.kolicina}}</td>
                    <td>{{rr.ukupna_cena}}</td>
                    <td>{{rr.korisnik}}</td>
                    <td>{{rr.film}}</td>
                    <td>{{rr.pocetak}}</td>
                    <td>{{rr.kraj}}</td>
                    <td><button class="btn btn-danger" v-on:click="deleteRezervacija(rr.id)">Ukloni</button></td>
                </tr>
            </tbody>
        </table>
    `,
    methods: {   //nemam ideju kako bih umesto {{rr.korisnik_id}} stavio ime tog korisnika i umesto {{rr.karta_id}} nesto
        refreshRezervacije(){              
            axios.get("/api/rezervacije").then((response) => {
                this.rezervacije = response.data;
            });
        },
        deleteRezervacija(id){
            axios.delete(`/api/rezervacije/${id}`).then((response) => {
                this.refreshRezervacije();
            });
        },
        refreshKorisnici(){              
            axios.get("/api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        refreshKarte(){
            axios.get("/api/karte").then((response) => {
                this.karte = response.data;
            });
        },

    },
    created(){
        this.refreshRezervacije();
        this.refreshKorisnici();
        this.refreshKarte();
    }
}