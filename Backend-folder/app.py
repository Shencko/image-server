import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)  # Enable CORS for all routes

# Blueprint registration is done after initializing `db`
from routes import main_routes
app.register_blueprint(main_routes)

if __name__ == "__main__":
    app.run(debug=True)
