import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config
from extensions import db, migrate

load_dotenv()  # Load environment variables from a .env file

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)  # Enable CORS for all routes

    # Blueprint registration is done after initializing `db`
    from routes import main_routes
    app.register_blueprint(main_routes)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)

