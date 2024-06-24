from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
import uuid

main_routes = Blueprint('main', __name__)

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main_routes.route('/api/upload', methods=['POST'])
def upload_image():
    from app import db
    from models import Image

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    tags = request.form.get('tags', '')

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_id = str(uuid.uuid4())
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_id + '_' + filename)
        file.save(filepath)
        size = os.path.getsize(filepath)

        # Save to database
        new_image = Image(id=unique_id, filename=filename, filepath=filepath, tags=tags, size=size)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({'message': 'File uploaded successfully', 'image': {'id': unique_id, 'filename': filename, 'tags': tags.split(','), 'size': size}})
    
    return jsonify({'error': 'Invalid file type'}), 400

@main_routes.route('/api/search', methods=['GET'])
def search_images():
    from models import Image

    query = request.args.get('query', '').lower()
    results = Image.query.filter(Image.tags.contains(query)).all()
    return jsonify([{'id': img.id, 'filename': img.filename, 'tags': img.tags.split(','), 'size': img.size} for img in results])

@main_routes.route('/api/images/<id>', methods=['GET'])
def get_image_details(id):
    from models import Image

    image = Image.query.get(id)
    if image:
        return jsonify({'id': image.id, 'filename': image.filename, 'tags': image.tags.split(','), 'size': image.size})
    return jsonify({'error': 'Image not found'}), 404
