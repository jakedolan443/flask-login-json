from flask import Flask, g, request, redirect, url_for, render_template, jsonify
from auth import auth_bp, validate_request


app = Flask(__name__, static_url_path='', static_folder='public/static', template_folder='public/serve')
app.register_blueprint(auth_bp)

@app.errorhandler(403)
def ROUTE_PageNotFound(e):
    return render_template('403.html'), 403

@app.errorhandler(404)
def ROUTE_PageNotFound(e):
    return render_template('404.html'), 404

@app.errorhandler(Exception)
def ROUTE_InternalError(e):
    return render_template('500.html'), 500

@app.route("/")
def ROUTE_Default():
    return render_template("default.html")

@app.route("/login")
def ROUTE_Admin_Login():
    return render_template("login.html")

@app.route("/admin")
@validate_request
def ROUTE_Admin():
    return render_template("admin.html")

app.run(host="0.0.0.0", port=5000)
