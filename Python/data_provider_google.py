##data_provider_google.py
from google.cloud import secretmanager
from oauth2client.service_account import ServiceAccountCredentials
import json
from firebase_admin import credentials
# 初始化Secret Manager客户端
client = secretmanager.SecretManagerServiceClient()
#project_id = "play-integrity-hqxwc7ptj57t7g9"
project_id = "hopeful-keep-422806-j6"

def access_secret_version(project_id, secret_id):
    name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    secret_string = response.payload.data.decode("UTF-8")
    return secret_string

def getFireBaseJson():
    secret_id = "GOOGLE_FIRE_BASE_JSON"  # 假设这是你存储在 Secret Manager 中的 Firebase Admin SDK 金鑰的 Secret ID
    secret_string = access_secret_version(project_id, secret_id)
    secret_json = json.loads(secret_string)
    return credentials.Certificate(secret_json)

