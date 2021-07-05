import flask
from flask import Blueprint

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt              

from utils.db import mysql

karta_blueprint = Blueprint("karta_blueprint", __name__)



@karta_blueprint.route("/", methods=["GET"])
def getAllKarte():
    #print(get_jwt())                          
    # if get_jwt().get("roles") == "USER":      
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM karta")
    karte = cursor.fetchall() 

    return flask.jsonify(karte)


@karta_blueprint.route("/<int:karta_id>", methods=["GET"])
def getOneKarta(karta_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM karta WHERE id=%s", (karta_id, ))
    karta = cursor.fetchone()   
    if karta is not None:
        return flask.jsonify(karta) 

    return("Not found", 404)


@karta_blueprint.route("", methods=["POST"])            
def dodajKartu():
    baza = mysql.get_db()
    cursor = baza.cursor() 
    cursor.execute("INSERT INTO karta(film_id, vreme_pocetka_projekcije, vreme_zavrsetka_projekcije, cena) VALUES(%(film_id)s, %(vreme_pocetka_projekcije)s, %(vreme_zavrsetka_projekcije)s, %(cena)s)", flask.request.json)
    baza.commit()

    return flask.request.json, 201 


@karta_blueprint.route("/<int:karta_id>", methods=["PUT"])       
def izmeniKartu(karta_id):
    karta = dict(flask.request.json)
    karta["karta_id"] = karta_id

    baza = mysql.get_db()
    cursor = baza.cursor()   #necu da menjam film_id                film_id=%(film_id)s, ovo sam mogao izostaviti i u insert-u, manje bih koda imao u dodavanju i ne bih morao da ucitavam dati film!!!!!!!!!!!! glup sam.
    cursor.execute("UPDATE karta SET vreme_pocetka_projekcije=%(vreme_pocetka_projekcije)s, vreme_zavrsetka_projekcije=%(vreme_zavrsetka_projekcije)s, cena=%(cena)s WHERE id=%(karta_id)s", karta)
    baza.commit()
    cursor.execute("SELECT * FROM karta WHERE id=%s", (karta_id, ))
    karta = cursor.fetchone() 

    return flask.jsonify(karta)


@karta_blueprint.route("/<int:karta_id>", methods=["DELETE"])            
def izbrisiKartu(karta_id):
    baza = mysql.get_db()
    cursor = baza.cursor() 
    cursor.execute("DELETE FROM karta WHERE id=%s", (karta_id, ))
    baza.commit()

    return ""


