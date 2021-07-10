export default {                        
    props: ["korisnici"],                            
    emits: ["izmena", "uklanjanje"],
    data(){                                      
        return {}
    },
    template: `      
        <table class="table table-striped shadow">
        <thead>
                <tr>
                    <th>ID</th>
                    <th>Korisnicko ime</th>
                    <th>lozinka</th>
                    <th>Kontakt mail</th>
                    <th>Tip korisnika</th>
                    <th colspan="2">Akcije</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="kor in korisnici">
                    <td>{{kor.id}}</td>
                    <td>{{kor.korisnicko_ime}}</td>
                    <td>{{kor.lozinka}}</td>
                    <td>{{kor.kontakt_email}}</td>
                    <td v-if="kor.tip_korisnika_id == 1">Administrator</td>
                    <td v-if="kor.tip_korisnika_id == 2">Korisnik</td>
                    <td><button class="btn btn-danger" v-on:click="$emit('uklanjanje', kor.id)">Ukloni</button></td>
                    <td><button class="btn btn-primary" v-on:click="$emit('izmena', kor)">Izmeni</button></td>
                </tr>
            </tbody>
        </table>
    `
}

