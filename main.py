#rezervacije karata
#film: id, naziv, godina izlaska, reziser
#karta: id, naziv filma, cena, vreme pocetka projekcije, vreme kraja projekcije
#korisnik(kupac karte, administrator): id, korisnicko ime, lozinka, email. Administrator: dodavanje, izmena, brisanje. Korisnik: funkcije: pregled, rezervacija, potvrda rezervacije
#korpa:naziv filma, pocetak projekcije, broj karata, ukupna cena, korisnicko ime ko je rezervisao, karta id?, f-ja: i potvrda za rezervaciju
#pocetna, log in stranica nudi opciju prijave ili kreiranja novog naloga (zabraniti kreiranje naloga sa istim korisnickim imenom i mejlom), moze da se pregleda stranica i bez naloga, administrator ima uvid u zahteve koji se naprave za kreiranje naloga i ima pravo da ih prihvati ili odbije
##U BAZI:preporucuyje se hesovanje lozinke i neki dodatni string koji se nalepi na lozinku hesovanu

import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager               
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt

from blueprints.korisnik_blueprint import korisnik_blueprint
  
from utils.db import mysql 



app = Flask(__name__, static_folder="static", static_url_path="/")

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "singidunum"
app.config["MYSQL_DATABASE_DB"] = "rezervacije_karata"
app.config["JWT_SECRET_KEY"] = "alkgjsdhh;'slkadfg"       

app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")

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
        access_token = create_access_token(identity=korisnik["korisnicko_ime"], additional_claims={"roles": [role], "id": korisnik["id"]})   #pamtim id da bih mogao posle da dodam komponentu ulogovani korisnik  #ovo sluzi za proveru u backend-u, za frontend proveravam prosto kao sto sam ovde sa promenljivom roles (manipulacija sa v-if i prikazom)
        return flask.jsonify(access_token), 200
    
    return "Nema korisnika sa navedenim parametrima!", 403





if __name__ == "__main__":
    app.run()