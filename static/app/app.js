import TabelaKorisnika from "./components/tabelaKorisnika.js"
import Prodavnica from "./components/prodavnica.js"






import Korisnici from "./components/korisnici.js"
import Login from "./components/login.js"
import Logout from "./components/logout.js"
import UlogovaniKorisnik from "./components/ulogovaniKorisnik.js"


axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    Object.assign(config.headers, {"Authorization": `Bearer ${token}`});
  
    return config;
});


const router = VueRouter.createRouter({  
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/login", component: Login},
        {path: "/logout", component: Logout},
        {path: "/korisnici", component: Korisnici}, 
        {path: "/profil", component: UlogovaniKorisnik},            
    ],
  })





const app = Vue.createApp(Prodavnica);
app.component("tabela-korisnika", TabelaKorisnika);




app.use(router)
app.mount("#app");