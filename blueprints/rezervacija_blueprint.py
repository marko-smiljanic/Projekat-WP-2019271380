import flask
from flask import Blueprint

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt              

from utils.db import mysql

rezervacija_blueprint = Blueprint("rezervacija_blueprint", __name__)



@rezervacija_blueprint.route("/", methods=["GET"])
@jwt_required()  
def getAllRezervacije():
    #print(get_jwt())                          
    # if get_jwt().get("roles") == "USER":   
    if get_jwt().get("roles") == "ADMIN":   
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM rezervacija")
        rezervacije = cursor.fetchall() 
        if rezervacije is not None:
            for rr in rezervacije:                      #da bih mogao da prikazem i korisnikovo ime u tabeli
                cursor.execute("SELECT korisnicko_ime FROM korisnik WHERE id=%s", (rr["korisnik_id"]))
                kor_ime = cursor.fetchone()

                cursor.execute("SELECT * FROM karta WHERE id=%s", (rr["karta_id"]))
                karta = cursor.fetchone()

                cursor.execute("SELECT * FROM film WHERE id=%s", (karta["film_id"]))
                film = cursor.fetchone()

                rr["korisnik"] = kor_ime["korisnicko_ime"]                #u recnik ubacimo da ima jos polje ime od korisnika
                rr["film"] = film["naziv"]
                rr["pocetak"] = karta["vreme_pocetka_projekcije"]
                rr["kraj"] = karta["vreme_zavrsetka_projekcije"]
            return flask.jsonify(rezervacije) 

        return("Not found", 404)

    return("Nemate prava za ovaj zahtev!", 403)


@rezervacija_blueprint.route("/<int:rezervacija_id>", methods=["GET"])
@jwt_required()  
def getOneRezervacija(rezervacija_id):
    if get_jwt().get("roles") == "ADMIN":  
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM rezervacija WHERE id=%s", (rezervacija_id, ))
        rezervacija = cursor.fetchone()   
        if rezervacija is not None:
            return flask.jsonify(rezervacija) 
        return("Not found", 404)

    return("Nemate prava za ovaj zahtev!", 403)


@rezervacija_blueprint.route("", methods=["POST"])   #neka zamisao je da samo user moze da pravi rezervaciju
@jwt_required()             
def dodajRezervaciju():
    if get_jwt().get("roles") == "USER":  
        baza = mysql.get_db()
        cursor = baza.cursor()
        cursor.execute("INSERT INTO rezervacija(kolicina, ukupna_cena, korisnik_id, karta_id) VALUES(%(kolicina)s, %(ukupna_cena)s, %(korisnik_id)s, %(karta_id)s)", flask.request.json)
        baza.commit()
        return flask.request.json, 201 

    return("Nemate prava za ovaj zahtev!", 403)


# @film_blueprint.route("/<int:film_id>", methods=["PUT"])    #mislim da mi ova funkcionalnost za rezervaciju ne treba   
# def izmeniFilm(film_id):
#     film = dict(flask.request.json)
#     film["film_id"] = film_id

#     baza = mysql.get_db()
#     cursor = baza.cursor() 
#     cursor.execute("UPDATE film SET naziv=%(naziv)s, godina_izlaska=%(godina_izlaska)s, reziser=%(reziser)s, kratak_opis=%(kratak_opis)s WHERE id=%(film_id)s", film)
#     baza.commit()
#     cursor.execute("SELECT * FROM film WHERE id=%s", (film_id, ))
#     film = cursor.fetchone() 

#     return flask.jsonify(film)


@rezervacija_blueprint.route("/<int:rezervacija_id>", methods=["DELETE"]) 
@jwt_required()             
def izbrisiRezervaciju(rezervacija_id):
    if get_jwt().get("roles") == "ADMIN":
        baza = mysql.get_db()
        cursor = baza.cursor() 
        cursor.execute("DELETE FROM rezervacija WHERE id=%s", (rezervacija_id, ))
        baza.commit()
        return ""

    return("Nemate prava za ovaj zahtev!", 403)

