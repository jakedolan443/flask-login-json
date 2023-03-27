from functools import wraps
from flask import request, render_template, redirect
from werkzeug.exceptions import BadRequest
from flask import Blueprint, jsonify
import token_management
import hashlib
import json


tokenManager = token_management.TokenManager()

allowed_characters = list("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!-_")

def verify_input(value):
    if not any(x not in allowed_characters for x in value):
        return value
    else:
        raise Exception
        
def validate_request(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            if "token" in request.cookies:
                token = request.cookies['token']
                if tokenManager.verifyToken(token) == False:
                    return redirect("/login", code=302)
            else:
                return redirect("/login", code=302)
        except Exception as ex:
            return redirect("/login", code=302)
        return f(*args, **kwargs)
    return decorated_function

def verify_auth(request):
    try:
        username = verify_input(request['username'])
        password = verify_input(request['password'])
    except Exception as e:
        return False
    
    generated_salt = "{}_r25bGKsa92".format(username)
    hashed_password = hashlib.sha512("{}{}".format(password, generated_salt).encode("UTF-8")).hexdigest()
    
    try:
        with open("users/{}.json".format(hashlib.md5("{}_fg9agsa02ks".format(username).encode("UTF-8")).hexdigest())) as f:
            if json.loads(f.read())['hash'] == hashed_password:
                return True
            else:
                return False
    except FileNotFoundError as e:
        ## user does not exist
        return False
    except KeyError as e:
        ## user is corrupted
        return False
    except Exception as e:
        return False
    
    
auth_bp = Blueprint('auth_bp', __name__)
    
@auth_bp.route("/authenticate", methods=["POST"])
def Login_POST():
    if verify_auth(request.json):
        try:
            token = tokenManager.createNewToken()
            return jsonify({"token":token.getValue()}), 200
        except MaxTokensReachedException:
            return jsonify({"error":"Cannot login right now. Please try again later."}), 401
        except Exception as e:
            return jsonify({"error":"An unknown error occured."}), 401
    else:
        return jsonify({"error":"Incorrect username/password."}), 401




