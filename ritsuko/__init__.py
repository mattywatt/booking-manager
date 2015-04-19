from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config') # Now we can access the configuration variables via app.config["VAR_NAME"].
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/ritsuko'
db = SQLAlchemy(app)

import ritsuko.views