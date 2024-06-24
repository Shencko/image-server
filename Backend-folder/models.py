from app import db

class Image(db.Model):
    id = db.Column(db.String, primary_key=True)
    filename = db.Column(db.String, nullable=False)
    filepath = db.Column(db.String, nullable=False)
    tags = db.Column(db.String, nullable=False)
    size = db.Column(db.Integer, nullable=False)
