export default {          //umesto const Prodavnica = napisemo export default
    data() {
        return {
            // kupci: [],
            // //noviKupac: {},    //novi i za izmenu ce nam biti isto u komponenti forme
            // kupacZaIzmenu: {},
            // proizvodi: [],
            // proizvodZaIzmenu: {},
            // stranicaZaPrikaz: "kupci"
        }
    },
    methods: {
        // refreshData(){              //za kupce
        //     axios.get("/api/kupci").then((response) => {
        //         this.kupci = response.data;
        //     });
        // },
        // deleteKupac(id){
        //     axios.delete(`/api/kupci/${id}`).then((response) => {
        //         this.refreshData();
        //     });
        // },
        // napraviNovogKupca(kupac){
        //     axios.post("api/kupci", kupac).then((response) => {
        //         this.refreshData();

        //     });
        // },
        // setKupacZaIzmenu(kupac){
        //     this.kupacZaIzmenu = {...kupac};
        // },
        // izmeniKupca(kupac){
        //     axios.put(`api/kupci/${kupac.id}`, kupac).then((response) => {
        //         this.refreshData();
        //     });  
        // },
        // refreshData2(){       //##### za proizvode ######
        //     axios.get("/api/proizvodi").then((response) => {
        //         this.proizvodi = response.data;
        //     });
        // },
        // deleteProizvod(id){
        //     axios.delete(`api/proizvodi/${id}`).then((response) => {
        //         this.refreshData2();
        //     });
        // },
        // napraviNoviProizvod(proizvod){
        //     axios.post("/api/proizvodi", proizvod).then((response) => {
        //         this.refreshData2();
        //     });
        // },
        // setProizvodZaIzmenu(proizvod){
        //     this.proizvodZaIzmenu = {...proizvod};
        //     var dropLista = document.getElementById("opcije")
        //     if(this.proizvodZaIzmenu["dostupno"] == 1){
        //         dropLista.options[0].setAttribute("selected", "selected");
        //     }else{
        //         dropLista.options[1].setAttribute("selected", "selected");
        //     }
        // },
        // izmeniProizvod(proizvod){
        //     axios.put(`/api/proizvodi/${proizvod.id}`, proizvod).then((response) => {
        //         this.refreshData2();
        //     });
        // },
        // navigate(tekst){
        //     this.stranicaZaPrikaz = tekst;
        // }
    },
    created(){
        //     this.refreshData();    //kupci
        //     this.refreshData2();   //proizvodi
    }
}