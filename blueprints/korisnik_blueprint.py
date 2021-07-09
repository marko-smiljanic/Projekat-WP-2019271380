import flask
from flask import Blueprint

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt              

from utils.db import mysql

korisnik_blueprint = Blueprint("korisnik_blueprint", __name__)



@korisnik_blueprint.route("/", methods=["GET"])
@jwt_required()   #ovo valjda znaci samo da mora biti ulogovan?
def getAllKorisnici():
    #print(get_jwt())  #get jwt dobavlja trenutni token i njegove claim-ove  
    if get_jwt().get("roles") == "ADMIN":      
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korisnik")
        korisnici = cursor.fetchall() 
        if korisnici is not None:
            return flask.jsonify(korisnici)
        return("Not found", 404)

    return("Nemate prava za ovaj zahtev!", 403)


@korisnik_blueprint.route("/<int:korisnik_id>", methods=["GET"])
@jwt_required()
def getOneKorisnik(korisnik_id):
    if get_jwt().get("roles") == "ADMIN": 
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id, ))
        korisnik = cursor.fetchone()   
        if korisnik is not None:
            return flask.jsonify(korisnik) 
        return("Not found", 404)

    return("Nemate prava za ovaj zahtev!", 403)


######################################################## DOBAVLJANJE ULOGOVANOG KORISNIKA DA BI NAPRAVIO KOMPONENTU ULOGOVANIKORISNIK.JS DA BI MOGAO DA PRIKAZEM KOMPONENTU PROFIL ULOGOVANOG KORISNIKA
@korisnik_blueprint.route("/ulogovani", methods=["GET"])   
@jwt_required()                                 #ovde mi je bitno da samo bude ulogovan i nista vise
def getUlogovani():      
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnici = cursor.fetchall() 
    for k in korisnici: 
        if k["id"] == get_jwt().get("id"):      #poredim sa id-jem koji je dodeljen u claims deo jwt u funkciji logovanja u main-u
            return flask.jsonify(k)             #vracam ulogovanog jer mi treba za prikaz u komponenti ulogovani korisnik... prosto cu iz komponente poslati zahtev na ovu rutu
    
    return("Not found", 404)

###################################################### DOBAVLJANJE SVIH KORISNIKA DA BIH MOGAO DA NAPRAVIM SIGN-IN KOMPONENTU, TH. ISTA KAO I GET ALL KORISNICI ALI BEZ OGRANICENJA PRAVA PRISTUPA
@korisnik_blueprint.route("/dohvatiKorisnike", methods=["GET"])
def getAllKorisnici2():   
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnici = cursor.fetchall() 
    if korisnici is not None:
        return flask.jsonify(korisnici)

    return("Not found", 404)

###########################################################  pravljenje zahteva za naloge u bazi
@korisnik_blueprint.route("/dodajZahtev", methods=["POST"])       #pravi ga neulogovani korisnik    
def dodajZahtevZaPravljenjeNaloga():
    baza = mysql.get_db()
    cursor = baza.cursor() 
    cursor.execute("INSERT INTO zahtev_za_pravljenje_naloga(korisnicko_ime, lozinka, kontakt_email) VALUES(%(korisnicko_ime)s, %(lozinka)s, %(kontakt_email)s)", flask.request.json)
    baza.commit()
    return flask.request.json, 201 

@korisnik_blueprint.route("/dohvatiZahteve", methods=["GET"])
@jwt_required()
def getAllZahtevi():
    if get_jwt().get("roles") == "ADMIN":    
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM zahtev_za_pravljenje_naloga")
        korisnici = cursor.fetchall() 
        if korisnici is not None:
            return flask.jsonify(korisnici)
        return("Not found", 404)

    return("Nemate prava za ovaj zahtev!", 403)

@korisnik_blueprint.route("/izbrisiZahtev/<int:zahtev_id>", methods=["DELETE"])   
@jwt_required()         
def izbrisiZahtev(zahtev_id):
    if get_jwt().get("roles") == "ADMIN":
        baza = mysql.get_db()
        cursor = baza.cursor() 
        cursor.execute("DELETE FROM zahtev_za_pravljenje_naloga WHERE id=%s", (zahtev_id, ))
        baza.commit()
        return ""

    return("Nemate prava za ovaj zahtev!", 403)
############################################################



@korisnik_blueprint.route("", methods=["POST"]) 
@jwt_required()           
def dodajKorisnika():
    if get_jwt().get("roles") == "ADMIN":
        baza = mysql.get_db()
        cursor = baza.cursor() 
        cursor.execute("INSERT INTO korisnik(korisnicko_ime, lozinka, kontakt_email, tip_korisnika_id) VALUES(%(korisnicko_ime)s, %(lozinka)s, %(kontakt_email)s, %(tip_korisnika_id)s)", flask.request.json)
        baza.commit()
        return flask.request.json, 201 

    return("Nemate prava za ovaj zahtev!", 403)


@korisnik_blueprint.route("/<int:korisnik_id>", methods=["PUT"])   
@jwt_required()    
def izmeniKorisnika(korisnik_id):
    if get_jwt().get("roles") == "ADMIN":
        korisnik = dict(flask.request.json)
        korisnik["korisnik_id"] = korisnik_id

        baza = mysql.get_db()
        cursor = baza.cursor() 
        cursor.execute("UPDATE korisnik SET korisnicko_ime=%(korisnicko_ime)s, lozinka=%(lozinka)s, kontakt_email=%(kontakt_email)s, tip_korisnika_id=%(tip_korisnika_id)s WHERE id=%(korisnik_id)s", korisnik)
        baza.commit()
        cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id, ))
        korisnik = cursor.fetchone() 
        return flask.jsonify(korisnik)

    return("Nemate prava za ovaj zahtev!", 403)


@korisnik_blueprint.route("/<int:korisnik_id>", methods=["DELETE"])   
@jwt_required()         
def izbrisiKorisnika(korisnik_id):
    if get_jwt().get("roles") == "ADMIN":
        baza = mysql.get_db()
        cursor = baza.cursor() 
        cursor.execute("DELETE FROM korisnik WHERE id=%s", (korisnik_id, ))
        baza.commit()
        return ""

    return("Nemate prava za ovaj zahtev!", 403)


