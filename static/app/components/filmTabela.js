export default {                        
    props: ["filmovi"],                            
    emits: ["izmena", "uklanjanje"],
    data(){                                      
        return {}
    },
    template: `      
        <div class="card mb-4" style="max-width: 930px;" v-for="f in filmovi">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{f.naziv}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{f.godina_izlaska}}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">{{f.reziser}}</h6> 
                        <p class="card-text">{{f.kratak_opis}}</p>
                        <button class="btn btn-primary mx-1 mb-3" v-on:click="$emit('izmena', f)">Izmeni</button>
                        <button class="btn btn-danger mx-1 mb-3" v-on:click="$emit('uklanjanje', f.id)">Ukloni</button>
                        <button class="btn btn-success mx-1 mb-3" v-on:click="predjiNaPrikazNjegovihKarti(f)">Prikazi karte</button>
                    </div>
                </div>
            </div>
        </div>

    `,
    methods: {
        predjiNaPrikazNjegovihKarti(film){    
            this.$router.push(`/karte/${film.id}`);
        },
    }
}