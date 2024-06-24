from extensions import db

class Image(db.Model):
    id = db.Column(db.String(50), primary_key=True)  # Unique identifier for the image
    filename = db.Column(db.String(255), nullable=False)  # Name of the file
    filepath = db.Column(db.String(255), nullable=False)  # Path to the file on the server
    tags = db.Column(db.String(255), nullable=False)  # Tags associated with the image
    size = db.Column(db.Integer, nullable=False)  # Size of the file in bytes
