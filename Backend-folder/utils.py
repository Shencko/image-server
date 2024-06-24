import os
import uuid
from werkzeug.utils import secure_filename
from google.cloud import storage

def generate_unique_filename(filename):
    unique_id = str(uuid.uuid4())
    return f"{unique_id}_{secure_filename(filename)}"

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_file_to_gcs(file, bucket_name):
    if file and allowed_file(file.filename):
        filename = generate_unique_filename(file.filename)
        client = storage.Client()
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(filename)
        blob.upload_from_file(file)
        return blob.public_url
    return None
