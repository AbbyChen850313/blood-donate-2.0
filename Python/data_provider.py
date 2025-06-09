##data_provider.py
import os
from firebase_admin import credentials
from dotenv import load_dotenv
load_dotenv()

def getFireBaseJson():
       return credentials.Certificate(os.getenv('GOOGLE_FIRE_BASE_JSON'))