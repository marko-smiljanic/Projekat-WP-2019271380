import flask
from flask import Blueprint

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt              

from utils.db import mysql

film_blueprint = Blueprint("film_blueprint", __name__)



@film_blueprint.route("/", methods=["GET"])
def getAllFilmovi():
    #print(get_jwt())                          
    # if get_jwt().get("roles") == "USER":      
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM film")
    filmovi = cursor.fetchall() 

    return flask.jsonify(filmovi)


@film_blueprint.route("/<int:film_id>", methods=["GET"])
def getOneFilm(film_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM film WHERE id=%s", (film_id, ))
    film = cursor.fetchone()   
    if film is not None:
        return flask.jsonify(film) 

    return("Not found", 404)


@film_blueprint.route("", methods=["POST"])    
@jwt_required()          
def dodajFilm():
    baza = mysql.get_db()
    cursor = baza.cursor() 
    cursor.execute("INSERT INTO film(naziv, godina_izlaska, reziser, kratak_opis) VALUES(%(naziv)s, %(godina_izlaska)s, %(reziser)s, %(kratak_opis)s)", flask.request.json)
    baza.commit()

    return flask.request.json, 201 


@film_blueprint.route("/<int:film_id>", methods=["PUT"]) 
@jwt_required()        
def izmeniFilm(film_id):
    film = dict(flask.request.json)
    film["film_id"] = film_id

    baza = mysql.get_db()
    cursor = baza.cursor() 
    cursor.execute("UPDATE film SET naziv=%(naziv)s, godina_izlaska=%(godina_izlaska)s, reziser=%(reziser)s, kratak_opis=%(kratak_opis)s WHERE id=%(film_id)s", film)
    baza.commit()
    cursor.execute("SELECT * FROM film WHERE id=%s", (film_id, ))
    film = cursor.fetchone() 

    return flask.jsonify(film)


@film_blueprint.route("/<int:film_id>", methods=["DELETE"]) 
@jwt_required()             
def izbrisiKorisnika(film_id):
    baza = mysql.get_db()
    cursor = baza.cursor() 
    cursor.execute("DELETE FROM film WHERE id=%s", (film_id, ))
    baza.commit()

    return ""


