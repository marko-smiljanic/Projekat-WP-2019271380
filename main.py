import flask
from flask import Flask

from flaskext.mysql import MySQL                    #uplodovano u utils foldera, posle fajl db.py importovan iz utils-a tako da mi ova dva importa sada ne trebaju
from flaskext.mysql import pymysql

from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager               
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt

from utils.db import mysql                          #objekat mysql izmesten u utils da bi ga mogao koristiti u buleprint-u

from blueprints.korisnik_blueprint import korisnik_blueprint
from blueprints.film_blueprint import film_blueprint
from blueprints.karta_blueprint import karta_blueprint
from blueprints.rezervacija_blueprint import rezervacija_blueprint
####  



app = Flask(__name__, static_folder="static", static_url_path="/")

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "singidunum"
app.config["MYSQL_DATABASE_DB"] = "rezervacije_karata"
app.config["JWT_SECRET_KEY"] = "alkgjsdhh;'slkadfg"       


app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")
app.register_blueprint(film_blueprint, url_prefix="/api/filmovi")
app.register_blueprint(karta_blueprint, url_prefix="/api/karte")
app.register_blueprint(rezervacija_blueprint, url_prefix="/api/rezervacije")
####



mysql.init_app(app)
jwt = JWTManager(app)

@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/api/login", methods=["POST"])
def login():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE korisnicko_ime=%(korisnicko_ime)s AND lozinka=%(lozinka)s", flask.request.json)
    korisnik = cursor.fetchone()
    role = ""
    if korisnik["tip_korisnika_id"] == 1:
        role = "ADMIN"
    else:
        role = "USER"
    if korisnik is not None:                    
        access_token = create_access_token(identity=korisnik["korisnicko_ime"], expires_delta=False, additional_claims={"roles": role, "id": korisnik["id"]})   #pamtim id da bih mogao posle da dodam komponentu ulogovani korisnik  #ovo sluzi za proveru u backend-u, za frontend proveravam prosto sa v-if i prikazom)
        return flask.jsonify(access_token), 200
        #odradio sam da token nikada ne istice sa expires_delta=False, koliko je to bezbedno ne znam bas...
    return "Nema korisnika sa navedenim parametrima!", 403



if __name__ == "__main__":
    app.run()




#srediti komentare, sve bitno ubaciti u main.py na kraj, ostalo ili obrisati ili ostaviti na potrebnom mestu
##U BAZI:preporucuyje se hesovanje lozinke i neki dodatni string koji se nalepi na lozinku hesovanu?? KAKO OVO ODRADITI??


# #########################  KOMENTARI VEZANI ZA PROJEKAT  ##########################


#(ispraviti u ulogovani korisnik linije: 7 i 8 i prikaz u tabeli korisnika kolone tip korisnika, i dalje stoji 1 ili 2) nisam odradio nista sto je vezano za proveru tipa korisnika u smislu da sam trebao da listam i tu bazu (za to moram imati refreshData funkciju za tipove korisnika). for petljom prodjem kroz ucitani tip korisnika i gde mi se poklopi id iz tipa korisnika sa tip_korisnika_id u datom korisniku, i kada nadjem tip korisnika ucitam njegovo polje-tekst

#kako da kontrolisem kada istice validnost jwt?
#Da li mi je prazna komponenta Bioskop suvisna, na sta bih odradio create app da nje nema? Da li moze na neku drugu komponentu
#ako local storage token nije null onda znam da je prijavljen i onda mogu da pravim novu komponentu za prikaz profila, to sve radim u v-if-u u komponenti za prikaz logovanog korisnika, to sam mogao odraditi i za logout, tj. da ga skloni ako nije niko ulogovan      
#dodam u karte komponentu, kad se klikne na dodaj u korpu dugme, dohvatim korpu iz local storage appendujem i vratim nazad, kad klikne rezervisi onda se kreira rezervacija sa podacima iz korpe
#ideja je da nemam izmenu i brisanje u tabeli tipa korisnika jer zelim da postoje samo dva, i da se ne komplikuje dodatno oko toga
#treba obraditi zasto se komponenta korisnici ne prikazuje ako npr. neko nije logovan? KAKO???
#karte_blueprint.py  f-ja:izmena: necu da menjam film_id                film_id=%(film_id)s, ovo sam mogao izostaviti i u insert-u, manje bih koda imao u dodavanju i ne bih morao da ucitavam dati film!!!!!!!!!!!! glup sam.
#kada uradim refresh stranice nece da izvrsi redirekciju na drugu stranicu, zasto?

