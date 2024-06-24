# backend/utils.py
import os
import uuid
from werkzeug.utils import secure_filename

def generate_unique_filename(filename):
    unique_id = str(uuid.uuid4())
    return f"{unique_id}_{secure_filename(filename)}"

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_file(file, upload_folder):
    if file and allowed_file(file.filename):
        filename = generate_unique_filename(file.filename)
        filepath = os.path.join(upload_folder, filename)
        file.save(filepath)
        return filepath
    return None
