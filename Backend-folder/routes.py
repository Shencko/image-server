from flask import Blueprint, request, jsonify, current_app
import os
import uuid  # Import uuid module
from werkzeug.utils import secure_filename
from extensions import db
from models import Image
from utils import upload_file_to_gcs, allowed_file

main_routes = Blueprint('main', __name__)

@main_routes.route('/api/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    tags = request.form.get('tags', '')

    if file and allowed_file(file.filename):
        bucket_name = current_app.config['GOOGLE_CLOUD_STORAGE_BUCKET']
        public_url = upload_file_to_gcs(file, bucket_name)
        if public_url:
            unique_id = str(uuid.uuid4())  # Generate a unique ID
            filename = file.filename
            size = file.content_length

            # Save to database
            new_image = Image(id=unique_id, filename=filename, filepath=public_url, tags=tags, size=size)
            db.session.add(new_image)
            db.session.commit()

            return jsonify({'message': 'File uploaded successfully', 'image': {'id': unique_id, 'filename': filename, 'tags': tags.split(','), 'size': size, 'url': public_url}})
    
    return jsonify({'error': 'Invalid file type'}), 400

@main_routes.route('/api/search', methods=['GET'])
def search_images():
    query = request.args.get('query', '').lower()
    results = Image.query.filter(Image.tags.contains(query)).all()
    return jsonify([{'id': img.id, 'filename': img.filename, 'tags': img.tags.split(','), 'size': img.size, 'url': img.filepath} for img in results])

@main_routes.route('/api/images/<id>', methods=['GET'])
def get_image_details(id):
    image = Image.query.get(id)
    if image:
        return jsonify({'id': image.id, 'filename': image.filename, 'tags': image.tags.split(','), 'size': image.size, 'url': image.filepath})
    return jsonify({'error': 'Image not found'}), 404
