from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
import string
import random
from cryptography.fernet import Fernet
from django.conf import settings
import os
import random
import string
from django.utils import timezone
import datetime
import requests
from core.models import OTP

"""
Email handler
"""

def email_sender(subject, message, to, template, extra=None):
    # from_email = 'your-email@gmail.com'
    recipient_list = [to,]
    html_body = render_to_string(template_name=template, context={'message':message, 'extra':extra})

    message = EmailMultiAlternatives(
    subject=subject,
    body=message,
    from_email='Culture Vaults',
    to=recipient_list
    )
    message.attach_alternative(html_body, "text/html")
    message.send(fail_silently=False)
    # send_mail(subject, message, from_email, recipient_list)


def generate_otp():
    # This can be a small range but we can change this after
    random_number = random.randint(1500, 9999)
      
    return random_number

def generate_random_password(size=5):
        
    characters = string.ascii_letters + string.digits

    # Generate a random text of size 5
    random_text = ''.join(random.choice(characters) for _ in range(size))

    return random_text





def encrypt_email(email):
    cipher_suite = Fernet(settings.EMAIL_ENCRYPTION_KEY)

    # Encrypt the email address
    encrypted_email = cipher_suite.encrypt(email.encode())
    return encrypted_email

def decrypt_email(encrypted_email):
    cipher_suite = Fernet(settings.EMAIL_ENCRYPTION_KEY)

    # Decrypt the email address
    decrypted_email = cipher_suite.decrypt(encrypted_email).decode('utf-8')
    return decrypted_email



# File handlers

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'mp4', 'wmv', 'avi', 'gif'}
UPLOAD_DIR = os.path.join(settings.MEDIA_ROOT, 'uploads')
 
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_unique_filename(filename):
    # Generate a random 12-character string as a filename
    random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
    name, ext = os.path.splitext(filename)
    return f"{name}_{random_string}{ext}"



def is_otp_valid(otp_model:OTP):
               
        time_difference = timezone.now() - otp_model.updated_at
        # print(timezone.now())
        # print(otp_model.create_at)
        
        threshold = datetime.timedelta(minutes=10)

        if time_difference <= threshold:
            return True  # OTP is valid
        else:
            return False


def upload_files(files):
    file_paths = []
    if len(files) == 0:
        return {"status":True, "file_paths":file_paths}
    for uploaded_file in files:
        # print(files)
        if not allowed_file(uploaded_file.name):
            # return Response({"error": "Invalid file format. Allowed formats: JPG, JPEG, PNG, MP4.", "status":400})
            return {"status":False, "message":"Invalid file format. Allowed formats: JPG, JPEG, PNG, MP4."}
        unique_filename = generate_unique_filename(uploaded_file.name)
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        # Ensure the generated filename is unique
        while os.path.exists(file_path):
            unique_filename = generate_unique_filename(uploaded_file.name)
            file_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)
        # Build the file url
        
        SERVER_IP = settings.SERVER_IPS[0]

        for dir in UPLOAD_DIR.split('\\')[-2:]:
            SERVER_IP = f"{SERVER_IP}/{dir}"
        
        file_url = f"{SERVER_IP}/{unique_filename}"
        # print(file_url)
        
        file_paths.append(file_url)
    return {"status":True, "file_paths":file_paths}


from urllib.parse import urlparse, parse_qs

def extract_coordinates_from_google_maps_url(google_maps_url):
    try:
        parsed_url = urlparse(google_maps_url)
        # print(parsed_url)
        # Extract the coordinates from the path
        path_parts = parsed_url.path.split('@')
        coordinates_part = path_parts[1]
        lat = coordinates_part.split(',')[0]
        long = coordinates_part.split(',')[1]
        # lat = coordinates_part.split(',')[0]
        
        # latitude, longitude, zoom_level = map(float, coordinates_part.split(','))

        return True, lat, long
    except Exception as e:
        print(e)
        return False, {}, {}
    
    

def get_info_from_google(token):
    if not token:
        return {"status":False, "message":"No teoken provided"}

    try:
        headers = {'Authorization': f'Bearer {token}'}
        response = requests.get("https://www.googleapis.com/userinfo/v2/me", headers=headers)

        # Check if the request was successful (status code in the range 200-299)
        response.raise_for_status()

        user = response.json()
        print(user)
        return {"status":True, "user":user}
        # setGoogleAccountInfo(user)  # Uncomment and replace with your logic
        # googleLoginCultureVault(user)  # Uncomment and replace with your logic
    except requests.exceptions.HTTPError as errh:
        print(f"HTTP Error: {errh}")
        return {"status":False, "message": str(errh)}
    except requests.exceptions.ConnectionError as errc:
        print(f"Error Connecting: {errc}")
        return {"status":False, "message": str(errc)}
    except requests.exceptions.Timeout as errt:
        print(f"Timeout Error: {errt}")
        return {"status":False, "message": str(errt)}
    except Exception as err:
        print(f"An error occurred: {err}")
        return {"status":False, "message": str(err)}