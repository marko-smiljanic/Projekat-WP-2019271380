#rezervacije karata
#film: id, naziv, godina izlaska, reziser, datum (tacno vreme) pocetka projekcije, datum (tacno vreme) kraja projekcije
#karta: id, naziv filma, cena, vreme trajanja rezervacije tj. vreme pocetka projekcije, broj karata
#korisnik(kupac karte, administrator): id, korisnicko ime, lozinka, email. Administrator: dodavanje, izmena, brisanje. Korisnik: funkcije: pregled, rezervacija, potvrda rezervacije
#korpa:prikaz karata i potvrda za rezervaciju
#rezervacija: prikaz karte i korisnika koji je rezervisao i vremena kad je rezervisao, za admina
#pocetna, log in stranica nudi opciju prijave ili kreiranja novog naloga (zabraniti kreiranje naloga sa istim korisnickim imenom i mejlom), administrator ima uvid u zahteve koji se naprave za kreiranje naloga i ima pravo da ih prihvati ili odbije
##U BAZI:preporucuyje se hesovanje lozinke i neki dodatni string koji se nalepi na lozinku hesovanu

import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

from flask_jwt_extended import create_access_token      #ovo je za drugi nacin da se odradi login, biblioteka koja generise token, mora se naknadno instalirati
from flask_jwt_extended import JWTManager               #da bi radilo mora ovo
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt

from blueprints.korisnik_blueprint import korisnik_blueprint
  
from utils.db import mysql                              #izmestili smo pravljenje objekta mysql u fajl db py u utils folderu, da bi mogli da koristimo u kupci blueprint py

app = Flask(__name__, static_folder="static", static_url_path="/")

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "singidunum"
app.config["MYSQL_DATABASE_DB"] = ""
app.config["JWT_SECRET_KEY"] = "alkgjsdhh;'slkadfg"       #secret key za drugi nacin logovanja

app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")

mysql.init_app(app)
jwt = JWTManager(app)

@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/api/login", methods=["POST"])
def login():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE korisnickoIme=%(korisnickoIme)s AND lozinka=%(lozinka)s", flask.request.json)
    korisnik = cursor.fetchone()
    if korisnik is not None:                    
        access_token = create_access_token(identity=korisnik["korisnickoIme"], additional_claims={"roles": ["USER"]})
        return flask.jsonify(access_token), 200
    
    return "", 403


#nesto






if __name__ == "__main__":
    app.run()