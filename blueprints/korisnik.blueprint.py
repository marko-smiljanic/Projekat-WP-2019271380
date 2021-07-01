import flask
from flask import Blueprint

from flask_jwt_extended import jwt_required

from utils.db import mysql

kupci_blueprint = Blueprint("kupci_blueprint", __name__)




@kupci_blueprint.route("")
@jwt_required()
def getAllKorisnici():
    #print(get_jwt())                           #dobavljamo trenutni token i njegove claim-ove, mora se importovati!!!
    # if get_jwt().get("roles") == "USER":      #moze se upotrebiti custom decorator gde ce on sam proveravati uloge
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac")
    kupci = cursor.fetchall()   
    return flask.jsonify(kupci)


    #nesto