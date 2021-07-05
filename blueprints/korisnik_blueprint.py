import flask
from flask import Blueprint

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt              

from utils.db import mysql

korisnik_blueprint = Blueprint("korisnik_blueprint", __name__)



@korisnik_blueprint.route("/", methods=["GET"])
@jwt_required()
def getAllKorisnici():
    #print(get_jwt())                          
    # if get_jwt().get("roles") == "USER":      
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnici = cursor.fetchall() 

    return flask.jsonify(korisnici)


@korisnik_blueprint.route("/<int:korisnik_id>", methods=["GET"])
def getOneKorisnik(korisnik_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id, ))
    korisnik = cursor.fetchone()   
    if korisnik is not None:
        return flask.jsonify(korisnik) 

    return("Not found", 404)


##################  DOBAVLJANJE ULOGOVANOG KORISNIKA DA BI NAPRAVIO KOMPONENTU ULOGOVANIKORISNIK.JS DA BI MOGAO DA PRIKAZEM KOMPONENTU PROFIL ULOGOVANOG KORISNIKA
@korisnik_blueprint.route("/ulogovani", methods=["GET"])   
@jwt_required()
def getUlogovani():      
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnici = cursor.fetchall() 
    for k in korisnici: 
        if k["id"] == get_jwt().get("id"):    #poredim sa id-jem koji je dodeljen u claims deo jwt u funkciji logovanja u main-u
            return flask.jsonify(k)           #vracam ulogovanog jer mi treba za prikaz u komponenti ulogovani korisnik (prosto cu iz komponente poslati zahtev na ovu rutu)
    
    return("Not found", 404)
#############################################################################


@korisnik_blueprint.route("", methods=["POST"])            
def dodajKorisnika():
    baza = mysql.get_db()
    cursor = baza.cursor() 
    cursor.execute("INSERT INTO korisnik(korisnicko_ime, lozinka, kontakt_email, tip_korisnika_id) VALUES(%(korisnicko_ime)s, %(lozinka)s, %(kontakt_email)s, %(tip_korisnika_id)s)", flask.request.json)
    baza.commit()

    return flask.request.json, 201 


@korisnik_blueprint.route("/<int:korisnik_id>", methods=["PUT"])       
def izmeniKorisnika(korisnik_id):
    korisnik = dict(flask.request.json)
    korisnik["korisnik_id"] = korisnik_id

    baza = mysql.get_db()
    cursor = baza.cursor() 
    cursor.execute("UPDATE korisnik SET korisnicko_ime=%(korisnicko_ime)s, lozinka=%(lozinka)s, kontakt_email=%(kontakt_email)s, tip_korisnika_id=%(tip_korisnika_id)s WHERE id=%(korisnik_id)s", korisnik)
    baza.commit()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id, ))
    korisnik = cursor.fetchone() 

    return flask.jsonify(korisnik)


@korisnik_blueprint.route("/<int:korisnik_id>", methods=["DELETE"])            
def izbrisiKorisnika(korisnik_id):
    baza = mysql.get_db()
    cursor = baza.cursor() 
    cursor.execute("DELETE FROM korisnik WHERE id=%s", (korisnik_id, ))
    baza.commit()

    return ""


